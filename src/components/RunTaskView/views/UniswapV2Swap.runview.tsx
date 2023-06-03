import { Token } from "modules/Token";
import {
  UniswapV2SwapTask,
  UniswapV2SwapTaskData,
} from "modules/taskManager/tasks/move/UniswapV2SwapTask";
import { useEffect, useState } from "react";

interface UniswapV2SwapRunViewProps {
  task: UniswapV2SwapTask;
}

export const UniswapV2SwapRunView = ({ task }: UniswapV2SwapRunViewProps) => {
  const [data, setData] = useState<UniswapV2SwapTaskData | null>(null);
  useEffect(() => {
    task.subscribe(setData);
  }, []);

  if (!data) return <></>;
  const fromToken = Token.get(data.chainId, data.fromTokenAddr)!;
  const toToken = Token.get(data.chainId, data.toTokenAddr)!;

  return (
    <div>
      <p className="text-xl">
        Swap from {+data.amountIn!} {fromToken.symbol} to {+data.amountOut!}{" "}
        {toToken.symbol}
      </p>
    </div>
  );
};
