import { Token } from "modules/Token";
import {
  ApproveTask,
  ApproveTaskData,
} from "modules/taskManager/tasks/ApproveTask";
import { useEffect, useState } from "react";

interface ApproveRunViewProps {
  task: ApproveTask;
}

export const ApproveRunView = ({ task }: ApproveRunViewProps) => {
  const [data, setData] = useState<ApproveTaskData | null>(null);
  useEffect(() => {
    task.subscribe(setData);
  }, []);
  if(!data) return <></>;

  const token = Token.get(task.chainId, data.tokenAddr)!;
  return (
    <div>
      <p className="text-xl">Approve {+data.amount!} {token.symbol} for {data.spenderAlias}</p>
    </div>
  );
};
