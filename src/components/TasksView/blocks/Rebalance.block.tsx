import { Chip } from "components/Chip";
import { TokenIcon } from "components/TokenIcon";
import { Token } from "modules/Token";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { BlockContainer } from "./BlockContainer";
import { UniswapV2RebalanceTaskData } from "modules/taskManager/tasks/invest/UniswapV2RebalanceTask";
import { DualTokenIcons } from "components/DualTokenIcons";
import { formatOrfloorTiny } from "utils";

export const RebalanceBlock = ({
  chainId,
  baseTokenAddr,
  farmTokenAddr,
  amountInBase,
  amountInFarm,
  rebalancedAmountInBase,
  rebalancedAmountInFarm,
  receivedLP,
  to,
  pair,
}: UniswapV2RebalanceTaskData) => {
  const baseToken = Token.get(chainId, baseTokenAddr)!;
  const farmToken = Token.get(chainId, farmTokenAddr)!;

  return (
    <BlockContainer>
      <Chip color="green" className="mx-4 w-28" content="Rebalance" />
      <DualTokenIcons token0={baseToken} token1={farmToken} size="lg" />
      <p className="ml-2 text-lg font-bold">{+(amountInBase ?? "")}</p>
      <p className="ml-2 text-lg font-bold">{baseToken.symbol}</p>
      <FaPlus className="mx-2" />
      <p className="text-lg font-bold">{+(amountInFarm ?? "")}</p>
      <p className="ml-2 text-lg font-bold">{farmToken.symbol}</p>

      <FaArrowRight className="mx-3" />

      <DualTokenIcons token0={baseToken} token1={farmToken} size="lg" />
      <p className="ml-2 text-lg font-bold">
        {(+(rebalancedAmountInBase ?? "0")).toFixed(2)}
      </p>
      <p className="ml-2 text-lg font-bold">{baseToken.symbol}</p>
      <FaPlus className="mx-2" />
      <p className="text-lg font-bold">
        {(+(rebalancedAmountInFarm ?? "0")).toFixed(2)}
      </p>
      <p className="ml-2 text-lg font-bold">{farmToken.symbol}</p>

      <div className="border-l pl-4 ml-4 flex items-center">
        <Chip color="gray" size="sm" content="via" />
        <p className="ml-2 text-primary-500 font-bold">
          {baseToken.getChain().name} Funnel
        </p>
      </div>
    </BlockContainer>
  );
};
