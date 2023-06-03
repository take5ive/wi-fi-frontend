import MAINNET_CHAINID from "./chainIds.mainnet";
import { ChainData } from "interfaces/config-data.interface";

const MAINNET_CHAINS: { [chainId: number]: ChainData } = {
  [MAINNET_CHAINID.Ethereum]: {
    id: MAINNET_CHAINID.Ethereum,
    name: "Ethereum",
    symbol: "ETH",
    rpcUrl: "https://eth.llamarpc.com",
    imgUrl: "/icons/chain/ethereum.png",
    funnelAddress: "0x0000000000000000000000000000000000000001",
  },
  [MAINNET_CHAINID.Polygon]: {
    id: MAINNET_CHAINID.Polygon,
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon.llamarpc.com",
    imgUrl: "/icons/chain/polygon.png",
    funnelAddress: "0x0000000000000000000000000000000000000001",
  },
  // [MAINNET_CHAINID.Binance]: {
  //   id: MAINNET_CHAINID.Binance,
  //   name: "Binance",
  //   symbol: "BNB",
  //   rpcUrl: "https://1rpc.io/bnb",
  //   imgUrl: "/icons/chain/binance.png",
  //   funnelAddress: "0x0000000000000000000000000000000000000001",
  // },
};

export default MAINNET_CHAINS;
