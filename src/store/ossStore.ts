import axios from 'axios'
import { date } from 'quasar'
import { baseUrl } from './apiStore'
import OSS from 'ali-oss'
import { ChatMessageTypes } from '@/types/chatMessageTypes'
import { v4 as uuidv4 } from 'uuid'

interface Credentials {
    AccessKeyId: string
    AccessKeySecret: string
    Expiration: string
    SecurityToken: string
}

let credentials: Credentials | undefined

const getCredentials = (): Promise<Credentials> => {
    return new Promise<Credentials>((resolve, reject) => {
        if (credentials && !isExpired(new Date(credentials.Expiration))) {
            resolve(credentials)
        } else {
            axios({
                method: 'get',
                url: `http://${baseUrl}/oss/get-token`,
            })
                .then((res) => {
                    credentials = res.data.data.Credentials as Credentials
                    resolve(credentials)
                })
                .catch(() => {
                    reject()
                })
        }
    })
}

const isExpired = (expiration: Date) => {
    const dateDiff = date.getDateDiff(new Date(), expiration, 'miliseconds')
    return dateDiff <= 0
}

const getOssClientInstance = (): Promise<OSS> => {
    return new Promise((resolve, reject) => {
        getCredentials()
            .then((c) => {
                const oss = new OSS({
                    accessKeyId: c.AccessKeyId,
                    accessKeySecret: c.AccessKeySecret,
                    stsToken: c.SecurityToken,
                    region: 'oss-cn-shanghai', // 到时候需要替换成正式的
                    bucket: 'dld-test', // 到时候需要替换成正式的
                })
                resolve(oss)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * 将 Blob 对象上传至阿里云 OSS
 * @param file 文件，按媒体类型和日期分文件夹，文件名为随机的 uuid
 * @param type 消息类型
 * @returns 上传成功的话能获得 url
 */
export const uploadFile = (file: Blob, type: ChatMessageTypes): Promise<string> => {
    return new Promise((resolve, reject) => {
        getOssClientInstance()
            .then((oss) => {
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
                        throw '上传华为云OBS：暂未分类的文件类型'
                }

                const day = date.formatDate(new Date(), 'YYYYMMDD')

                /** example: `otc-chat/audio/20210415/qqq-www-eee-rrr` */
                const objectName = `otc-chat/${typeName}/${day}/${uuidv4()}.${extName}`

                oss.put(objectName, file)
                    .then((result) => {
                        resolve(result.url)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
            .catch((err) => {
                reject(err)
            })
    })
}
