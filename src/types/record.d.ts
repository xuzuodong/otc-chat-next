import { dtalk } from '@/utils/fzm-message-protocol-chat/protobuf'

export interface ChatRecord {
    content: dtalk.proto.ITextMsg | dtalk.proto.ImageMsg | dtalk.proto.IVideoMsg | dtalk.proto.IAudioMsg
    create_time: number
    log_id: string
    msg_id: string
    msg_type: ChatMessageTypes
    order_id: string
    user_id: string
}

interface ChatRecordBodyData {
    record_count: number
    result: ChatRecord[]
}

export interface ChatRecordBody {
    result: number
    message: string
    data: ChatRecordBodyData
}
