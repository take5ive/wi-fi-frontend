import { getDexTopAprs } from "api/getDexTopAprs";
import { formatEther, parseEther } from "ethers/lib/utils";
import { CHAINID } from "interfaces/config-data.interface";
import { InvestPair } from "interfaces/invest-pair.interface";
import { Chain } from "modules/Chain";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useWallet } from "states/wallet.state";
import { getBalances } from "streams/token/getBalances";

interface Invested {
  pair: InvestPair;
  balance: string;
}

export const useUserInvests = () => {
  const { account } = useWallet();
  const getInvests = async () => {
    if (!account) return [];

    const pairs = await getDexTopAprs();
    const pairAddressesByChainId = pairs.reduce((acc, pair) => {
      acc[pair.chainId] = (acc[pair.chainId] || []).concat(pair.address);
      return acc;
    }, {} as Record<number, string[]>);

    const lpBalances = Object.fromEntries(
      await Promise.all(
        Object.entries(pairAddressesByChainId).map(
          async ([chainId, pairAddresses]) => {
            const chain = Chain.get(+chainId);
            const balances = await getBalances(
              account,
              pairAddresses,
              chain.getProvider()
            );
            const lp2Balance = balances.reduce((acc, balance, i) => {
              if (balance.eq(0)) return acc;
              acc[pairAddresses[i]] = formatEther(balance);
              return acc;
            }, {} as Record<string, string>);
            return [chainId, lp2Balance] as [string, Record<string, string>];
          }
        )
      )
    );

    return pairs.reduce((acc, pair) => {
      const lpBalance = lpBalances[pair.chainId]?.[pair.address];
      if (!lpBalance) return acc;
      acc.push({
        pair,
        balance: lpBalance,
      });
      return acc;
    }, [] as Invested[]);
  };

  const [investedList, setInvestedList] = useState<Invested[]>([]);
  useEffect(() => {
    getInvests().then(setInvestedList);
  }, [account]);

  const [preferredChain, setPreferredChain] = useState<CHAINID | null>(null);
  const onChangePreferredChain: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const chainId = parseInt(event.target.value);
    setPreferredChain(chainId === -1 ? null : chainId);
  };
  const [selectedInvestId, selectInvest] = useState<string | null>(null);
  const selectedPair =
    investedList.find((p) => p.pair.id === selectedInvestId) ?? null;

  return {
    investedList,
    selectedPair,
    preferredChain,
    onChangePreferredChain,
    selectInvest,
  };
};
