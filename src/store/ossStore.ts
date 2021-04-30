/**
 * 利用此实例来上传文件到「阿里云 OSS」，并获取文件的链接
 */

import axios from 'axios'
import { date } from 'quasar'
import { baseUrl } from './baseUrlStore'
import OSS, { Checkpoint } from 'ali-oss'
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
        if (credentials && !expired(new Date(credentials.Expiration))) {
            console.log(`OSS 凭证已存在，直接使用`)
            resolve(credentials)
        } else {
            // if (!credentials) console.log(`OSS 凭证不存在，请求 OSS 凭证...`)
            // else console.log(`OSS 凭证过期，请求新的 OSS 凭证...`)

            axios({
                method: 'get',
                url: `http://${baseUrl}/oss/get-token?timestamp=${Date.now()}`,
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

const expired = (expiration: Date) => {
    const dateDiff = date.getDateDiff(new Date(), expiration, 'seconds')
    return dateDiff >= 0
}

const bucket = 'dld-test'
const region = 'oss-cn-shanghai'
const ossBaseUrl = `http://${bucket}.${region}.aliyuncs.com/`

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
                        throw '上传阿里云 OSS 时出错：暂未分类的文件类型'
                }

                const day = date.formatDate(new Date(), 'YYYYMMDD')

                /** example: `otc-chat/audio/20210415/qqq-www-eee-rrr.wav` */
                const objectName = `otc-chat/${typeName}/${day}/${uuidv4()}.${extName}`

                oss.multipartUpload(objectName, file, {
                    progress(p, checkpoint) {
                        onprogress && onprogress(p, checkpoint)
                    },
                })
                    .then((res) => {
                        resolve(ossBaseUrl + res.name)
                    })
                    .catch((res) => {
                        reject(res)
                    })
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const abortUploadFile = (checkpoint: Checkpoint): Promise<void> => {
    return new Promise((resolve) => {
        getOssClientInstance().then((oss) => {
            oss.abortMultipartUpload(checkpoint.name, checkpoint.uploadId).then(() => {
                resolve()
            })
        })
    })
}
