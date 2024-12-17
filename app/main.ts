import dotenv from "dotenv";
dotenv.config();

import {
	RETH_TOKEN,
	WETH_TOKEN,
	USDC_TOKEN,
	fromReadableAmountJSBI,
} from "./helpers";

import { providers } from "ethers";

import {
	AlphaRouter,
	SwapType,
	type SwapRoute,
	type SwapOptionsSwapRouter02,
} from "@uniswap/smart-order-router";

import {
    CurrencyAmount,
    Percent,
    TradeType,
} from "@uniswap/sdk-core";

const URL = process.env.RPC_URL
if(!URL) {
    console.log("no RPC_URL present, set your .env file with RPC_URL")
    process.exit(1);
}
console.log(`attempting to gain a route on url:\n${URL}`);


const recipient = "0xbd20D26492D33C09b0D4F29dD8cd1365a1910d57";
const chainId = 1;
const inToken = WETH_TOKEN;
const outToken = RETH_TOKEN;
const inAmount = 1;

const provider = new providers.JsonRpcProvider(URL);

const runner = async () => {

    const router = new AlphaRouter({
		chainId,
		provider,
	});

	const options: SwapOptionsSwapRouter02 = {
		recipient,
		slippageTolerance: new Percent(50, 10_000),
		deadline: Math.floor(Date.now() / 1000 + 1800),
		type: SwapType.SWAP_ROUTER_02,
	};

	const route = await router.route(
		// CurrencyAmount.fromRawAmount(InToken, fromReadableAmountJSBI(InAmount, InToken.decimals).toString()),
		CurrencyAmount.fromRawAmount(
			inToken,
			fromReadableAmountJSBI(inAmount, inToken.decimals).toString(),
		),
		outToken,
		TradeType.EXACT_INPUT,
		options,
	);

	console.log("route:", route);
};

runner().then((_) => console.log("complete"));
