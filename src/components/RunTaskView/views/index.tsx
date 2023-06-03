import { FC } from "react";
import { ApproveRunView } from "./Approve.runview";
import { UniswapV2SwapRunView } from "./UniswapV2Swap.runview";
import { PartitionRunView } from "./Partition.runview";
import { RebalanceRunView } from "./Rebalance.runview";
import { DecomposeRunView } from "./Decompose.runview";
import { WiFiBridgeRunView } from "./Bridge.runview";

export const getRunTaskViewRouter = (
  taskName: string
): FC<{ task: any }> => {
  switch (taskName) {
    case "Approve":
      return ApproveRunView;
      case "Bridge":
        return WiFiBridgeRunView;
      case "Decompose":
        return DecomposeRunView;
      case "Partition":
        return PartitionRunView;
      case "Rebalance":
        return RebalanceRunView;
      case "Swap":
        return UniswapV2SwapRunView;
    default:
      return () => <div></div>;
  }
};
