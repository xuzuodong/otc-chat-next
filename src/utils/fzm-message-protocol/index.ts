import encodeMessage from './encodeMessage'
import FzmMessageProtocolConnection from './FzmMessageProtocolConnection'
import { FzmMessageTypes } from './FzmMessageTypes'
import { AuthMsg } from './types'

export default class FzmMessageProtocol {
    url: string
    ws?: WebSocket

    constructor(url: string) {
        this.url = url
    }

    authorize(authMsg: AuthMsg): Promise<FzmMessageProtocolConnection> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url)
            this.ws.onopen = () => {
                // 发送鉴权消息
                this.ws?.send(encodeMessage(authMsg, FzmMessageTypes.Auth))
            }

            this.ws.onmessage = () => {
                resolve(new FzmMessageProtocolConnection(this.ws as WebSocket))
            }

            this.ws.onclose = () => {
                reject()
            }
        })
    }
}
