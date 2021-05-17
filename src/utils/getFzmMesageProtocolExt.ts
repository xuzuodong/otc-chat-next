/**
 * Chat.vue 中进行 WebSocket 鉴权时需要携带 ext 字段
 * 在本文件计算
 */

import { from, OrderInfo } from '@/store/appCallerStore'
import { Platform } from 'quasar'
import { dtalk } from './fzm-message-protocol-chat/protobuf'

function getDevice() {
    if (Platform.is.ios) {
        return dtalk.proto.Device.IOS
    } else if (Platform.is.android) {
        return dtalk.proto.Device.Android
    } else return null
}

/**
 * 鉴权时需要携带的额外信息
 */
interface Ext {
    device: dtalk.proto.Device | null
    username: string
}

export default function (orderInfo: OrderInfo): Uint8Array {
    const ext: Ext = {
        device: getDevice(),
        username: from == orderInfo.userId ? orderInfo.userNick : orderInfo.merchantNick,
    }
    const extData = dtalk.proto.Login.encode(ext).finish()

    return extData
}
