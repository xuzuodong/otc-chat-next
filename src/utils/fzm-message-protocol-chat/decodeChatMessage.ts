//import { ChatMessage } from '@/types/chat-message'
import { dtalk } from './protobuf'
import { arrayToUtf8 } from 'enc-utils'

export default (data: Uint8Array): { msg: string; from: string, uuid: string } => {
    const commonMsg: dtalk.proto.ICommonMsg = dtalk.proto.CommonMsg.decode(data)

    return {
        msg: arrayToUtf8(commonMsg.msg || new Uint8Array()),
        from: commonMsg.from || '0',
        uuid: commonMsg.logId
    }
}
