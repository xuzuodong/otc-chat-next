/**
 * 全局网络连接状态
 */

import { reactive } from 'vue'
import FzmMessageProtocolConnection from '@/utils/fzm-message-protocol/FzmMessageProtocolConnection'

interface IConnectionState {
    /** 连接实例，可以调用它来发送消息、断开连接等；只有成功建立连接时才有值，未连接成功或断联时为 undefined */
    connection: FzmMessageProtocolConnection | undefined
    /** 如果出错，该值会变为 true */
    error: boolean
}

export const connectionState = reactive<IConnectionState>({
    connection: undefined,
    error: false,
})
