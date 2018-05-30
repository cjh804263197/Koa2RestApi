const {Labor, Project, Salary, LaborTeam} = require('../model')
const {APIError} = require('../rest')
const {queryConditionParser, queryChildConditionParser} = require('../common/util')
const fs = require('fs')

/**
 * 保存工资信息 (若params中带有id,则为修改，否则为添加)
 */
let saveSalary =  async params => {
    let salary = null
    if (params.id !== undefined && params.id !== null) {
        salary = await Salary.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
                salary[key] = params[key]
            }
        }
    } else {
        salary = Salary.build(params)
    }
    salary = await salary.save()
    return salary
}
/**
 * 删除工资信息
 * @param {*} params {id: xxxxxx} 参数
 */
let destorySalary = async params => {
    let salary = await Salary.findOne({
        'where': params
    })
    if (salary === null) { throw new APIError('delete:not_found', 'this corp_user has not found!') }
    let res = await salary.destroy()
    return res
}

/**
 * 获取单个工资信息信息通过id
 * @param {*} params {id: xxx} 参数
 */
let getSalary = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let salary = await Salary.findById(params['id'])
    return salary
}

/**
 * 查询工资信息信息列表通过条件
 * @param {*} params 请求参数
 */
let querySalary = async params => {
    let condition = queryConditionParser(params)
    let childCondition = queryChildConditionParser(params, 'LaborTeam')
    let result = await Salary.findAndCountAll({
        include: [
            {association: Salary.belongsTo(Project, {foreignKey:'projectId', as: 'Project'})},
            {
                association: Salary.belongsTo(LaborTeam, {foreignKey:'laborTeamId', as: 'LaborTeam'}),
                where: childCondition,
                required: true
            },
            {association: Salary.belongsTo(Labor, {foreignKey:'laborId', as: 'Labor'})}
        ],
        ...condition
    })
    return result
}

/**
 * 批量生成工资信息通过项目Id、劳务队Id以及年、月份
 * @param {*} params {projectId: xxx, laborTeamId: xxx, year: xxxx, month: x}
 */
let createSalaryByProLabTeam = async params => {
    // 首先通过projectId查询出Project对象
    let project = await Project.findById(params['projectId'])
    if (!project) { throw new APIError('params:error', 'The projectId is error!') }
    // 通过laborTeamId查询出所有的劳务人员信息列表对象
    let labors = await Labor.findAll({
        where: {
            laborTeamId: params['laborTeamId']
        }
    })
    let salarys = []
    // 遍历劳务人员信息列表
    labors.forEach(labor => {
        // 构建生成工资记录
        let salary = {
            projectId: project.id,
            laborId: labor.id,
            laborTeamId: labor.laborTeamId,
            year: params['year'],
            month: params['month'],
            standardAttendDay: 0,
            actualAttendDay: 0,
            money: 0,
            status: '待审核'
        }
        salarys.push(salary)
    })
    // 批量插入
    let res = await Salary.bulkCreate(salarys)
    let results = res.map(sala => {
        let labs = labors.filter(lab => {
            return lab.id === sala.laborId
        })
        let salaJson = JSON.parse(JSON.stringify(sala))
        return {...salaJson, laborName: labs[0].name}
    })
    return results
}

/**
 * 读取文件中的数据，并将发放状态回写到工资表中
 * @param {*} path 
 */
let readReportFileToSalary = async (path) => {
    let space = ' '
    let enter = '\r\n'
    let content = fs.readFileSync(path, 'utf-8') // 读取结算报告文件中的内容
    let datas = content.split(enter)
    let results = []
    datas.forEach(data => {
        let fildes = data.split(space)
        if (parseInt(fildes[7])) {
            results.push(fildes[6])
        }
    })
    // 批量更新
    let affectRows = await Salary.update( {status: '已发放'}, {
            where: { id: results }
    })
    return affectRows
}

module.exports = {
    saveSalary,
    destorySalary,
    getSalary,
    querySalary,
    createSalaryByProLabTeam,
    readReportFileToSalary
}