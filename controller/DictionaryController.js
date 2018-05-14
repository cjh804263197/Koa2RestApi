const {APIError} = require('../rest')

const formParse = require('../upload')

const {formDataParser} = require('../common/util')

const {saveDictionary, destoryDictionary, getDictionary, queryDictionary} = require('../service/DictionaryService')

var fn_post_save = async (ctx, next) => {
    let dictionary = await saveDictionary(ctx.request.body)
    if (dictionary) { // 若有user,则表示保存成功,返回id
        ctx.rest({id: dictionary.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the dictionary is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    let res = await destoryDictionary(ctx.request.body)
    ctx.rest(res)
}

var fn_post_get = async (ctx, next) => {
    let dictionary = await getDictionary(ctx.request.body)
    if (dictionary) {
        ctx.rest(dictionary)
    } else {
        throw new APIError('get:no_found', 'the dictionary is not found')
    }
}

var fn_post_query = async (ctx, next) => {
    let res = await queryDictionary(ctx.request.body)
    ctx.rest(res)
}

module.exports = {
    'POST /dictionary/save': fn_post_save,
    'POST /dictionary/destory': fn_post_destory,
    'POST /dictionary/get': fn_post_get,
    'POST /dictionary/query': fn_post_query
}
