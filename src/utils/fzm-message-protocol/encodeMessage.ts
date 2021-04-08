import { MessageEncoderPayload, AuthMsg } from './types'
import { Type, Field } from 'protobufjs'
import { numberToArray, concatArrays } from 'enc-utils'
import FzmMessageProtocolHeader from './FzmMessageProtocolHeader'
import { FzmMessageTypes } from './FzmMessageTypes'

const encodeAuthMsg = (payload: AuthMsg): Uint8Array => {
    const type = new Type('Message')
    let key: keyof AuthMsg

    let i = 1
    for (key in payload) {
        const value = payload[key]
        type.add(new Field(key, i, typeof value))
        i++
    }

    const msg = type.create(Object.assign({}, payload)) // 如果直接 type.create(payload) 会报错，因为 payload 里有个 __proto__ 会被编码进去
    const bodyData = type.encode(msg).finish()

    return bodyData
}

/**
 * 将一个数字转换为一定长度的二进制数据
 * @param num 想转换的数字
 * @param byteLength 转换后的二进制数据长度（单位为字节）。
 * `byteLength` 不能小于 `num` 的字节长度。
 * 例如输入的 num 为 256，而 256 用二进制表示为 `00000001 00000000`，因此 `num` 的字节长度为 2，即至少需要 2 个字节来表示。
 * 因此 `byteLength` 不能为 1，只能等于或大于 2。
 * @returns 长度为 `byteLength` 的二进制的 `num`
 */
const encodeNumberWithFixedLength = (num: number, byteLength: number): Uint8Array => {
    const uint8arr = numberToArray(num)
    if (uint8arr.length > byteLength) throw '输入的数字过大！'
    if (uint8arr.length == byteLength) return uint8arr

    const arr = Array.from(uint8arr)
    while (arr.length < byteLength) {
        arr.splice(0, 0, 0) // 在数组的最前面插入一个 0
    }

    return Uint8Array.from(arr)
}

// 
function isAuthMsg(message: AuthMsg | Uint8Array): message is AuthMsg {
    return (<AuthMsg>message).token !== undefined
}

/** 对消息进行编码 */
export default (payload: MessageEncoderPayload, messageType: FzmMessageTypes, seq = 0, ack?: number): Uint8Array => {
    // 先对 body 进行编码
    let bodyData: Uint8Array

    // 判断 Message Type, 如果是鉴权, 则内部解析; 如果是正常发送消息, 则需要自行解析成 protobuf 格式
    if (payload && isAuthMsg(payload)) {
        bodyData = encodeAuthMsg(payload)
    } else if (payload && !isAuthMsg(payload)) {
        bodyData = payload
    } else {
        bodyData = new Uint8Array()
    }

    // 基于 body 构造对应的 header
    const header = new FzmMessageProtocolHeader(messageType, seq, ack || 0)
    header.updatePackageLength(bodyData)
    
    // 对 header 编码
    const headerData = Object.values(header.header).reduce((prev, curr) => {
        return concatArrays(prev, encodeNumberWithFixedLength(curr.value, curr.length))
    }, new Uint8Array())

    // 拼接 header 和 body
    const data = concatArrays(headerData, bodyData)

    return data
}
