const {APIError} = require('../rest')

const formParse = require('../upload')

const {formDataParser} = require('../common/util')

const {saveLaborTeam, destoryLaborTeam, getLaborTeam, queryLaborTeam} = require('../service/LaborTeamService')

var fn_post_save = async (ctx, next) => {
    let laborTeam = await saveLaborTeam(ctx.request.body)
    if (laborTeam) { // 若有user,则表示保存成功,返回id
        ctx.rest({id: laborTeam.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the laborTeam is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    let res = await destoryLaborTeam(ctx.request.body)
    ctx.rest(res)
}

var fn_post_get = async (ctx, next) => {
    let laborTeam = await getLaborTeam(ctx.request.body)
    if (laborTeam) {
        ctx.rest(laborTeam)
    } else {
        throw new APIError('get:no_found', 'the laborTeam is not found')
    }
}

var fn_post_query = async (ctx, next) => {
    let res = await queryLaborTeam(ctx.request.body)
    ctx.rest(res)
}

module.exports = {
    'POST /laborteam/save': fn_post_save,
    'POST /laborteam/destory': fn_post_destory,
    'POST /laborteam/get': fn_post_get,
    'POST /laborteam/query': fn_post_query
}
