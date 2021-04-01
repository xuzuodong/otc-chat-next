import { Type, Field } from 'protobufjs'
import { numberToArray, concatArrays } from 'enc-utils'

// 构造 body
const appId: string = 'zb_otc'
const token: string = '1'

const AuthMsg = new Type('AuthMsg')
AuthMsg.add(new Field('appId', 1, 'string'))
AuthMsg.add(new Field('token', 2, 'string'))
const payload = { appId, token }

const message = AuthMsg.create(payload)
const bodyData = AuthMsg.encode(message).finish()

// 构造包头

/**
 * 将一个数字转换为一定长度的二进制数据
 * @param num 想转换的数字
 * @param byteLength 转换后的二进制数据长度（单位为字节）。
 * `byteLength` 不能小于用二进制表示的 `num` 本身。
 * 例如输入的 num 为 256，而 256 转为二进制为 `00000001 00000000`，即至少需要 2 个字节来表示，因此 `num` 不能为 1，只能等于或大于 2。
 * @returns 长度为 `byteLength` 的二进制的 `num`
 */
const encodeNumberWithFixedLength = (num: number, byteLength: number): Uint8Array => {
    const uint8arr = numberToArray(num)
    if (uint8arr.length > byteLength) throw '输入的数字过大！'
    if (uint8arr.length == byteLength) return uint8arr

    const arr = Array.from(uint8arr)
    while (arr.length < byteLength) {
        arr.splice(0, 0, 0)
    }

    return Uint8Array.from(arr)
}

// 包头各个字段的字节长度
const headerArgByteLength = {
    packageLength: 4,
    headerLength: 2,
    ver: 2,
    operation: 4,
    seq: 4,
    ack: 4,
}

// 包头总长度
const headerLength = Object.values(headerArgByteLength).reduce((a, b) => {
    return a + b
})

// 包总长度
const packageLength = headerLength + bodyData.length

// 包头
const header = {
    packageLength,
    headerLength,
    ver: 1,
    operation: 1,
    seq: 0,
    ack: 0,
}

// 编码后的包头
const encodedHeader = Object.values(header).reduce((prev, curr, index) => {
    const currByteLength = Object.values(headerArgByteLength)[index]
    return concatArrays(prev, encodeNumberWithFixedLength(curr, currByteLength))
}, new Uint8Array())

// 编码后的包
const data = concatArrays(encodedHeader, bodyData)

// 对 data 进行 base64 编码，用于校验包是否构造正确
// const decoder = new TextDecoder('utf8')
// const b64encoded = btoa(decoder.decode(data))
// console.log(b64encoded)

// 连接 WebSocket
import  decodeMessage  from  './decodeMessage'
const ws = new WebSocket('ws://172.16.101.126:8888/sub/')

ws.onopen = function() {
    ws.send(data)
}

ws.onmessage = function(evt) {
    decodeMessage(evt.data)
}

ws.onclose = function() {
    console.log('连接已关闭...')
}
