import { Token } from "modules/Token";
import {
  UniswapV2PartitionTask,
  UniswapV2PartitionTaskData,
} from "modules/taskManager/tasks/invest/UniswapV2PartitionTask";
import { useEffect, useState } from "react";

interface PartitionRunViewProps {
  task: UniswapV2PartitionTask;
}

export const PartitionRunView = ({ task }: PartitionRunViewProps) => {
  const [data, setData] = useState<UniswapV2PartitionTaskData | null>(null);
  useEffect(() => {
    task.subscribe(setData);
  }, []);
  if (!data) return <></>;
  const baseToken = Token.get(data.chainId, data.baseTokenAddr)!;

  return (
    <div>
      <p className="text-xl">
        Invest {data.pair.protocol} with {+data.amountIn!}{" "}
        {baseToken.symbol}
      </p>
    </div>
  );
};
