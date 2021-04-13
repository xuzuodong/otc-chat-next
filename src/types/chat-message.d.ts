/**
 * 建立连接后，委托 connection.sendMessage() 发送的消息格式
 */
import { ChatMessageTypes } from '@/utils/fzm-message-protocol-chat/chatMessageTypes'

export interface ChatMessage {
    content: string
    from: string
    uuid: string
    state: 'pending' | 'success' | 'failure' | null // 对方发来的消息无状态，用 null 表示
    type: ChatMessageTypes
}
