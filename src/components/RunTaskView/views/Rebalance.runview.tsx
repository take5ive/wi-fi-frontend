import { Token } from "modules/Token";
import {
  UniswapV2RebalanceTask,
  UniswapV2RebalanceTaskData,
} from "modules/taskManager/tasks/invest/UniswapV2RebalanceTask";
import { useEffect, useState } from "react";

interface RebalanceRunViewProps {
  task: UniswapV2RebalanceTask;
}

export const RebalanceRunView = ({ task }: RebalanceRunViewProps) => {
  const [data, setData] = useState<UniswapV2RebalanceTaskData | null>(null);
  useEffect(() => {
    task.subscribe(setData);
  }, []);
  if (!data) return <></>;
  const baseToken = Token.get(data.chainId, data.baseTokenAddr)!;
  const farmToken = Token.get(data.chainId, data.farmTokenAddr)!;

  return (
    <div>
      <p className="text-xl">
        Invest {data.pair.protocol} with {+data.amountInBase!}{" "}
        {baseToken.symbol} and {+data.amountInFarm!} {farmToken.symbol}
      </p>
    </div>
  );
};
