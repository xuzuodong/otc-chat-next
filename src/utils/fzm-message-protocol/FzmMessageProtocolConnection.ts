import decodeMessage from './decodeMessage'
import encodeMessage from './encodeMessage'
import { FzmMessageTypes } from './FzmMessageTypes'

interface IPendingMessage {
    seq: number
    uuid?: string
    type: FzmMessageTypes
    resolve?: () => void
    reject?: (reason?: string) => void
    timeout?: NodeJS.Timeout
}

class PendingMessage implements IPendingMessage {
    seq: number
    uuid?: string
    type: FzmMessageTypes
    resolve?: () => void
    reject?: (reason?: string) => void
    timeout?: NodeJS.Timeout

    constructor(seq: number, type: FzmMessageTypes, uuid: string) {
        this.seq = seq
        this.type = type
        this.uuid = uuid
    }
}

export default class FzmMessageProtocolConnection {
    private webSocket: WebSocket
    onReceiveMessage?: (messageBody: Uint8Array) => void
    onLoseConnection?: () => void

    seq: number

    // 心跳
    private heartBeatInterval: number
    private timer: NodeJS.Timeout

    // 调试模式
    private debug: boolean

    // 消息发送队列
    queue: PendingMessage[]

    constructor(ws: WebSocket) {
        console.log('WebSocket: 已连接')

        this.queue = [] as PendingMessage[]
        this.seq = 0
        this.debug = process.env.NODE_ENV !== 'production'
        this.webSocket = ws

        // 定时发送心跳
        this.heartBeatInterval = 15 // 单位秒；后端目前设置 4 分钟超时
        this.timer = setInterval(() => {
            // 下次将要发送心跳前，队列中尚有未发送成功的心跳，则表明断线
            if (this.queue.some((item) => item.type === FzmMessageTypes.HeartBeat)) {
                console.log('WebSocket: 失去与服务器的连接')
                this.onLoseConnection && this.onLoseConnection()
                this.disconnect()
            } else {
                this.sendHeartBeat()
            }
        }, this.heartBeatInterval * 1000)

        // 监听 webSocket 收到消息
        this.webSocket.onmessage = (event) => {
            decodeMessage(event.data).then((response) => {
                const responseType = response.header.operation
                const responseSeq = response.header.seq
                const responseAck = response.header.ack

                // 答复类型：心跳答复
                if (responseType === FzmMessageTypes.HeartBeatResponse) {
                    // 从队列中剔除
                    this.queue.splice(
                        this.queue.findIndex((i) => i.seq == responseSeq),
                        1
                    )
                }

                // 接收到对方用户发来的消息，回复“收到”
                else if (responseType === FzmMessageTypes.ReceiveMessage) {
                    // 发送确认接收到消息的响应
                    this.seq++
                    console.log('WebSocket: 收到新消息, 对方的 seq: ' + (responseAck == 0 ? '离线消息' : responseAck))
                    const msgData = encodeMessage(null, FzmMessageTypes.ReceiveMessageResponse, this.seq, responseSeq)
                    this.webSocket.send(msgData)

                    this.onReceiveMessage && this.onReceiveMessage(response.body)
                }

                // 接收到本用户发送消息成功的确认
                else if (responseType === FzmMessageTypes.SendMessageResponse) {
                    console.log(`WebSocket: 发送消息成功, seq: ${responseSeq}`)

                    const queueItem = this.queue.find((i) => i.seq == responseAck) as IPendingMessage
                    queueItem.resolve && queueItem.resolve()
                    if (queueItem.timeout) clearTimeout(queueItem.timeout)

                    // 从队列中剔除
                    this.queue.splice(
                        this.queue.findIndex((i) => i.seq == responseAck),
                        1
                    )
                }
            })
        }

        this.webSocket.onclose = () => {
            console.log('WebSocket: 连接已关闭')
            this.queue.forEach((m) => m.reject && m.reject())
        }

        this.webSocket.onerror = (event) => {
            console.log(event)
            this.queue.forEach((m) => m.reject && m.reject())
        }
    }

    /** WebSocket 状态 */
    get readyState(): number {
        return this.webSocket.readyState
    }

    /** WebSocket 连接的 url */
    get url(): string {
        return this.webSocket.url
    }

    /** 主动断开连接 */
    disconnect(): void {
        this.seq++
        if (this.debug) console.log(`WebSocket: 主动断开连接, seq: ${this.seq}`)
        this.webSocket.send(encodeMessage(null, FzmMessageTypes.Disconnect, this.seq))
        this.webSocket.close()
        clearInterval(this.timer)
    }

    /**
     * 发送消息，需将消息内容转换为 protobuf 格式的二进制
     * @param msg 发送的消息，以及制定该条消息的唯一 id
     * @param msg.body 消息对象
     * @param msg.uuid 唯一id
     * @returns promise
     */
    sendMessage(msg: { body: Uint8Array; uuid: string }): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.debug) console.log(`发送消息, seq: ${this.seq}`)

            const failedMessage = this.queue.find((m) => m.uuid === msg.uuid) // 是否为之前发送失败的消息

            let pendingMessage: IPendingMessage
            if (failedMessage) {
                pendingMessage = failedMessage
            } else {
                this.seq++
                pendingMessage = new PendingMessage(this.seq, FzmMessageTypes.SendMessage, msg.uuid)
                this.queue.push(pendingMessage)
            }

            pendingMessage.resolve = resolve
            pendingMessage.reject = reject
            this.webSocket.send(encodeMessage(msg.body, FzmMessageTypes.SendMessage, pendingMessage.seq))
        })
    }

    private sendHeartBeat(): void {
        this.seq++
        if (this.debug) console.log(`WebSocket: 发送心跳, seq: ${this.seq}`)
        this.queue.push({ seq: this.seq, type: FzmMessageTypes.HeartBeat })
        this.webSocket.send(encodeMessage(null, FzmMessageTypes.HeartBeat, this.seq))
    }
}
