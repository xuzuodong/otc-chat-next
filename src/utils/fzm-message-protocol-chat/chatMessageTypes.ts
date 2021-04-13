/** 该枚举需与 protobuf.d.ts 中的 MsgType 保持一致 */
export enum ChatMessageTypes {
    System = 0,
    Text = 1,
    Audio = 2,
    Image = 3,
    Video = 4,
    File = 5,
}
