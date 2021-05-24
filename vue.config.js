module.exports = {
    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false,
        },
    },
    transpileDependencies: ['quasar'],
    devServer: {
        proxy: {
            // 找币后台
            '/(receive)|(backend)': { target: 'http://172.16.100.214:8080' },
            // 聊天后台
            '/sub': { target: 'ws://172.16.101.126:8888' },
            '/(oss)|(record)': { target: 'http://172.16.101.126:8888' },
        },
    },
}
