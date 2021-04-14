/** 获取 uri 中的 query 参数 */

const [, uri] = window.location.href.split('?')
const pairs = uri && uri.split('&&')
const query: { [queryParams: string]: string } = {}
pairs &&
    pairs.forEach((p) => {
        const [key, value] = p.split('=')
        query[key] = value
    })

/** 我的 id */
export const from = query.token || '1'
/** 对方的 id */
export const target = query.token ? '1' : '2'
