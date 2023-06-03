import { TOKENS } from "data";
import { Token } from "modules/Token";

export const substituteWETH = (token: Token) => {
  const chain = token.getChain();
  const WETH = TOKENS.find(
    (t) => t.chainId === chain.id && t.symbol === "WETH"
  )!;

  return token.isNativeToken() ? WETH : token;
};
