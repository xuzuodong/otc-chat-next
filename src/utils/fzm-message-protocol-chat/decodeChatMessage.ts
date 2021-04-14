import { dtalk } from './protobuf'
import { MessageContent } from '@/types/chat-message'

interface DecodedMessage {
    content: MessageContent
    from: string
    uuid: string
    type: dtalk.proto.MsgType
}

export default (data: Uint8Array): DecodedMessage => {
    const commonMsg: dtalk.proto.ICommonMsg = dtalk.proto.CommonMsg.decode(data)

    let content: MessageContent
    const TextMsg = dtalk.proto.TextMsg
    const AudioMsg = dtalk.proto.AudioMsg
    switch (commonMsg.msgType) {
        case 1:
            content = TextMsg.toObject(TextMsg.decode(commonMsg.msg || new Uint8Array()))
            break
        case 2:
            content = AudioMsg.toObject(AudioMsg.decode(commonMsg.msg || new Uint8Array()))
            break
        default:
            throw '解码消息时发现未知的消息类型：' + commonMsg.msgType
    }

    return {
        content,
        from: commonMsg.from || '0',
        uuid: JSON.stringify(commonMsg.logId),
        type: commonMsg.msgType || 0,
    }
}
