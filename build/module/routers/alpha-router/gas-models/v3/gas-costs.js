import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '@uniswap/sdk-core';
import { AAVE_MAINNET, LIDO_MAINNET } from '../../../../providers';
// Cost for crossing an uninitialized tick.
export const COST_PER_UNINIT_TICK = BigNumber.from(0);
//l2 execution fee on optimism is roughly the same as mainnet
export const BASE_SWAP_COST = (id) => {
    switch (id) {
        case ChainId.MAINNET:
        case ChainId.GOERLI:
        case ChainId.SEPOLIA:
        case ChainId.OPTIMISM:
        case ChainId.OPTIMISM_GOERLI:
        case ChainId.OPTIMISM_SEPOLIA:
        case ChainId.BNB:
        case ChainId.AVALANCHE:
        case ChainId.BASE:
        case ChainId.BASE_GOERLI:
        case ChainId.ZORA:
        case ChainId.ZORA_SEPOLIA:
        case ChainId.ROOTSTOCK:
        case ChainId.BLAST:
            return BigNumber.from(2000);
        case ChainId.ARBITRUM_ONE:
        case ChainId.ARBITRUM_GOERLI:
        case ChainId.ARBITRUM_SEPOLIA:
            return BigNumber.from(5000);
        case ChainId.POLYGON:
        case ChainId.POLYGON_MUMBAI:
            return BigNumber.from(2000);
        case ChainId.CELO:
        case ChainId.CELO_ALFAJORES:
            return BigNumber.from(2000);
        //TODO determine if sufficient
        case ChainId.GNOSIS:
            return BigNumber.from(2000);
        case ChainId.MOONBEAM:
            return BigNumber.from(2000);
        case ChainId.BASE_SEPOLIA:
            return BigNumber.from(2000);
        case ChainId.TAIKO:
            return BigNumber.from(2000);
    }
};
export const COST_PER_INIT_TICK = (id) => {
    switch (id) {
        case ChainId.MAINNET:
        case ChainId.GOERLI:
        case ChainId.SEPOLIA:
        case ChainId.BNB:
        case ChainId.AVALANCHE:
            return BigNumber.from(31000);
        case ChainId.OPTIMISM:
        case ChainId.OPTIMISM_GOERLI:
        case ChainId.OPTIMISM_SEPOLIA:
        case ChainId.BASE:
        case ChainId.BASE_GOERLI:
        case ChainId.ZORA:
        case ChainId.ZORA_SEPOLIA:
        case ChainId.ROOTSTOCK:
        case ChainId.BLAST:
        case ChainId.TAIKO:
            return BigNumber.from(31000);
        case ChainId.ARBITRUM_ONE:
        case ChainId.ARBITRUM_GOERLI:
        case ChainId.ARBITRUM_SEPOLIA:
            return BigNumber.from(31000);
        case ChainId.POLYGON:
        case ChainId.POLYGON_MUMBAI:
            return BigNumber.from(31000);
        case ChainId.CELO:
        case ChainId.CELO_ALFAJORES:
            return BigNumber.from(31000);
        case ChainId.GNOSIS:
            return BigNumber.from(31000);
        case ChainId.MOONBEAM:
            return BigNumber.from(31000);
        case ChainId.BASE_SEPOLIA:
            return BigNumber.from(31000);
    }
};
export const COST_PER_HOP = (id) => {
    switch (id) {
        case ChainId.MAINNET:
        case ChainId.GOERLI:
        case ChainId.SEPOLIA:
        case ChainId.BNB:
        case ChainId.OPTIMISM:
        case ChainId.OPTIMISM_GOERLI:
        case ChainId.OPTIMISM_SEPOLIA:
        case ChainId.AVALANCHE:
        case ChainId.BASE:
        case ChainId.BASE_GOERLI:
        case ChainId.ZORA:
        case ChainId.ZORA_SEPOLIA:
        case ChainId.ROOTSTOCK:
        case ChainId.BLAST:
        case ChainId.BASE_SEPOLIA:
        case ChainId.TAIKO:
            return BigNumber.from(80000);
        case ChainId.ARBITRUM_ONE:
        case ChainId.ARBITRUM_GOERLI:
        case ChainId.ARBITRUM_SEPOLIA:
            return BigNumber.from(80000);
        case ChainId.POLYGON:
        case ChainId.POLYGON_MUMBAI:
            return BigNumber.from(80000);
        case ChainId.CELO:
        case ChainId.CELO_ALFAJORES:
            return BigNumber.from(80000);
        case ChainId.GNOSIS:
            return BigNumber.from(80000);
        case ChainId.MOONBEAM:
            return BigNumber.from(80000);
    }
};
export const SINGLE_HOP_OVERHEAD = (_id) => {
    return BigNumber.from(15000);
};
export const TOKEN_OVERHEAD = (id, route) => {
    const tokens = route.tokenPath;
    let overhead = BigNumber.from(0);
    if (id == ChainId.MAINNET) {
        // AAVE's transfer contains expensive governance snapshotting logic. We estimate
        // it at around 150k.
        if (tokens.some((t) => t.equals(AAVE_MAINNET))) {
            overhead = overhead.add(150000);
        }
        // LDO's reaches out to an external token controller which adds a large overhead
        // of around 150k.
        if (tokens.some((t) => t.equals(LIDO_MAINNET))) {
            overhead = overhead.add(150000);
        }
    }
    return overhead;
};
// TODO: change per chain
export const NATIVE_WRAP_OVERHEAD = (id) => {
    switch (id) {
        default:
            return BigNumber.from(27938);
    }
};
export const NATIVE_UNWRAP_OVERHEAD = (id) => {
    switch (id) {
        default:
            return BigNumber.from(36000);
    }
};
export const NATIVE_OVERHEAD = (chainId, amount, quote) => {
    if (amount.isNative) {
        // need to wrap eth in
        return NATIVE_WRAP_OVERHEAD(chainId);
    }
    if (quote.isNative) {
        // need to unwrap eth out
        return NATIVE_UNWRAP_OVERHEAD(chainId);
    }
    return BigNumber.from(0);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzLWNvc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2dhcy1tb2RlbHMvdjMvZ2FzLWNvc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsT0FBTyxFQUFtQixNQUFNLG1CQUFtQixDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHbkUsMkNBQTJDO0FBQzNDLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFdEQsNkRBQTZEO0FBQzdELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEVBQVcsRUFBYSxFQUFFO0lBQ3ZELFFBQVEsRUFBRSxFQUFFO1FBQ1YsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3JCLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNwQixLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDckIsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RCLEtBQUssT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUM3QixLQUFLLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QixLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDakIsS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQztRQUNsQixLQUFLLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDekIsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2xCLEtBQUssT0FBTyxDQUFDLFlBQVksQ0FBQztRQUMxQixLQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDdkIsS0FBSyxPQUFPLENBQUMsS0FBSztZQUNoQixP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