import { Chain } from "modules/Chain";
import { useConnectWallet } from "states/wallet.state";
import { ChainIcon } from "./ChainIcon";
import { cn, ellipsisAddress } from "utils";

interface WalletConnectButtonProps {
  className?: string;
}

export const WalletConnectButton = ({
  className,
}: WalletConnectButtonProps) => {
  const { connect, account, chainId, disconnect } = useConnectWallet();
  const chain = Chain.get(chainId);

  return account ? (
    <button
      onClick={disconnect}
      className={cn("btn-left-icon btn-primary-o", className)}
    >
      <ChainIcon chain={chain} size="sm" />
      <p className="code ml-1.5 mb-1">{ellipsisAddress(account)}</p>
    </button>
  ) : (
    <button onClick={connect} className={cn("btn btn-primary", className)}>
      Connect Wallet
    </button>
  );
};
