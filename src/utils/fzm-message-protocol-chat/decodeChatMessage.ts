import { dtalk } from './protobuf'
import { MessageContent } from '@/types/chat-message'

interface DecodedMessage {
    content: MessageContent
    from: string
    uuid: string
    type: dtalk.proto.MsgType
    datetime: number
    logid: string
    /** 收到的 target 值是该笔订单 id */
    orderid?: string
}

export default (data: Uint8Array): DecodedMessage => {
    const commonMsg: dtalk.proto.ICommonMsg = dtalk.proto.CommonMsg.decode(data)
    console.log(commonMsg)

    let content: MessageContent
    const TextMsg = dtalk.proto.TextMsg
    const AudioMsg = dtalk.proto.AudioMsg
    const CardMsg = dtalk.proto.CardMsg
    const ImageMsg = dtalk.proto.ImageMsg
    const VideoMsg = dtalk.proto.VideoMsg
    switch (commonMsg.msgType) {
        case 1:
            content = TextMsg.toObject(TextMsg.decode(commonMsg.msg || new Uint8Array()))
            break
        case 2:
            content = AudioMsg.toObject(AudioMsg.decode(commonMsg.msg || new Uint8Array()))
            break
        case 3:
            content = ImageMsg.toObject(ImageMsg.decode(commonMsg.msg || new Uint8Array()))
            break
        case 4:
            content = VideoMsg.toObject(VideoMsg.decode(commonMsg.msg || new Uint8Array()))
            break
        case 6:
            content = CardMsg.toObject(CardMsg.decode(commonMsg.msg || new Uint8Array()))
            break
        default:
            throw '解码消息时发现未知的消息类型：' + commonMsg.msgType
    }

    if (!commonMsg.from || !commonMsg.msgType || !commonMsg.target) {
        throw '解码消息时发现空字段，理论上不可能出现这种情况'
    }

    return {
        content,
        from: commonMsg.from,
        uuid: JSON.stringify(commonMsg.logId),
        type: commonMsg.msgType,
        datetime: commonMsg.datetime,
        logid: commonMsg.logId,
        orderid: commonMsg.target,
    }
}
