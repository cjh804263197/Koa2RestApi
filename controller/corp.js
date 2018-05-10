const {APIError, APIResObj} = require('../rest')

const formParse = require('../upload')

const {formDataParser} = require('../common/util')

const {saveCorp,destoryCorp} = require('../service/CorpService')

var fn_post_save = async (ctx, next) => {
    let obj = await formParse(ctx)
    let params = formDataParser(obj)
    console.log(`params=${JSON.stringify(params)}`)
    let user = await saveCorp(params)
    if (user) { // 若有user,则表示保存成功,返回id
        ctx.rest({id: user.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the corp is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    console.log(`body=${JSON.stringify(ctx.request.body)}`)
    let res = await destoryCorp(ctx.request.body)
    ctx.rest(res)
}

module.exports = {
    'POST /corp/save': fn_post_save,
    'POST /corp/destory': fn_post_destory
}
