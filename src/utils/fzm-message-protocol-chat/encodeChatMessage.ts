import { ChatMessageTypes } from '@/types/chatMessageTypes'
import { MessageContent } from '@/types/chat-message'
import { dtalk } from './protobuf'

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
    msg: MessageContent
    /** 消息的全数据库唯一 id */
    uuid: string
}

export default (msg: ChatMessageEncoderArgs): Uint8Array => {
    let content

    switch (msg.msgType) {
        case ChatMessageTypes.Text:
            content = dtalk.proto.TextMsg.encode({
                content: (msg.msg as dtalk.proto.ITextMsg).content,
            }).finish()
            break
        case ChatMessageTypes.Audio:
            content = dtalk.proto.AudioMsg.encode({
                mediaUrl: (msg.msg as dtalk.proto.AudioMsg).mediaUrl,
                time: (msg.msg as dtalk.proto.AudioMsg).time,
            }).finish()
            break
        case ChatMessageTypes.Card:
            content = dtalk.proto.CardMsg.encode({
                bank: (msg.msg as dtalk.proto.CardMsg).bank,
                name: (msg.msg as dtalk.proto.CardMsg).name,
                account: (msg.msg as dtalk.proto.CardMsg).account,
            }).finish()
            break
        default:
            throw '未知的消息类型：' + msg.msgType
    }

    const body: dtalk.proto.ICommonMsg = {
        channelType: 0,
        logId: 0,
        msgId: msg.uuid,
        from: msg.from,
        target: msg.target,
        msgType: msg.msgType,
        msg: content,
        datetime: Date.now(),
    }
    const bodyData = dtalk.proto.CommonMsg.encode(body).finish()

    const container = {
        eventType: 0,
        body: bodyData,
    }
    return dtalk.proto.Proto.encode(container).finish()
}
