const {APIError} = require('../rest')

const {saveCorpUser, destoryCorpUser, getCorpUser, queryCorpUser} = require('../service/CorpUserService')

var fn_post_save = async (ctx, next) => {
    let params = ctx.request.body
    console.log(`params=${JSON.stringify(params)}`)
    let corpUser = await saveCorpUser(params)
    if (corpUser) { // 若有user,则表示保存成功,返回id
        ctx.rest({id: corpUser.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the corpUser is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    let res = await destoryCorpUser(ctx.request.body)
    ctx.rest(res)
}

var fn_post_get = async (ctx, next) => {
    let corpUser = await getCorpUser(ctx.request.body)
    if (corpUser) {
        ctx.rest(corpUser)
    } else {
        throw new APIError('get:no_found', 'the corp is not found')
    }
}

var fn_post_query = async (ctx, next) => {
    let res = await queryCorpUser(ctx.request.body)
    ctx.rest(res)
}

module.exports = {
    'POST /corp/user/save': fn_post_save,
    'POST /corp/user/destory': fn_post_destory,
    'POST /corp/user/get': fn_post_get,
    'POST /corp/user/query': fn_post_query
}
