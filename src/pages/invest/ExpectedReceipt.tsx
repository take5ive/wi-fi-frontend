import { PairSelectionProps } from "./PairSelection";

export const ExpectedReceipt = ({
  selectedPair,
  taskManager,
  inputTokensLength,
  onClickInvest,
}: PairSelectionProps) => {

  const usingProtocols = taskManager
    ? taskManager.tasks
        .map((t) => t.getData()?.protocol?.name ?? null)
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i)
    : [];

  return (
    <div className="mt-4 flex h-[168px]">
      {inputTokensLength === 0 ? (
        <div className="flex flex-1 border-2 rounded-xl border-dashed items-center justify-center mb-8">
          <p className="text-lg text-neutral-400">Select input tokens first.</p>
        </div>
      ) : !selectedPair ? (
        <div className="flex flex-1 border-2 rounded-xl border-dashed items-center justify-center mb-8">
          <p className="text-lg text-neutral-400">Select Invest Pair</p>
        </div>
      ) : (
        //   <div className="flex flex-col flex-1 border rounded-xl p-4">
        <div className="flex flex-1 gap-8 items-center border-t">
          <div className="flex items-center">
            <button
              onClick={onClickInvest}
              className="btn-primary-o flex items-center justify-center bg-white shadow-lg py-4 px-12 border rounded-xl"
            >
              {/* <TokenIcon token={selectedToken} size="lg" /> */}
              <p className="ml-1.5 text-2xl font-bold -mt-0.5">
                Invest to {selectedPair.protocol}
              </p>
            </button>
          </div>

          {/* Expected Receipt */}
          {taskManager ? (
            <div className="flex flex-1 flex-col">
              <p className="font-semibold">Expected Result</p>
              <div className="flex justify-between mt-1">
                <p className="font-medium text-neutral-500">You will receive</p>
                <p className="font-medium text-neutral-700">
                  {/* {expectedAmount} {selectedToken.symbol} */}
                </p>
              </div>
              <div className="flex justify-between ">
                <p className="font-medium text-neutral-500">Transactions</p>
                <p className="font-medium text-neutral-700">
                  {taskManager.tasks.length}
                </p>
              </div>
              <hr className="my-2" />
              <p className="font-semibold">
                Used Protocols ({usingProtocols.length})
              </p>
              <div className="mt-0.5 gap-y-0.5">
                <p className="text-neutral-500">{usingProtocols.join(", ")}</p>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};
