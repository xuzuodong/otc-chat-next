/**
 * 访问 OTC 接口:生产环境走外网，测试环境走 nginx 反代
 * 访问聊天后台接口: 生产环境和测试环境都走 nginx 反代
 */
export const baseUrl = process.env.NODE_ENV === 'development' ? '' : 'https://otc.zhaobi.site/api'