import { getProtoMessages } from '../../init/loadProto.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { config } from '../../config/config.js';

const serializer = (message, type) => {
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(message.length + config.packet.totalLength + config.packet.typeLength);

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeInt8(type, 0);

  return Buffer.concat([packetLength, packetType, message]);
};

export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const location = protoMessages.gameNotification.LocationUpdate;

  const payload = { users };
  const message = location.create(payload);
  const locationPacket = location.encode(message).finish();
  return serializer(locationPacket, PACKET_TYPE.LOCATION);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();
  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();
  return serializer(pingPacket, PACKET_TYPE.PING);
};
