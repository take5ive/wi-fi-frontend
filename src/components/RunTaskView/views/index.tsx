import { FC } from "react";
import { ApproveRunView } from "./Approve.runview";
import { UniswapV2SwapRunView } from "./UniswapV2Swap.runview";

export const getRunTaskViewRouter = (
  taskName: string
): FC<{ task: any }> => {
  switch (taskName) {
    case "Approve":
      return ApproveRunView;
    //   case "Bridge":
    //     return BridgeBlock;
    //   case "Decompose":
    //     return DecomposeBlock;
    //   case "Partition":
    //     return PartitionBlock;
    //   case "Rebalance":
    //     return RebalanceBlock;
      case "Swap":
        return UniswapV2SwapRunView;
    default:
      return () => <div></div>;
  }
};
