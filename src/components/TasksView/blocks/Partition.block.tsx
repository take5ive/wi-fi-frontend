import { Chip } from "components/Chip";
import { TokenIcon } from "components/TokenIcon";
import { Token } from "modules/Token";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { BlockContainer } from "./BlockContainer";
import { formatOrfloorTiny } from "utils";
import { UniswapV2PartitionTaskData } from "modules/taskManager/tasks/invest/UniswapV2PartitionTask";

export const PartitionBlock = ({
  // status: TaskStatusEnum;
  chainId,
  baseTokenAddr,
  farmTokenAddr,
  amountIn,
  amountInBase,
  amountInFarm,
  // receivedLP,
  // to,
  // pair,
}: UniswapV2PartitionTaskData) => {
  console.log(baseTokenAddr, farmTokenAddr)
  const baseToken = Token.get(chainId, baseTokenAddr)!;
  const farmToken = Token.get(chainId, farmTokenAddr)!;
  return (
    <BlockContainer>
      <Chip color="green" className="mx-4 w-28" content="Partition" />
      <TokenIcon token={baseToken} size="lg" />
      <p className="ml-2 text-lg font-bold">{amountIn}</p>
      <p className="ml-2 text-lg font-bold">{baseToken.symbol}</p>

      <FaArrowRight className="mx-4" />
      <TokenIcon token={baseToken} size="lg" />
      <p className="ml-2 text-lg font-bold">{formatOrfloorTiny(amountInBase ?? '')}</p>
      <p className="ml-2 text-lg font-bold">{baseToken.symbol}</p>
      <FaPlus className="mx-4" />
      <TokenIcon token={farmToken} size="lg" />
      <p className="ml-2 text-lg font-bold">{formatOrfloorTiny(amountInFarm ?? '')}</p>
      <p className="ml-2 text-lg font-bold">{farmToken.symbol}</p>

      <div className="border-l pl-4 ml-4 flex">
        <Chip color="gray" size="sm" content="via" />
        <p className="ml-2 text-primary-500 font-bold">
          {baseToken.getChain().name} Funnel
        </p>
      </div>
    </BlockContainer>
  );
};
