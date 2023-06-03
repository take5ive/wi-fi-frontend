import { Token } from "modules/Token";
import { TaskBase } from "../tasks/TaskBase";
import {
  ConnextBridgeData,
  ProtocolData,
} from "interfaces/config-data.interface";
import { ApproveTask } from "../tasks/ApproveTask";
import { ConnextBridgeTask } from "../tasks/move/ConnextBridgeTask";

export const bridgeTasks = (
  protocol: ProtocolData<any>,
  to: string
): TaskBase<any>[] => {
  // TEMP
  if (protocol.type === "ConnextBridge") {
    // ASSERT from token is not native token
    const protocolData = protocol.data as ConnextBridgeData;
    const fromToken = Token.get(
      protocolData.fromToken.chainId,
      protocolData.fromToken.address
    )!;
    return [
      new ApproveTask(fromToken, protocolData.coreAddress, protocol.name),
      new ConnextBridgeTask(protocol, to),
    ];
  } else {
    throw new Error("Not supported bridge");
  }
};
