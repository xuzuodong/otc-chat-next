/*eslint-disable*/
const ANDROID = 1
const IOS = 2
// app return callback response
// standard:
// { code: 0, error: 'error msg'}
const SUCCESS_CODE = 0
// const SUCCESS_RES = { code: SUCCESS_CODE, error: 'error msg' }

class jsBridge {
    constructor(bridgeName = 'WebViewJavascriptBridge', bridgeScheme = 'https') {
        this.bridgeName = bridgeName
        this.bridgeScheme = bridgeScheme
        let ua = navigator.userAgent || navigator.vendor || window.opera
        // ua = "Mozilla/5.0 (Linux; Android 6.0.1; Redmi 4A Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36;wallet;1.2.9"
        ua = ua.toLowerCase()
        if (/android/.test(ua)) {
            this.app = ANDROID
        } else if (/(iphone|ipad|ipod|ios)/.test(ua)) {
            this.app = IOS
        }
        // 1. 判断 是否在 钱包app 内
        // this.app.isWallet = true/false
        // 2. 记录 app 版本号
        // ua = Mozilla/5.0 (Linux; Android 6.0.1; Redmi 4A Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36;wallet;1.2.9
        // ua = Mozilla/5.0 (iPhone; CPU iPhone OS 11_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C114;wallet;1.2.8
        // this.app.version = '1.2.0'
        this.registDefaultHandlerForApp()
    }

    app = null
    appType = {
        isWallet: false,
        version: ''
    }

    /*  与ios交互 */
    setupWebViewJavascriptBridge(callback) {
        // WebViewJavascriptBridge 由native在注入
        // https://github.com/marcuswestin/WebViewJavascriptBridge
        if (window[this.bridgeName]) {
            return callback(window[this.bridgeName]);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = `https://__bridge_loaded__`;
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe);
        }, 0)
    }

    /* 与android交互 */
    getAndroidBridge() {
        return new Promise(resolve => {
            if (window[this.bridgeName]) {
                resolve(window[this.bridgeName])
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady', () => {
                        resolve(window[this.bridgeName])
                    },
                    false
                )
            }
        })
    }

    /**
     * 给ios注册方法 jsHandler需要返回一个promise
     * @param {string} event
     * @param {fun} jsHandler
     * @return JSON对象
     */
    registerHandlerForIOS(event, jsHandler) {
        this.setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler(event, (data2js, responseCallback = () => {}) => {
                jsHandler(data2js).then(responseCallback)
            })
        })
    }

    /**
     * 给安卓注册方法 jsHandler需要返回一个promise
     * @param {string} event
     * @param {fun} jsHandler
     * @return JSON对象
     */
    registerHandlerForAndroid(event, jsHandler) {
        this.getAndroidBridge().then(bridge => {
            bridge.registerHandler(event, (data2js, responseCallback = () => {}) => {
                jsHandler(data2js).then(responseCallback)
            })
        })
    }

    /**
     * 调用ios
     * @param {string} event
     * @param {object} params
     * @param {fun} callback
     * @return JSON对象
     */
    callIOSHandler(event, params = {}) {
        return new Promise(resolve => {
            this.setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler(event, params, resolve)
            })
        })
    }

    /**
     * 调用android
     * @param {string} event
     * @param {object} params
     * @param {fun} callback
     * @return JSON对象
     */
    callAndroidHandler(event, params = {}) {
        return new Promise(resolve => {
            this.getAndroidBridge().then(bridge => {
                bridge.callHandler(event, params, (res) => {
                    if (typeof res === "string" && /{|\[/.test(res)) {
                        try {
                            res = JSON.parse(res)
                        } catch (error) {
                            // console.error(error)
                            throw error
                        }
                    }
                    resolve(res)
                })
            })
        })
    }

    /**
     * 注册一堆事件处理函数
     *
     * @memberof jsBridge
     */
    registDefaultHandlerForApp() {
        this.on('reload', () => {
            location.reload()
            return Promise.resolve('done!')
        })
    }

    /**
     * 给ios和android注册事件监听
     *
     * @memberof jsBridge
     */
    on(...args) {
        if (this.app === ANDROID) {
            this.registerHandlerForAndroid(...args)
        } else if (this.app === IOS) {
            this.registerHandlerForIOS(...args)
        }
    }

    /**
     * 调用app方法
     *
     * @param {*} args
     * @returns
     * @memberof jsBridge
     */
    callHandler(...args) {
        if (this.app === ANDROID) {
            return this.callAndroidHandler(...args)
        } else if (this.app === IOS) {
            return this.callIOSHandler(...args)
        }
    }

    /**
     * 关闭当前webview
     *
     * @memberof jsBridge
     */
    closeCurrentWebview() {
        return this.callHandler('closeCurrentWebview')
    }
}

window.jsBridge=jsBridge
// console.log(window)

export default jsBridge;