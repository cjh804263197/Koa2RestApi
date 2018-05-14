const {APIError} = require('../rest')

const formParse = require('../upload')

const {formDataParser} = require('../common/util')

const {saveLabor, destoryLabor, getLabor, queryLabor} = require('../service/LaborService')

var fn_post_save = async (ctx, next) => {
    let labor = await saveLabor(ctx.request.body)
    if (labor) { // 若有labor,则表示保存成功,返回id
        ctx.rest({id: labor.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the labor is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    let res = await destoryLabor(ctx.request.body)
    ctx.rest(res)
}

var fn_post_get = async (ctx, next) => {
    let labor = await getLabor(ctx.request.body)
    if (labor) {
        ctx.rest(labor)
    } else {
        throw new APIError('get:no_found', 'the labor is not found')
    }
}

var fn_post_query = async (ctx, next) => {
    let res = await queryLabor(ctx.request.body)
    ctx.rest(res)
}

module.exports = {
    'POST /labor/save': fn_post_save,
    'POST /labor/destory': fn_post_destory,
    'POST /labor/get': fn_post_get,
    'POST /labor/query': fn_post_query
}
