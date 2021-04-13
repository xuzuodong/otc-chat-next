import { ChatMessageTypes } from './chatMessageTypes'
import { dtalk } from './protobuf'
import { utf8ToArray } from 'enc-utils'

/**
 * 编码消息需要传的参数
 */
interface ChatMessageEncoderArgs {
    /** 发送者 */
    from: string
    /** 接收者 */
    target: string
    /** 消息类型 */
    msgType: ChatMessageTypes
    /** 消息内容 */
    msg: string
    /** 消息的全数据库唯一 id */
    uuid: string
}

export default (msg: ChatMessageEncoderArgs): Uint8Array => {
    const body: dtalk.proto.ICommonMsg = {
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

    const container = {
        eventType: 0,
        body: bodyData,
    }
    return dtalk.proto.Proto.encode(container).finish()
}
