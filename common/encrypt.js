// 引入nodejs自带的加密模块
const crypto = require('crypto')
/**
 * md5加密
 * @param {*} str 需要加密的字符串
 */
let md5 = str => {
    const hash = crypto.createHash('md5')
    hash.update(str)
    var md5Str = hash.digest('hex')
    return md5Str
}

module.exports = {
    md5
}