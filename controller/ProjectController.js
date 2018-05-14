const {APIError} = require('../rest')

const formParse = require('../upload')

const {formDataParser} = require('../common/util')

const {saveProject, destoryProject, getProject, queryProject, saveProjectLaborTeam, queryProjectLaborTeam} = require('../service/ProjectService')

var fn_post_save = async (ctx, next) => {
    let project = await saveProject(ctx.request.body)
    if (project) { // 若有user,则表示保存成功,返回id
        ctx.rest({id: project.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the project is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    let res = await destoryProject(ctx.request.body)
    ctx.rest(res)
}

var fn_post_get = async (ctx, next) => {
    let project = await getProject(ctx.request.body)
    if (project) {
        ctx.rest(project)
    } else {
        throw new APIError('get:no_found', 'the corp is not found')
    }
}

var fn_post_query = async (ctx, next) => {
    let res = await queryProject(ctx.request.body)
    ctx.rest(res)
}

var fn_post_teamlabor_save = async (ctx, next) => {
    let proLabTeam = await saveProjectLaborTeam(ctx.request.body)
    if (proLabTeam) { // 若有proLabTeam,则表示保存成功,返回id
        ctx.rest({id: proLabTeam.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the project is save faile')
    }
}

var fn_post_teamlabor_query = async (ctx, next) => {
    let res = await queryProjectLaborTeam(ctx.request.body)
    ctx.rest(res)
}

module.exports = {
    'POST /project/save': fn_post_save,
    'POST /project/destory': fn_post_destory,
    'POST /project/get': fn_post_get,
    'POST /project/query': fn_post_query,
    'POST /project/laborteam/save': fn_post_teamlabor_save,
    'POST /project/laborteam/query': fn_post_teamlabor_query
}
