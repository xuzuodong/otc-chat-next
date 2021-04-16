import { dtalk } from '@/utils/fzm-message-protocol-chat/protobuf'

/**
 * protobuf 接收的消息
 */
export type MessageContent = (
    | dtalk.proto.ITextMsg
    | dtalk.proto.IAudioMsg
    | dtalk.proto.IImageMsg
    | dtalk.proto.IVideoMsg
) & {
    rawMessage?: Blob
}
