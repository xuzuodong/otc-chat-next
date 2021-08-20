/**
 * 利用此实例来上传文件到「阿里云 OSS」，并获取文件的链接
 */

import { date } from 'quasar'
import { OSS, Checkpoint } from '@/utils/oss'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import { v4 as uuidv4 } from 'uuid'

const oss = new OSS({
    appId: 'zb-otc',
    requestUrl: '/oss',
    authorization: () => ({ 'FZM-SIGNATURE': 'MOCK' }),
})

type OnprogressFunction = (p: number, checkpoint: Checkpoint) => void

/**
 * 将 Blob 对象上传至阿里云 OSS
 * @param file 文件，按媒体类型和日期分文件夹，文件名为随机的 uuid
 * @param type 消息类型
 * @param onprogress 回调函数，处理每次上传进度更新
 * @returns 上传成功的话能获得 url
 */
export const uploadFile = (file: Blob, type: ChatMessageTypes, onprogress?: OnprogressFunction): Promise<string> => {
    return new Promise((resolve, reject) => {
        let typeName: string
        let extName: string
        switch (type) {
            case ChatMessageTypes.Audio:
                typeName = `audio`
                extName = 'wav'
                break
            case ChatMessageTypes.Image:
                typeName = `image`
                extName = 'jpg'
                break
            case ChatMessageTypes.Video:
                typeName = `video`
                extName = 'mp4'
                break
            default:
                throw '上传阿里云 OSS 时出错：暂未分类的文件类型'
        }

        const day = date.formatDate(new Date(), 'YYYYMMDD')

        /** example: `otc-chat/audio/20210415/qqq-www-eee-rrr.wav` */
        const objectName = `otc-chat/${typeName}/${day}/${uuidv4()}.${extName}`

        oss.uploadFile(file, objectName, (p, checkpoint) => {
            onprogress && onprogress(p, checkpoint)
        })
            .then((res) => {
                resolve(res)
            })
            .catch((res) => {
                reject(res)
            })
    })
}

export const abortUploadFile = (checkpoint: Checkpoint): Promise<void> => {
    return new Promise((resolve) => {
        oss.abortUploading(checkpoint.fileName).then(() => {
            resolve()
        })
    })
}
