import { Token } from "modules/Token";
import { ApproveTask } from "../tasks/ApproveTask";
import { UniswapV2SwapTask } from "../tasks/move/UniswapV2SwapTask";
import { TaskBase } from "../tasks/TaskBase";
import { constants } from "ethers";
import { PROTOCOLS } from "data";

export const bundleSwapTasks = (
  fromTokens: Token[],
  toToken: Token,
  to: string
): TaskBase<any>[] => {
  const chainId = toToken.chainId;
  if (fromTokens.some((token) => token.chainId !== chainId)) {
    throw new Error("All tokens must be on the same chain");
  }
  const protocol = PROTOCOLS.find(
    (p) => p.chainId === chainId && p.usage === "swap"
  );
  if (!protocol) {
    throw new Error(`Protocol not found for chainId ${chainId}`);
  }

  return fromTokens.flatMap((fromToken) => {
    if (fromToken.address === toToken.address) return [];
    const res: TaskBase<any>[] = [];
    if (fromToken.address !== constants.AddressZero) {
      res.push(
        new ApproveTask(
          fromToken,
          protocol.data.routerAddress,
          `${protocol.name} Router`
        )
      );
    }

    return res.concat([
      new UniswapV2SwapTask(chainId, fromToken, toToken, protocol, to),
    ]);
  });
};
