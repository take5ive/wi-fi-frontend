import { Chip } from "components/Chip";
import { TokenIcon } from "components/TokenIcon";
import { Token } from "modules/Token";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { BlockContainer } from "./BlockContainer";
import { formatOrfloorTiny } from "utils";

interface DecomposeBlockData {
  baseTokenId: string;
  farmToken0Id: string;
  farmToken1Id: string;
  baseAmount: string;
  swapAmount0: string;
  swapAmount1: string;
  farmAmount0: string;
  farmAmount1: string;
  liquidity: string;
  remainedBaseAmount: string;
}
export const DecomposeBlock = ({
  baseTokenId,
  farmToken0Id,
  farmToken1Id,
  baseAmount,
  farmAmount0,
  farmAmount1,
  // swapAmount0,
  // swapAmount1,
  // liquidity,
  // remainedBaseAmount,
}: DecomposeBlockData) => {
  const baseToken = Token.getById(baseTokenId)!;
  const farmToken0 = Token.getById(farmToken0Id)!;
  const farmToken1 = Token.getById(farmToken1Id)!;
  return (
    <BlockContainer>
      <Chip color="green" className="mx-4 w-28" content="Decompose" />
      <TokenIcon token={baseToken} size="lg" />
      <p className="ml-2 text-lg font-bold">{baseAmount}</p>
      <p className="ml-2 text-lg font-bold">{baseToken.symbol}</p>

      <FaArrowRight className="mx-4" />
      <TokenIcon token={farmToken0} size="lg" />
      <p className="ml-2 text-lg font-bold">{formatOrfloorTiny(farmAmount0)}</p>
      <p className="ml-2 text-lg font-bold">{farmToken0.symbol}</p>
      <FaPlus className="mx-4" />
      <TokenIcon token={farmToken1} size="lg" />
      <p className="ml-2 text-lg font-bold">{formatOrfloorTiny(farmAmount1)}</p>
      <p className="ml-2 text-lg font-bold">{farmToken1.symbol}</p>

      <div className="border-l pl-4 ml-4 flex">
        <Chip color="gray" size="sm" content="via" />
        <p className="ml-2 text-primary-500 font-bold">
          {baseToken.getChain().name} Funnel
        </p>
      </div>
    </BlockContainer>
  );
};
