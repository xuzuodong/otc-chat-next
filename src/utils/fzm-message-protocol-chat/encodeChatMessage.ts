import { ChatMessageTypes } from './chatMessageTypes'
import { dtalk } from './protobuf'
import { utf8ToArray } from 'enc-utils'

interface ChatMessageEncoderPayload {
    from: string
    target: string
    msgType: ChatMessageTypes
    msg: string
    uuid: string
}

export default (msg: ChatMessageEncoderPayload): Uint8Array => {
    const body = {
        channelType: 0,
        logId: 0,
        msgId: msg.uuid,
        from: msg.from,
        target: msg.target,
        msgType: msg.msgType,
        msg: utf8ToArray(msg.msg),
        datetime: Date.now(),
    }
    const bodyData = dtalk.proto.CommonMsg.encode(body).finish()

    const payload = {
        eventType: 0,
        body: bodyData,
    }
    return dtalk.proto.Proto.encode(payload).finish()
}
