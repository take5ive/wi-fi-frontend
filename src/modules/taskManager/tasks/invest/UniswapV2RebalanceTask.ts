import { Signer } from "ethers";
import { TaskBase } from "../TaskBase";
import { AmountsStatus } from "../AmountStatus";
import { Chain } from "modules/Chain";
import { Token } from "modules/Token";
import { TaskStatusEnum } from "interfaces/tasks/task-status.interface";
import { CHAINID } from "interfaces/config-data.interface";
import { InvestPair } from "interfaces/invest-pair.interface";
import { formatEther } from "ethers/lib/utils";

/**
 * Swap all of `fromToken` to `toToken`
 */
export interface UniswapV2RebalanceTaskData {
  status: TaskStatusEnum;
  chainId: CHAINID;
  baseTokenAddr: string;
  farmTokenAddr: string;
  amountInBase: string | null;
  amountInFarm: string | null;
  rebalancedAmountInBase: string | null;
  rebalancedAmountInFarm: string | null;
  receivedLP: string | null;
  to: string;
  pair: InvestPair;
}

export class UniswapV2RebalanceTask extends TaskBase<UniswapV2RebalanceTaskData> {
  constructor(
    baseTokenAddr: string,
    farmTokenAddr: string,
    dstPair: InvestPair,
    to: string
  ) {
    super(dstPair.chainId, "Rebalance", {
      chainId: dstPair.chainId,
      baseTokenAddr,
      farmTokenAddr,
      amountInBase: null,
      amountInFarm: null,
      rebalancedAmountInBase: null,
      rebalancedAmountInFarm: null,
      receivedLP: null,
      to,
      pair: dstPair,
    });
  }

  private getInfo(amountStatus: AmountsStatus, signer?: Signer) {
    const data = this.getData();
    let funnel = Chain.get(this.chainId).getFunnel();
    if (signer) funnel = funnel.connect(signer);

    const baseToken = Token.getById(`${this.chainId}_${data.baseTokenAddr}`)!;
    const farmToken = Token.getById(`${this.chainId}_${data.farmTokenAddr}`)!;
    const amountInBase = amountStatus.get(baseToken)!;
    const amountInFarm = amountStatus.get(farmToken)!;
    return { funnel, baseToken, farmToken, amountInBase, amountInFarm, data };
  }

  async run(
    doneAmountStatus: AmountsStatus,
    signer: Signer
  ): Promise<AmountsStatus> {
    const { funnel, data, baseToken, farmToken, amountInBase, amountInFarm } =
      this.getInfo(doneAmountStatus, signer);

    /** Predict should be preceded */
    const lpToken = new Token({
      chainId: this.chainId,
      address: data.pair.address,
      decimals: 18,
      symbol: "LP",
    });
    const beforeLp = await lpToken.getContract().balanceOf(data.to);

    const baseReserve = await baseToken
      .getContract()
      .balanceOf(lpToken.address);
    const farmReserve = await farmToken
      .getContract()
      .balanceOf(lpToken.address);
    console.log(baseReserve.toString(), farmReserve.toString());

    const tx = await funnel.rebalanceAndAddLiquidity(
      lpToken.address,
      baseToken.address,
      data.to,
      baseToken.parse(amountInBase),
      farmToken.parse(amountInFarm)
    );

    this.changeStatus(TaskStatusEnum.Sent);
    await tx.wait();
    this.changeStatus(TaskStatusEnum.Confirmed);
    const afterLp = await lpToken.getContract().balanceOf(data.to);

    const receivedLP = lpToken.format(afterLp.sub(beforeLp));
    return doneAmountStatus
      .setZero(baseToken)
      .setZero(farmToken)
      .add(lpToken, receivedLP);
  }

  async predict(predictAmountStatus: AmountsStatus): Promise<AmountsStatus> {
    const { funnel, baseToken, farmToken, amountInBase, amountInFarm, data } =
      this.getInfo(predictAmountStatus);

    const { swapAmount, swappedAmount, liquidity, swap0 } =
      await funnel.calculateOptimalRebalanceAmount(
        data.pair.address,
        baseToken.address,
        baseToken.parse(amountInBase),
        farmToken.parse(amountInFarm)
      );

    const receivedLP = formatEther(liquidity);

    let rebalancedAmountInBase = baseToken.parse(amountInBase);
    let rebalancedAmountInFarm = farmToken.parse(amountInFarm);
    if (swap0) {
      rebalancedAmountInBase = rebalancedAmountInBase.sub(swapAmount);
      rebalancedAmountInFarm = rebalancedAmountInFarm.add(swappedAmount);
    } else {
      rebalancedAmountInBase = rebalancedAmountInBase.add(swappedAmount);
      rebalancedAmountInFarm = rebalancedAmountInFarm.sub(swapAmount);
    }

    this.changeData({
      amountInBase,
      amountInFarm,
      rebalancedAmountInBase: baseToken.format(rebalancedAmountInBase),
      rebalancedAmountInFarm: farmToken.format(rebalancedAmountInFarm),
      receivedLP,
    });

    return predictAmountStatus
      .setZero(baseToken)
      .setZero(farmToken)
      .setRaw(this.chainId, data.pair.address, liquidity);
  }
}
