import JSBI from "jsbi";

export function fromReadableAmountJSBI(amount: number, decimals: number): JSBI {
	const extraDigits = 10 ** countDecimals(amount);
	const adjustedAmount = amount * extraDigits;
	return JSBI.divide(
		JSBI.multiply(
			JSBI.BigInt(adjustedAmount),
			JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals)),
		),
		JSBI.BigInt(extraDigits),
	);
}

function countDecimals(x: number) {
	if (Math.floor(x) === x) {
		return 0;
	}
	return x.toString().split(".")[1].length || 0;
}
