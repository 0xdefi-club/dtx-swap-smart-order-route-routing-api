"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nativeOnChain = exports.ExtendedEther = exports.WRAPPED_NATIVE_CURRENCY = exports.ID_TO_PROVIDER = exports.CHAIN_IDS_LIST = exports.ID_TO_NETWORK_NAME = exports.NATIVE_CURRENCY = exports.NATIVE_NAMES_BY_ID = exports.NativeCurrencyName = exports.ChainName = exports.ID_TO_CHAIN_ID = exports.NETWORKS_WITH_SAME_UNISWAP_ADDRESSES = exports.HAS_L1_FEE = exports.V2_SUPPORTED = exports.SUPPORTED_CHAINS = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
// WIP: Gnosis, Moonbeam
exports.SUPPORTED_CHAINS = [
    sdk_core_1.ChainId.MAINNET,
    sdk_core_1.ChainId.OPTIMISM,
    sdk_core_1.ChainId.OPTIMISM_GOERLI,
    sdk_core_1.ChainId.OPTIMISM_SEPOLIA,
    sdk_core_1.ChainId.ARBITRUM_ONE,
    sdk_core_1.ChainId.ARBITRUM_GOERLI,
    sdk_core_1.ChainId.ARBITRUM_SEPOLIA,
    sdk_core_1.ChainId.POLYGON,
    sdk_core_1.ChainId.POLYGON_MUMBAI,
    sdk_core_1.ChainId.SEPOLIA,
    sdk_core_1.ChainId.CELO_ALFAJORES,
    sdk_core_1.ChainId.CELO,
    sdk_core_1.ChainId.BNB,
    sdk_core_1.ChainId.AVALANCHE,
    sdk_core_1.ChainId.BASE,
    sdk_core_1.ChainId.BLAST,
    // Gnosis and Moonbeam don't yet have contracts deployed yet
    sdk_core_1.ChainId.BASE_SEPOLIA,
    sdk_core_1.ChainId.TAIKO,
];
exports.V2_SUPPORTED = [
    sdk_core_1.ChainId.MAINNET,
    sdk_core_1.ChainId.SEPOLIA,
    sdk_core_1.ChainId.ARBITRUM_ONE,
    sdk_core_1.ChainId.OPTIMISM,
    sdk_core_1.ChainId.POLYGON,
    sdk_core_1.ChainId.BASE,
    sdk_core_1.ChainId.BNB,
    sdk_core_1.ChainId.AVALANCHE,
    //
    sdk_core_1.ChainId.BASE_SEPOLIA,
    sdk_core_1.ChainId.TAIKO,
];
exports.HAS_L1_FEE = [
    sdk_core_1.ChainId.OPTIMISM,
    sdk_core_1.ChainId.OPTIMISM_GOERLI,
    sdk_core_1.ChainId.OPTIMISM_SEPOLIA,
    sdk_core_1.ChainId.ARBITRUM_ONE,
    sdk_core_1.ChainId.ARBITRUM_GOERLI,
    sdk_core_1.ChainId.ARBITRUM_SEPOLIA,
    sdk_core_1.ChainId.BASE,
    sdk_core_1.ChainId.BASE_GOERLI,
    sdk_core_1.ChainId.BLAST,
    //
    sdk_core_1.ChainId.BASE_SEPOLIA,
    sdk_core_1.ChainId.TAIKO,
];
exports.NETWORKS_WITH_SAME_UNISWAP_ADDRESSES = [
    sdk_core_1.ChainId.MAINNET,
    sdk_core_1.ChainId.GOERLI,
    sdk_core_1.ChainId.OPTIMISM,
    sdk_core_1.ChainId.ARBITRUM_ONE,
    sdk_core_1.ChainId.POLYGON,
    sdk_core_1.ChainId.POLYGON_MUMBAI,
];
const ID_TO_CHAIN_ID = (id) => {
    switch (id) {
        case 1:
            return sdk_core_1.ChainId.MAINNET;
        case 5:
            return sdk_core_1.ChainId.GOERLI;
        case 11155111:
            return sdk_core_1.ChainId.SEPOLIA;
        case 56:
            return sdk_core_1.ChainId.BNB;
        case 10:
            return sdk_core_1.ChainId.OPTIMISM;
        case 420:
            return sdk_core_1.ChainId.OPTIMISM_GOERLI;
        case 11155420:
            return sdk_core_1.ChainId.OPTIMISM_SEPOLIA;
        case 42161:
            return sdk_core_1.ChainId.ARBITRUM_ONE;
        case 421613:
            return sdk_core_1.ChainId.ARBITRUM_GOERLI;
        case 421614:
            return sdk_core_1.ChainId.ARBITRUM_SEPOLIA;
        case 137:
            return sdk_core_1.ChainId.POLYGON;
        case 80001:
            return sdk_core_1.ChainId.POLYGON_MUMBAI;
        case 42220:
            return sdk_core_1.ChainId.CELO;
        case 44787:
            return sdk_core_1.ChainId.CELO_ALFAJORES;
        case 100:
            return sdk_core_1.ChainId.GNOSIS;
        case 1284:
            return sdk_core_1.ChainId.MOONBEAM;
        case 43114:
            return sdk_core_1.ChainId.AVALANCHE;
        case 8453:
            return sdk_core_1.ChainId.BASE;
        case 84531:
            return sdk_core_1.ChainId.BASE_GOERLI;
        case 81457:
            return sdk_core_1.ChainId.BLAST;
        case 84532:
            return sdk_core_1.ChainId.BASE_SEPOLIA;
        case 167000:
            return sdk_core_1.ChainId.TAIKO;
        default:
            throw new Error(`Unknown chain id: ${id}`);
    }
};
exports.ID_TO_CHAIN_ID = ID_TO_CHAIN_ID;
var ChainName;
(function (ChainName) {
    ChainName["MAINNET"] = "mainnet";
    ChainName["GOERLI"] = "goerli";
    ChainName["SEPOLIA"] = "sepolia";
    ChainName["OPTIMISM"] = "optimism-mainnet";
    ChainName["OPTIMISM_GOERLI"] = "optimism-goerli";
    ChainName["OPTIMISM_SEPOLIA"] = "optimism-sepolia";
    ChainName["ARBITRUM_ONE"] = "arbitrum-mainnet";
    ChainName["ARBITRUM_GOERLI"] = "arbitrum-goerli";
    ChainName["ARBITRUM_SEPOLIA"] = "arbitrum-sepolia";
    ChainName["POLYGON"] = "polygon-mainnet";
    ChainName["POLYGON_MUMBAI"] = "polygon-mumbai";
    ChainName["CELO"] = "celo-mainnet";
    ChainName["CELO_ALFAJORES"] = "celo-alfajores";
    ChainName["GNOSIS"] = "gnosis-mainnet";
    ChainName["MOONBEAM"] = "moonbeam-mainnet";
    ChainName["BNB"] = "bnb-mainnet";
    ChainName["AVALANCHE"] = "avalanche-mainnet";
    ChainName["BASE"] = "base-mainnet";
    ChainName["BASE_GOERLI"] = "base-goerli";
    ChainName["BLAST"] = "blast-mainnet";
    ChainName["BASE_SEPOLIA"] = "base-sepolia";
    ChainName["TAIKO"] = "takio";
})(ChainName = exports.ChainName || (exports.ChainName = {}));
var NativeCurrencyName;
(function (NativeCurrencyName) {
    // Strings match input for CLI
    NativeCurrencyName["ETHER"] = "ETH";
    NativeCurrencyName["MATIC"] = "MATIC";
    NativeCurrencyName["CELO"] = "CELO";
    NativeCurrencyName["GNOSIS"] = "XDAI";
    NativeCurrencyName["MOONBEAM"] = "GLMR";
    NativeCurrencyName["BNB"] = "BNB";
    NativeCurrencyName["AVALANCHE"] = "AVAX";
})(NativeCurrencyName = exports.NativeCurrencyName || (exports.NativeCurrencyName = {}));
exports.NATIVE_NAMES_BY_ID = {
    [sdk_core_1.ChainId.MAINNET]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.GOERLI]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.SEPOLIA]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.OPTIMISM]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.OPTIMISM_GOERLI]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.OPTIMISM_SEPOLIA]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.ARBITRUM_ONE]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.ARBITRUM_GOERLI]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.ARBITRUM_SEPOLIA]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.POLYGON]: ['MATIC', '0x0000000000000000000000000000000000001010'],
    [sdk_core_1.ChainId.POLYGON_MUMBAI]: [
        'MATIC',
        '0x0000000000000000000000000000000000001010',
    ],
    [sdk_core_1.ChainId.CELO]: ['CELO'],
    [sdk_core_1.ChainId.CELO_ALFAJORES]: ['CELO'],
    [sdk_core_1.ChainId.GNOSIS]: ['XDAI'],
    [sdk_core_1.ChainId.MOONBEAM]: ['GLMR'],
    [sdk_core_1.ChainId.BNB]: ['BNB', 'BNB', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
    [sdk_core_1.ChainId.AVALANCHE]: [
        'AVAX',
        'AVALANCHE',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.BASE]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.BLAST]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.BASE_SEPOLIA]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
    [sdk_core_1.ChainId.TAIKO]: [
        'ETH',
        'ETHER',
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ],
};
exports.NATIVE_CURRENCY = {
    [sdk_core_1.ChainId.MAINNET]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.GOERLI]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.SEPOLIA]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.OPTIMISM]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.OPTIMISM_GOERLI]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.OPTIMISM_SEPOLIA]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.ARBITRUM_ONE]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.ARBITRUM_GOERLI]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.ARBITRUM_SEPOLIA]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.POLYGON]: NativeCurrencyName.MATIC,
    [sdk_core_1.ChainId.POLYGON_MUMBAI]: NativeCurrencyName.MATIC,
    [sdk_core_1.ChainId.CELO]: NativeCurrencyName.CELO,
    [sdk_core_1.ChainId.CELO_ALFAJORES]: NativeCurrencyName.CELO,
    [sdk_core_1.ChainId.GNOSIS]: NativeCurrencyName.GNOSIS,
    [sdk_core_1.ChainId.MOONBEAM]: NativeCurrencyName.MOONBEAM,
    [sdk_core_1.ChainId.BNB]: NativeCurrencyName.BNB,
    [sdk_core_1.ChainId.AVALANCHE]: NativeCurrencyName.AVALANCHE,
    [sdk_core_1.ChainId.BASE]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.BLAST]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.BASE_SEPOLIA]: NativeCurrencyName.ETHER,
    [sdk_core_1.ChainId.TAIKO]: NativeCurrencyName.ETHER,
};
const ID_TO_NETWORK_NAME = (id) => {
    switch (id) {
        case 1:
            return ChainName.MAINNET;
        case 5:
            return ChainName.GOERLI;
        case 11155111:
            return ChainName.SEPOLIA;
        case 56:
            return ChainName.BNB;
        case 10:
            return ChainName.OPTIMISM;
        case 420:
            return ChainName.OPTIMISM_GOERLI;
        case 11155420:
            return ChainName.OPTIMISM_SEPOLIA;
        case 42161:
            return ChainName.ARBITRUM_ONE;
        case 421613:
            return ChainName.ARBITRUM_GOERLI;
        case 421614:
            return ChainName.ARBITRUM_SEPOLIA;
        case 137:
            return ChainName.POLYGON;
        case 80001:
            return ChainName.POLYGON_MUMBAI;
        case 42220:
            return ChainName.CELO;
        case 44787:
            return ChainName.CELO_ALFAJORES;
        case 100:
            return ChainName.GNOSIS;
        case 1284:
            return ChainName.MOONBEAM;
        case 43114:
            return ChainName.AVALANCHE;
        case 8453:
            return ChainName.BASE;
        case 84531:
            return ChainName.BASE_GOERLI;
        case 81457:
            return ChainName.BLAST;
        case 84532:
            return ChainName.BASE_SEPOLIA;
        case 167000:
            return ChainName.TAIKO;
        default:
            throw new Error(`Unknown chain id: ${id}`);
    }
};
exports.ID_TO_NETWORK_NAME = ID_TO_NETWORK_NAME;
exports.CHAIN_IDS_LIST = Object.values(sdk_core_1.ChainId).map((c) => c.toString());
const ID_TO_PROVIDER = (id) => {
    switch (id) {
        case sdk_core_1.ChainId.MAINNET:
            return process.env.JSON_RPC_PROVIDER;
        case sdk_core_1.ChainId.GOERLI:
            return process.env.JSON_RPC_PROVIDER_GORLI;
        case sdk_core_1.ChainId.SEPOLIA:
            return process.env.JSON_RPC_PROVIDER_SEPOLIA;
        case sdk_core_1.ChainId.OPTIMISM:
            return process.env.JSON_RPC_PROVIDER_OPTIMISM;
        case sdk_core_1.ChainId.OPTIMISM_GOERLI:
            return process.env.JSON_RPC_PROVIDER_OPTIMISM_GOERLI;
        case sdk_core_1.ChainId.OPTIMISM_SEPOLIA:
            return process.env.JSON_RPC_PROVIDER_OPTIMISM_SEPOLIA;
        case sdk_core_1.ChainId.ARBITRUM_ONE:
            return process.env.JSON_RPC_PROVIDER_ARBITRUM_ONE;
        case sdk_core_1.ChainId.ARBITRUM_GOERLI:
            return process.env.JSON_RPC_PROVIDER_ARBITRUM_GOERLI;
        case sdk_core_1.ChainId.ARBITRUM_SEPOLIA:
            return process.env.JSON_RPC_PROVIDER_ARBITRUM_SEPOLIA;
        case sdk_core_1.ChainId.POLYGON:
            return process.env.JSON_RPC_PROVIDER_POLYGON;
        case sdk_core_1.ChainId.POLYGON_MUMBAI:
            return process.env.JSON_RPC_PROVIDER_POLYGON_MUMBAI;
        case sdk_core_1.ChainId.CELO:
            return process.env.JSON_RPC_PROVIDER_CELO;
        case sdk_core_1.ChainId.CELO_ALFAJORES:
            return process.env.JSON_RPC_PROVIDER_CELO_ALFAJORES;
        case sdk_core_1.ChainId.BNB:
            return process.env.JSON_RPC_PROVIDER_BNB;
        case sdk_core_1.ChainId.AVALANCHE:
            return process.env.JSON_RPC_PROVIDER_AVALANCHE;
        case sdk_core_1.ChainId.BASE:
            return process.env.JSON_RPC_PROVIDER_BASE;
        case sdk_core_1.ChainId.BLAST:
            return process.env.JSON_RPC_PROVIDER_BLAST;
        case sdk_core_1.ChainId.BASE_SEPOLIA:
            return process.env.JSON_RPC_PROVIDER_BASE_SEPOLIA;
        case sdk_core_1.ChainId.TAIKO:
            return process.env.JSON_RPC_PROVIDER_TAIKO;
        default:
            throw new Error(`Chain id: ${id} not supported`);
    }
};
exports.ID_TO_PROVIDER = ID_TO_PROVIDER;
exports.WRAPPED_NATIVE_CURRENCY = {
    [sdk_core_1.ChainId.MAINNET]: new sdk_core_1.Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.GOERLI]: new sdk_core_1.Token(5, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.SEPOLIA]: new sdk_core_1.Token(11155111, '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.BNB]: new sdk_core_1.Token(56, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
    [sdk_core_1.ChainId.OPTIMISM]: new sdk_core_1.Token(sdk_core_1.ChainId.OPTIMISM, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.OPTIMISM_GOERLI]: new sdk_core_1.Token(sdk_core_1.ChainId.OPTIMISM_GOERLI, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.OPTIMISM_SEPOLIA]: new sdk_core_1.Token(sdk_core_1.ChainId.OPTIMISM_SEPOLIA, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.ARBITRUM_ONE]: new sdk_core_1.Token(sdk_core_1.ChainId.ARBITRUM_ONE, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.ARBITRUM_GOERLI]: new sdk_core_1.Token(sdk_core_1.ChainId.ARBITRUM_GOERLI, '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.ARBITRUM_SEPOLIA]: new sdk_core_1.Token(sdk_core_1.ChainId.ARBITRUM_SEPOLIA, '0xc556bAe1e86B2aE9c22eA5E036b07E55E7596074', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.POLYGON]: new sdk_core_1.Token(sdk_core_1.ChainId.POLYGON, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WMATIC', 'Wrapped MATIC'),
    [sdk_core_1.ChainId.POLYGON_MUMBAI]: new sdk_core_1.Token(sdk_core_1.ChainId.POLYGON_MUMBAI, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18, 'WMATIC', 'Wrapped MATIC'),
    // The Celo native currency 'CELO' implements the erc-20 token standard
    [sdk_core_1.ChainId.CELO]: new sdk_core_1.Token(sdk_core_1.ChainId.CELO, '0x471EcE3750Da237f93B8E339c536989b8978a438', 18, 'CELO', 'Celo native asset'),
    [sdk_core_1.ChainId.CELO_ALFAJORES]: new sdk_core_1.Token(sdk_core_1.ChainId.CELO_ALFAJORES, '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9', 18, 'CELO', 'Celo native asset'),
    [sdk_core_1.ChainId.GNOSIS]: new sdk_core_1.Token(sdk_core_1.ChainId.GNOSIS, '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d', 18, 'WXDAI', 'Wrapped XDAI on Gnosis'),
    [sdk_core_1.ChainId.MOONBEAM]: new sdk_core_1.Token(sdk_core_1.ChainId.MOONBEAM, '0xAcc15dC74880C9944775448304B263D191c6077F', 18, 'WGLMR', 'Wrapped GLMR'),
    [sdk_core_1.ChainId.AVALANCHE]: new sdk_core_1.Token(sdk_core_1.ChainId.AVALANCHE, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, 'WAVAX', 'Wrapped AVAX'),
    [sdk_core_1.ChainId.BASE]: new sdk_core_1.Token(sdk_core_1.ChainId.BASE, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.BASE_GOERLI]: new sdk_core_1.Token(sdk_core_1.ChainId.BASE_GOERLI, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.ROOTSTOCK]: new sdk_core_1.Token(sdk_core_1.ChainId.ROOTSTOCK, '0x542fDA317318eBF1d3DEAf76E0b632741A7e677d', 18, 'WRBTC', 'Wrapped BTC'),
    [sdk_core_1.ChainId.ZORA]: new sdk_core_1.Token(sdk_core_1.ChainId.ZORA, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.ZORA_SEPOLIA]: new sdk_core_1.Token(sdk_core_1.ChainId.ZORA_SEPOLIA, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.BLAST]: new sdk_core_1.Token(sdk_core_1.ChainId.BLAST, '0x4300000000000000000000000000000000000004', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.BASE_SEPOLIA]: new sdk_core_1.Token(sdk_core_1.ChainId.BASE_SEPOLIA, '0x6267947C818ff3900F620FC97d590702afB69147', 18, 'WETH', 'Wrapped Ether'),
    [sdk_core_1.ChainId.TAIKO]: new sdk_core_1.Token(sdk_core_1.ChainId.TAIKO, '0xA51894664A773981C6C112C43ce576f315d5b1B6', 18, 'WETH', 'Wrapped Ether'),
};
function isMatic(chainId) {
    return chainId === sdk_core_1.ChainId.POLYGON_MUMBAI || chainId === sdk_core_1.ChainId.POLYGON;
}
class MaticNativeCurrency extends sdk_core_1.NativeCurrency {
    equals(other) {
        return other.isNative && other.chainId === this.chainId;
    }
    get wrapped() {
        if (!isMatic(this.chainId))
            throw new Error('Not matic');
        const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
        if (nativeCurrency) {
            return nativeCurrency;
        }
        throw new Error(`Does not support this chain ${this.chainId}`);
    }
    constructor(chainId) {
        if (!isMatic(chainId))
            throw new Error('Not matic');
        super(chainId, 18, 'MATIC', 'Polygon Matic');
    }
}
function isCelo(chainId) {
    return chainId === sdk_core_1.ChainId.CELO_ALFAJORES || chainId === sdk_core_1.ChainId.CELO;
}
class CeloNativeCurrency extends sdk_core_1.NativeCurrency {
    equals(other) {
        return other.isNative && other.chainId === this.chainId;
    }
    get wrapped() {
        if (!isCelo(this.chainId))
            throw new Error('Not celo');
        const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
        if (nativeCurrency) {
            return nativeCurrency;
        }
        throw new Error(`Does not support this chain ${this.chainId}`);
    }
    constructor(chainId) {
        if (!isCelo(chainId))
            throw new Error('Not celo');
        super(chainId, 18, 'CELO', 'Celo');
    }
}
function isGnosis(chainId) {
    return chainId === sdk_core_1.ChainId.GNOSIS;
}
class GnosisNativeCurrency extends sdk_core_1.NativeCurrency {
    equals(other) {
        return other.isNative && other.chainId === this.chainId;
    }
    get wrapped() {
        if (!isGnosis(this.chainId))
            throw new Error('Not gnosis');
        const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
        if (nativeCurrency) {
            return nativeCurrency;
        }
        throw new Error(`Does not support this chain ${this.chainId}`);
    }
    constructor(chainId) {
        if (!isGnosis(chainId))
            throw new Error('Not gnosis');
        super(chainId, 18, 'XDAI', 'xDai');
    }
}
function isBnb(chainId) {
    return chainId === sdk_core_1.ChainId.BNB;
}
class BnbNativeCurrency extends sdk_core_1.NativeCurrency {
    equals(other) {
        return other.isNative && other.chainId === this.chainId;
    }
    get wrapped() {
        if (!isBnb(this.chainId))
            throw new Error('Not bnb');
        const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
        if (nativeCurrency) {
            return nativeCurrency;
        }
        throw new Error(`Does not support this chain ${this.chainId}`);
    }
    constructor(chainId) {
        if (!isBnb(chainId))
            throw new Error('Not bnb');
        super(chainId, 18, 'BNB', 'BNB');
    }
}
function isMoonbeam(chainId) {
    return chainId === sdk_core_1.ChainId.MOONBEAM;
}
class MoonbeamNativeCurrency extends sdk_core_1.NativeCurrency {
    equals(other) {
        return other.isNative && other.chainId === this.chainId;
    }
    get wrapped() {
        if (!isMoonbeam(this.chainId))
            throw new Error('Not moonbeam');
        const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
        if (nativeCurrency) {
            return nativeCurrency;
        }
        throw new Error(`Does not support this chain ${this.chainId}`);
    }
    constructor(chainId) {
        if (!isMoonbeam(chainId))
            throw new Error('Not moonbeam');
        super(chainId, 18, 'GLMR', 'Glimmer');
    }
}
function isAvax(chainId) {
    return chainId === sdk_core_1.ChainId.AVALANCHE;
}
class AvalancheNativeCurrency extends sdk_core_1.NativeCurrency {
    equals(other) {
        return other.isNative && other.chainId === this.chainId;
    }
    get wrapped() {
        if (!isAvax(this.chainId))
            throw new Error('Not avalanche');
        const nativeCurrency = exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
        if (nativeCurrency) {
            return nativeCurrency;
        }
        throw new Error(`Does not support this chain ${this.chainId}`);
    }
    constructor(chainId) {
        if (!isAvax(chainId))
            throw new Error('Not avalanche');
        super(chainId, 18, 'AVAX', 'Avalanche');
    }
}
class ExtendedEther extends sdk_core_1.Ether {
    get wrapped() {
        if (this.chainId in exports.WRAPPED_NATIVE_CURRENCY) {
            return exports.WRAPPED_NATIVE_CURRENCY[this.chainId];
        }
        throw new Error('Unsupported chain ID');
    }
    static onChain(chainId) {
        var _a;
        return ((_a = this._cachedExtendedEther[chainId]) !== null && _a !== void 0 ? _a : (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId)));
    }
}
exports.ExtendedEther = ExtendedEther;
ExtendedEther._cachedExtendedEther = {};
const cachedNativeCurrency = {};
function nativeOnChain(chainId) {
    if (cachedNativeCurrency[chainId] != undefined) {
        return cachedNativeCurrency[chainId];
    }
    if (isMatic(chainId)) {
        cachedNativeCurrency[chainId] = new MaticNativeCurrency(chainId);
    }
    else if (isCelo(chainId)) {
        cachedNativeCurrency[chainId] = new CeloNativeCurrency(chainId);
    }
    else if (isGnosis(chainId)) {
        cachedNativeCurrency[chainId] = new GnosisNativeCurrency(chainId);
    }
    else if (isMoonbeam(chainId)) {
        cachedNativeCurrency[chainId] = new MoonbeamNativeCurrency(chainId);
    }
    else if (isBnb(chainId)) {
        cachedNativeCurrency[chainId] = new BnbNativeCurrency(chainId);
    }
    else if (isAvax(chainId)) {
        cachedNativeCurrency[chainId] = new AvalancheNativeCurrency(chainId);
    }
    else {
        cachedNativeCurrency[chainId] = ExtendedEther.onChain(chainId);
    }
    return cachedNativeCurrency[chainId];
}
exports.nativeOnChain = nativeOnChain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvY2hhaW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQU0yQjtBQUUzQix3QkFBd0I7QUFDWCxRQUFBLGdCQUFnQixHQUFjO0lBQ3pDLGtCQUFPLENBQUMsT0FBTztJQUNmLGtCQUFPLENBQUMsUUFBUTtJQUNoQixrQkFBTyxDQUFDLGVBQWU7SUFDdkIsa0JBQU8sQ0FBQyxnQkFBZ0I7SUFDeEIsa0JBQU8sQ0FBQyxZQUFZO0lBQ3BCLGtCQUFPLENBQUMsZUFBZTtJQUN2QixrQkFBTyxDQUFDLGdCQUFnQjtJQUN4QixrQkFBTyxDQUFDLE9BQU87SUFDZixrQkFBTyxDQUFDLGNBQWM7SUFDdEIsa0JBQU8sQ0FBQyxPQUFPO0lBQ2Ysa0JBQU8sQ0FBQyxjQUFjO0lBQ3RCLGtCQUFPLENBQUMsSUFBSTtJQUNaLGtCQUFPLENBQUMsR0FBRztJQUNYLGtCQUFPLENBQUMsU0FBUztJQUNqQixrQkFBTyxDQUFDLElBQUk7SUFDWixrQkFBTyxDQUFDLEtBQUs7SUFDYiw0REFBNEQ7SUFDNUQsa0JBQU8sQ0FBQyxZQUFZO0lBQ3BCLGtCQUFPLENBQUMsS0FBSztDQUNkLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRztJQUMxQixrQkFBTyxDQUFDLE9BQU87SUFDZixrQkFBTyxDQUFDLE9BQU87SUFDZixrQkFBTyxDQUFDLFlBQVk7SUFDcEIsa0JBQU8sQ0FBQyxRQUFRO0lBQ2hCLGtCQUFPLENBQUMsT0FBTztJQUNmLGtCQUFPLENBQUMsSUFBSTtJQUNaLGtCQUFPLENBQUMsR0FBRztJQUNYLGtCQUFPLENBQUMsU0FBUztJQUNqQixFQUFFO0lBQ0Ysa0JBQU8sQ0FBQyxZQUFZO0lBQ3BCLGtCQUFPLENBQUMsS0FBSztDQUNkLENBQUM7QUFFVyxRQUFBLFVBQVUsR0FBRztJQUN4QixrQkFBTyxDQUFDLFFBQVE7SUFDaEIsa0JBQU8sQ0FBQyxlQUFlO0lB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