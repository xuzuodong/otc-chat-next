/**
 * 获取调用本 app 的终端 (iOS / 安卓) 传过来的参数，需要：
 *     @param id 用户 id
 *     @param token 用户 token
 *     @param orderId 当前聊天双方基于的订单 id
 */

import { ref, Ref } from '@vue/reactivity'
import axios from 'axios'

const [, uri] = window.location.href.split('?')
const pairs = uri && uri.split('&')
const query: { [queryParams: string]: string } = {}
pairs &&
    pairs.forEach((p) => {
        const [key, value] = p.split('=')
        query[key] = value
    })

interface Pay {
    /** 类型 1银行卡 2支付宝 3微信 */
    type: '1' | '2' | '3'
    /** 用户名 */
    name: string
    /** 二维码 */
    codeImage: string
    /** 卡号 */
    cardId: string
    /** 银行名 */
    bankName: string
}

export interface OrderInfo {
    /** 用户 `OTC` id */
    userId: string
    /** 用户 `找币` id */
    userZbId: string
    /** 承兑商 `OTC` id */
    merchantId: string
    /** 承兑商 `找币` id */
    merchantZbId: string
    /** 用户昵称 */
    userNick: string
    /** 承兑商昵称 */
    merchantNick: string
    /** 交易状态 */
    status: string
    /** 成交额 */
    cost: number
    /** 支付方式 */
    pay: Pay[]
    /** 剩余时间 */
    levelTime: number
    /** 订单类型 1 卖, 2 买 */
    type: 1 | 2
}

export const orderInfo: Ref<OrderInfo | undefined> = ref(undefined)
let shouldUpdateOrderInfo = true

/** 获得订单信息，顺便获取对方 id */
export const getOrderInfo = (): Promise<Ref<OrderInfo>> => {
    return new Promise((resolve, reject) => {
        if (!shouldUpdateOrderInfo) {
            resolve(orderInfo as Ref<OrderInfo>)
        } else {
            let url = `/receive/trade-opponent?order_num=${query.orderid}`
            url += `&timestamp=${Date.now()}`
            axios({
                url,
                method: `get`,
                headers: { Authorization: token },
            })
                .then((res) => {
                    shouldUpdateOrderInfo = false
                    if (res.status == 200 && res.data.code == 200) {
                        const rawOrderInfo = res.data.data
                        const userId = rawOrderInfo.user_id
                        const merchantId = rawOrderInfo.merchant_id

                        const pay: Pay[] = rawOrderInfo.pay.map((p: { [payProps: string]: string }) => {
                            return {
                                type: p.type,
                                name: p.name,
                                cardId: p.card_id,
                                bankName: p.bank_name,
                                codeImage: p.code_image,
                            }
                        })

                        orderInfo.value = {
                            userId,
                            userZbId: rawOrderInfo.user_zb_id,
                            merchantId,
                            merchantZbId: rawOrderInfo.merchant_zb_id,
                            userNick: rawOrderInfo.user_nick,
                            merchantNick: rawOrderInfo.merchant_nick,
                            status: rawOrderInfo.status,
                            cost: rawOrderInfo.cost,
                            pay,
                            levelTime: rawOrderInfo.level_time,
                            type: rawOrderInfo.type,
                        }
                        polling()
                        resolve(orderInfo as Ref<OrderInfo>)
                    } else {
                        reject(res)
                    }
                })
                .catch((res) => {
                    reject(res)
                })
        }
    })
}

export const clearOrderInfo = (): void => {
    shouldUpdateOrderInfo = true
}

// 用于测试轮询到的结果是否会改变视图
export const mutateOrderInfo = (): void => {
    if (!orderInfo.value) return
    orderInfo.value.status = '订单状态已改变'
    orderInfo.value.cost = 18888
}

/** 轮询订单状态 */
function polling() {
    if (orderInfo.value && (orderInfo.value.status === '待付款' || orderInfo.value.status === '已付款')) {
        setTimeout(() => {
            clearOrderInfo()
            getOrderInfo()
        }, 10000)
    }
}

/** 我的 id */
export const from = query.id || 'null-user-id'
/** 我的 token */
export const token = `Bearer ${query.token}` || 'null-token'
/** 本项目内发送的 target 为 orderid_token 格式 */
export const target = `${query.orderid}_${token}` || 'null-orderid'
/** orderid */
export const orderid = query.orderid || 'null-orderid'
