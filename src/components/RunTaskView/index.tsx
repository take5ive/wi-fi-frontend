import { TaskBase } from "modules/taskManager/tasks/TaskBase";
import { getRunTaskViewRouter } from "./views";
import { useCallback } from "react";
import { TaskStatusEnum } from "interfaces/tasks/task-status.interface";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface RunTaskViewProps {
  task: TaskBase<any>;
  status: TaskStatusEnum;
  run: () => void;
}

export const RunTaskView = ({ task, status, run }: RunTaskViewProps) => {
  const RunView = useCallback(getRunTaskViewRouter(task.name), [
    task.name,
    task.chainId,
  ]);

  return (
    // <section className="flex flex-col border rounded-lg aspect-video px-6 py-4">
    <section className="flex flex-col border rounded-lg px-6 py-4">
      <div className="flex-1 mb-4">
        <RunView task={task} />
      </div>
      {status === TaskStatusEnum.Pending ? (
        <button onClick={run} className="btn btn-primary">
          Run
        </button>
      ) : [TaskStatusEnum.Signed, TaskStatusEnum.Sent].includes(status) ? (
        <div className="btn text-neutral-400 border-[1.5px] border-neutral-400">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p className="ml-4 mr-6">
            {status === TaskStatusEnum.Signed
              ? "Transaction Signed"
              : "Waiting for the transaction to be confirmed."}
          </p>
        </div>
      ) : status === TaskStatusEnum.Predicting ? (
        <div className="btn text-primary-500/80 border-[1.5px] border-primary-500/80">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p className="ml-4 mr-6">Transaction Done!</p>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};
