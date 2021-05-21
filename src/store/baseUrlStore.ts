let url
let tradeUrl

if (process.env.NODE_ENV === 'production') {
    url = '47.242.199.130:8888'
    tradeUrl = '172.16.100.214:8080'
} else if (process.env.NODE_ENV === 'development') {
    url = '172.16.101.126:8888'
    tradeUrl = '172.16.100.214:8080'
} else {
    throw new Error('未知的环境类型')
}

export const baseUrl = url
export const baseTradeUrl = tradeUrl
