const {APIError} = require('../rest')

const { imgParse } = require('../upload')

const {formDataParser} = require('../common/util')

const {saveCorp, destoryCorp, getCorp, queryCorp} = require('../service/CorpService')

var fn_post_save = async (ctx, next) => {
    let obj = await imgParse(ctx)
    let params = formDataParser(obj)
    console.log(`params=${JSON.stringify(params)}`)
    let corp = await saveCorp(params)
    if (corp) { // 若有user,则表示保存成功,返回id
        ctx.rest({id: corp.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the corp is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    let res = await destoryCorp(ctx.request.body)
    ctx.rest(res)
}

var fn_post_get = async (ctx, next) => {
    let corp = await getCorp(ctx.request.body)
    if (corp) {
        ctx.rest(corp)
    } else {
        throw new APIError('get:no_found', 'the corp is not found')
    }
}

var fn_post_query = async (ctx, next) => {
    let res = await queryCorp(ctx.request.body)
    ctx.rest(res)
}

module.exports = {
    'POST /corp/save': fn_post_save,
    'POST /corp/destory': fn_post_destory,
    'POST /corp/get': fn_post_get,
    'POST /corp/query': fn_post_query
}

  