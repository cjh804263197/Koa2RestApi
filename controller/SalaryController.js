const {APIError} = require('../rest')

const formParse = require('../upload')

const {formDataParser} = require('../common/util')

const {saveSalary, destorySalary, getSalary, querySalary, createSalaryByProLabTeam} = require('../service/SalaryService')

var fn_post_save = async (ctx, next) => {
    let salary = await saveSalary(ctx.request.body)
    if (salary) { // 若有user,则表示保存成功,返回id
        ctx.rest({id: salary.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the salary is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    let res = await destorySalary(ctx.request.body)
    ctx.rest(res)
}

var fn_post_get = async (ctx, next) => {
    let salary = await getSalary(ctx.request.body)
    if (salary) {
        ctx.rest(salary)
    } else {
        throw new APIError('get:no_found', 'the corp is not found')
    }
}

var fn_post_query = async (ctx, next) => {
    let res = await querySalary(ctx.request.body)
    ctx.rest(res)
}

var fn_post_createSalaryByProLabTeam = async (ctx, next) => {
    let res = await createSalaryByProLabTeam(ctx.request.body)
    if (!res) { // 若有proLabTeam,则表示保存成功,返回id
        ctx.rest(res)
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('create:faile', 'the salary is create faile')
    }
}

module.exports = {
    'POST /salary/save': fn_post_save,
    'POST /salary/destory': fn_post_destory,
    'POST /salary/get': fn_post_get,
    'POST /salary/query': fn_post_query,
    'POST /salary/createSalaryByProLabTeam': fn_post_createSalaryByProLabTeam
}
