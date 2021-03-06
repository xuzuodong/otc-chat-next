/* eslint-disable */
import '../styles/quasar.scss'
import lang from 'quasar/lang/zh-CN.js'
import '@quasar/extras/mdi-v4/mdi-v4.css'
import '@quasar/extras/material-icons/material-icons.css'
const colors = require('../../colors.config')
import { Dialog } from 'quasar'

export default {
    config: { brand: colors },
    plugins: { Dialog },
    lang: lang,
}
