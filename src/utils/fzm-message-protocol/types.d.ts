export type MessageEncoderPayload = AuthMsg | Uint8Array | null

export interface AuthMsg {
    appId: string
    token: string
}