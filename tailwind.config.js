const colors = require('./colors.config')

const chatMsgAvatarSize = '35px'
const inputBarHeight = '70px'

module.exports = {
    purge: ['./src/**/*.vue'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            borderRadius: {
                lg: '10px',
                'chat-msg-bubble-opposite': '3pt  20pt  20pt  20pt',
                'chat-msg-bubble-myself': '20pt  3pt  20pt  20pt',
            },
            width: {
                'chat-msg-avatar': chatMsgAvatarSize,
            },
            minWidth: {
                'chat-msg-avatar': chatMsgAvatarSize,
                'chat-msg-placeholder': '55px',
                'chat-msg-card-placeholder': '20px',
            },
            height: {
                'chat-msg-avatar': chatMsgAvatarSize,
                'chat-header': '50px',
            },
            minHeight: {
                'input-bar': inputBarHeight,
                'input-menu': '100px',
            },
            spacing: {
                4: '15px',
                5.5: '22px',
            },
            boxShadow: {
                blue: '0px 0px 0px 1px #1888FA inset',
            },
            colors,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
