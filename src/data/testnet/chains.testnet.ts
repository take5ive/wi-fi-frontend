import TESTNET_CHAINID from "./chainIds.testnet";
import { ChainData } from "interfaces/config-data.interface";

const TESTNET_CHAINS: { [chainId: number]: ChainData } = {
  [TESTNET_CHAINID.Ethereum]: {
    id: TESTNET_CHAINID.Ethereum,
    name: "Goerli",
    symbol: "ETH",
    rpcUrl: "https://rpc.ankr.com/eth_goerli",
    imgUrl: "/icons/chain/ethereum.png",
    funnelAddress: "0x875F627F19fA1846AE0eD05548b53b677891b559",
  },
  [TESTNET_CHAINID.Polygon]: {
    id: TESTNET_CHAINID.Polygon,
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
    imgUrl: "/icons/chain/polygon.png",
    funnelAddress: "0x4044C8f6c35567a033396679BDAAEbc9B95ddCe0",
  },
  // [TESTNET_CHAINID.Binance]: {
  //   id: TESTNET_CHAINID.Binance,
  //   name: "Binance",
  //   symbol: "BNB",
  //   rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
  //   imgUrl: "/icons/chain/binance.png",
  //   funnelAddress: "0x41dDC4b63c24d8E2892C7f7bA6DaabF9B36f6290",
  // },
  [TESTNET_CHAINID.Klaytn]: {
    id: TESTNET_CHAINID.Klaytn,
    name: "Klaytn",
    symbol: "KLAY",
    rpcUrl: "https://public-node-api.klaytnapi.com/v1/baobab",
    imgUrl: "/icons/chain/klaytn.png",
    funnelAddress: "0x0000000000000000000000000000000000000001",
  },
  [TESTNET_CHAINID.Gnosis]: {
    id: TESTNET_CHAINID.Gnosis,
    name: "Chiado",
    symbol: "xDAI",
    rpcUrl: "https://rpc.chiadochain.net",
    imgUrl: "https://docs.gnosischain.com/img/tokens/chiado-xdai.png",
    funnelAddress: "0x9f65d8E5c6947a4D6B11B3059e174C48F9b8c516",
  },
  [TESTNET_CHAINID.Aurora]: {
    id: TESTNET_CHAINID.Aurora,
    name: "Aurora",
    symbol: "ETH",
    rpcUrl: "https://testnet.aurora.dev",
    imgUrl: "/icons/chain/aurora.png",
    funnelAddress: "0x9f65d8E5c6947a4D6B11B3059e174C48F9b8c516",
  },
};

export default TESTNET_CHAINS;
