const protocol = '(((ws(s)?)|(http(s)?))\\:\\/\\/)'
const domain = '[a-zA-Z0-9_-]+'
const other = '([a-zA-Z/0-9$-/:-?{#-~!"^_`\\[\\]]+)?'
const ext = '(\\.' + other + ')'
const port = '(\\:[0-9]+)?'
const ip = '([a-zA-Z0-9]{4}:)+[a-zA-Z0-9]'

/**
 * 检查一串字符串是否为有效的 url
 * Checks if a string is a valid url
 *
 * @param {string} val - the string to check
 * @param {object} [options] - defaults to `{}`
 * - **options.requireProtocol** {boolean} - set to true if you only want URLs with a protocol to be considered valid. Defaults to `false`
 * @returns {boolean} valid - `true` if *val* is a valid url, `false` otherwise
 *
 */
export default function(val: string | undefined, options?: { requireProtocol?: boolean }) {
    if (!val) return false

    if (!options) {
        options = {}
    }

    const re = new RegExp(
        '^' +
            protocol +
            (!options.requireProtocol ? '?' : '') +
            '(' +
            domain +
            ext +
            '|localhost|' +
            ip +
            ')' +
            port +
            other +
            '$'
    )
    return typeof val === 'string' && re.test(val)
}
