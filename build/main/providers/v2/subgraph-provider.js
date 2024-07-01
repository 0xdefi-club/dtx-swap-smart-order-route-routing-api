"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2SubgraphProvider = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
const async_retry_1 = __importDefault(require("async-retry"));
const await_timeout_1 = __importDefault(require("await-timeout"));
const graphql_request_1 = require("graphql-request");
const lodash_1 = __importDefault(require("lodash"));
const log_1 = require("../../util/log");
const metric_1 = require("../../util/metric");
const SUBGRAPH_URL_BY_CHAIN = {
    [sdk_core_1.ChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v2-dev',
    [sdk_core_1.ChainId.BASE_SEPOLIA]: 'https://api.studio.thegraph.com/query/64677/0xswap-basetest/v2',
    [sdk_core_1.ChainId.TAIKO]: 'https://taiko-swap-subgraph.dtx.trade/subgraphs/name/DTXswap-v2/167000-subgraph',
};
const threshold = 0.025;
const PAGE_SIZE = 1000; // 1k is max possible query size from subgraph.
class V2SubgraphProvider {
    constructor(chainId, retries = 2, timeout = 360000, rollback = true, pageSize = PAGE_SIZE) {
        this.chainId = chainId;
        this.retries = retries;
        this.timeout = timeout;
        this.rollback = rollback;
        this.pageSize = pageSize;
        const subgraphUrl = SUBGRAPH_URL_BY_CHAIN[this.chainId];
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
        }
        this.client = new graphql_request_1.GraphQLClient(subgraphUrl);
    }
    async getPools(_tokenIn, _tokenOut, providerConfig) {
        const beforeAll = Date.now();
        let blockNumber = (providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber)
            ? await providerConfig.blockNumber
            : undefined;
        // Due to limitations with the Subgraph API this is the only way to parameterize the query.
        const query2 = (0, graphql_request_1.gql) `
        query getPools($pageSize: Int!, $id: String) {
            pairs(
                first: $pageSize
                ${blockNumber ? `block: { number: ${blockNumber} }` : ``}
                where: { id_gt: $id }
            ) {
                id
                token0 { id, symbol }
                token1 { id, symbol }
                totalSupply
                trackedReserveETH
                reserveUSD
            }
        }
    `;
        let pools = [];
        log_1.log.info(`Getting V2 pools from the subgraph with page size ${this.pageSize}${(providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber)
            ? ` as of block ${providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber}`
            : ''}.`);
        let outerRetries = 0;
        await (0, async_retry_1.default)(async () => {
            const timeout = new await_timeout_1.default();
            const getPools = async () => {
                let lastId = '';
                let pairs = [];
                let pairsPage = [];
                // metrics variables
                let totalPages = 0;
                let retries = 0;
                do {
                    totalPages += 1;
                    await (0, async_retry_1.default)(async () => {
                        const before = Date.now();
                        const poolsResult = await this.client.request(query2, {
                            pageSize: this.pageSize,
                            id: lastId,
                        });
                        metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.paginate.latency`, Date.now() - before);
                        pairsPage = poolsResult.pairs;
                        pairs = pairs.concat(pairsPage);
                        lastId = pairs[pairs.length - 1].id;
                        metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.paginate.pageSize`, pairsPage.length);
                    }, {
                        retries: this.retries,
                        onRetry: (err, retry) => {
                            pools = [];
                            retries += 1;
                            log_1.log.info({ err }, `Failed request for page of pools from subgraph. Retry attempt: ${retry}`);
                        },
                    });
                } while (pairsPage.length > 0);
                metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.paginate`, totalPages);
                metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.pairs.length`, pairs.length);
                metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.paginate.retries`, retries);
                return pairs;
            };
            /* eslint-disable no-useless-catch */
            try {
                const getPoolsPromise = getPools();
                const timerPromise = timeout.set(this.timeout).then(() => {
                    throw new Error(`Timed out getting pools from subgraph: ${this.timeout}`);
                });
                pools = await Promise.race([getPoolsPromise, timerPromise]);
                return;
            }
            catch (err) {
                throw err;
            }
            finally {
                timeout.clear();
            }
            /* eslint-enable no-useless-catch */
        }, {
            retries: this.retries,
            onRetry: (err, retry) => {
                outerRetries += 1;
                if (this.rollback &&
                    blockNumber &&
                    lodash_1.default.includes(err.message, 'indexed up to')) {
                    metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.indexError`, 1);
                    blockNumber = blockNumber - 10;
                    log_1.log.info(`Detected subgraph indexing error. Rolled back block number to: ${blockNumber}`);
                }
                metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.timeout`, 1);
                pools = [];
                log_1.log.info({ err }, `Failed to get pools from subgraph. Retry attempt: ${retry}`);
            },
        });
        metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.retries`, outerRetries);
        // Filter pools that have tracked reserve ETH less than threshold.
        // trackedReserveETH filters pools that do not involve a pool from this allowlist:
        // https://github.com/Uniswap/v2-subgraph/blob/7c82235cad7aee4cfce8ea82f0030af3d224833e/src/mappings/pricing.ts#L43
        // Which helps filter pools with manipulated prices/liquidity.
        // TODO: Remove. Temporary fix to ensure tokens without trackedReserveETH are in the list.
        const FEI = '0x956f47f50a910163d8bf957cf5846d573e7f87ca';
        const beforeFilter = Date.now();
        const poolsSanitized = pools
            .filter((pool) => {
            return (pool.token0.id == FEI ||
                pool.token1.id == FEI ||
                parseFloat(pool.trackedReserveETH) > threshold);
        })
            .map((pool) => {
            return Object.assign(Object.assign({}, pool), { id: pool.id.toLowerCase(), token0: {
                    id: pool.token0.id.toLowerCase(),
                }, token1: {
                    id: pool.token1.id.toLowerCase(),
                }, supply: parseFloat(pool.totalSupply), reserve: parseFloat(pool.trackedReserveETH), reserveUSD: parseFloat(pool.reserveUSD) });
        });
        metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.filter.latency`, Date.now() - beforeFilter);
        metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools`, 1);
        metric_1.metric.putMetric(`V2SubgraphProvider.chain_${this.chainId}.getPools.latency`, Date.now() - beforeAll);
        log_1.log.info(`Got ${pools.length} V2 pools from the subgraph. ${poolsSanitized.length} after filtering`);
        return poolsSanitized;
    }
}
exports.V2SubgraphProvider = V2SubgraphProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViZ3JhcGgtcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3YyL3N1YmdyYXBoLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUFtRDtBQUNuRCw4REFBZ0M7QUFDaEMsa0VBQW9DO0FBQ3BDLHFEQUFxRDtBQUNyRCxvREFBdUI7QUFFdkIsd0NBQXFDO0FBQ3JDLDhDQUEyQztBQStCM0MsTUFBTSxxQkFBcUIsR0FBc0M7SUFDL0QsQ0FBQyxrQkFBTyxDQUFDLE9BQU8sQ0FBQyxFQUNmLGtFQUFrRTtJQUNwRSxDQUFDLGtCQUFPLENBQUMsWUFBWSxDQUFDLEVBQ3BCLGdFQUFnRTtJQUNsRSxDQUFDLGtCQUFPLENBQUMsS0FBSyxDQUFDLEVBQ2IsaUZBQWlGO0NBQ3BGLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFFeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsK0NBQStDO0FBZ0J2RSxNQUFhLGtCQUFrQjtJQUc3QixZQUNVLE9BQWdCLEVBQ2hCLFVBQVUsQ0FBQyxFQUNYLFVBQVUsTUFBTSxFQUNoQixXQUFXLElBQUksRUFDZixXQUFXLFNBQVM7UUFKcEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFJO1FBQ1gsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFPO1FBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUU1QixNQUFNLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwrQkFBYSxD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