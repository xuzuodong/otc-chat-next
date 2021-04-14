import { dtalk } from '@/utils/fzm-message-protocol-chat/protobuf'
/**
 * protobuf 接收的消息
 * 
 * 包括 TextMsg, AudioMsg, ImageMsg, VideoMsg
 * 详见：
 * @see dtalk.proto.ITextMsg
 * @see dtalk.proto.IAudioMsg
 * @see dtalk.proto.IImageMsg
 * @see dtalk.proto.IVideoMsg
 */

export interface MessageContent {
    [contentProperty: string]: string | number
}
