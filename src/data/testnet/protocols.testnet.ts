import { ProtocolData } from "interfaces/config-data.interface";
import TESTNET_CHAINID from "./chainIds.testnet";
import { ethers } from "ethers";

const UniswapV2Protocols: ProtocolData<"UniswapV2">[] = [
  {
    usage: "swap",
    type: "UniswapV2",
    name: "MYswapV2",
    chainId: TESTNET_CHAINID.Klaytn,
    data: {
      factoryAddress: "0xd515761A0B3B0f8ABAedbf5Ce98DAAe841dC5381",
      routerAddress: "0xDc929b5040e15085098C76deF2Fd72698695522b",
      wETHAddress: "0x38266E85782aa99A650E758E39f8B2eeDb189183",
    },
  },
  {
    usage: "swap",
    type: "UniswapV2",
    name: "Uniswap V2",
    chainId: TESTNET_CHAINID.Ethereum,
    data: {
      factoryAddress: "0x9D734898bfDC6939655D05d6a2923f7efC075606",
      routerAddress: "0x00f87157Fac4d7d4B21bBFf903db024871b36e04",
      wETHAddress: "0x227A02c6617f02a40a28570E8F272b528aC42cfB",
    },
  },
  {
    usage: "swap",
    type: "UniswapV2",
    name: "Quickswap",
    chainId: TESTNET_CHAINID.Polygon,
    data: {
      factoryAddress: "0xa96c2e7C6f63A434945866491D2E002CC7028B56",
      routerAddress: "0xA436ff165804e4D4652c7859Ea0Ce34cDB1825b4",
      wETHAddress: "0x3a4E2BB60048Efe94cbCB8092651fbFDD2FBF595",
    },
  },
  {
    usage: "swap",
    type: "UniswapV2",
    name: "Honeyswap",
    chainId: TESTNET_CHAINID.Gnosis,
    data: {
      factoryAddress: "0x617659d08e817e4c0F2983c62282Df85090603ad",
      routerAddress: "0x01E402Eff5Fb416fef34FCb47E2bC9f02A19E7bc",
      wETHAddress: "0x42A7ddC4C5814eDD824353BD9CbdCB4D2f1AAdce",
    },
  },
];

const ConnextBridgeProtocols: ProtocolData<"ConnextBridge">[] = [
  {
    usage: "bridge",
    type: "ConnextBridge",
    name: "Connext Bridge",
    chainId: TESTNET_CHAINID.Ethereum,
    data: {
      coreAddress: "0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649",
      dstChainIdentifier: 9991,
      relayerGasFee: ethers.utils.parseEther("50").toString(),
      feeBps: 5,
      fromToken: {
        chainId: TESTNET_CHAINID.Ethereum,
        address: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
      },
      toToken: {
        chainId: TESTNET_CHAINID.Polygon,
        address: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
      },
    },
  },
  {
    usage: "bridge",
    type: "ConnextBridge",
    name: "Connext Bridge",
    chainId: TESTNET_CHAINID.Polygon,
    data: {
      coreAddress: "0x2334937846Ab2A3FCE747b32587e1A1A2f6EEC5a",
      dstChainIdentifier: 1735353714,
      relayerGasFee: ethers.utils.parseEther("0.3").toString(),
      feeBps: 5,
      fromToken: {
        chainId: TESTNET_CHAINID.Polygon,
        address: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
      },
      toToken: {
        chainId: TESTNET_CHAINID.Ethereum,
        address: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
      },
    },
  },
];

const protocols: ProtocolData[] = [
  ...UniswapV2Protocols,
  ...ConnextBridgeProtocols,
];

export default protocols;
