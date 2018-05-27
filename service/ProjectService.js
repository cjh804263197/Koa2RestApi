const {Project, Corp, ProjectLaborTeam, LaborTeam} = require('../model')
const {APIError} = require('../rest')
const {queryConditionParser, queryChildConditionParser} = require('../common/util')

/**
 * 保存项目 (若params中带有id,则为修改，否则为添加)
 */
let saveProject =  async params => {
    let project = null
    if (params.id !== undefined && params.id !== null) {
        project = await Project.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
                project[key] = params[key]
            }
        }
    } else {
        project = Project.build(params)
    }
    project = await project.save()
    return project
}
/**
 * 删除项目
 * @param {*} params {id: xxxxxx} 参数
 */
let destoryProject = async params => {
    let project = await Project.findOne({
        'where': params
    })
    if (project === null) { throw new APIError('delete:not_found', 'this corp_user has not found!') }
    let res = await project.destroy()
    return res
}

/**
 * 获取单个项目信息通过id
 * @param {*} params {id: xxx} 参数
 */
let getProject = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let project = await Project.findById(params['id'])
    return project
}

/**
 * 查询项目信息通过条件
 * @param {*} params 请求参数
 */
let queryProject = async params => {
    let condition = queryConditionParser(params)
    let result = await Project.findAndCountAll({
        include: [
            {association: Project.belongsTo(Corp, {foreignKey:'buildCorpId', as:'BuildCorps'})},
            {association: Project.belongsTo(Corp, {foreignKey:'constructCorpId', as:'ConstructCorps'})}
        ],
        ...condition
    })
    return result
}

/**
 * 保存项目与劳务队的分配关系
 * @param {*} params 若params中带有id,则为修改，否则为添加
 */
let saveProjectLaborTeam = async params => {
    let proLabTeam = null
    if (params.id !== undefined && params.id !== null) {
        proLabTeam = await ProjectLaborTeam.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
                proLabTeam[key] = params[key]
            }
        }
    } else {
        proLabTeam = ProjectLaborTeam.build(params)
    }
    proLabTeam = await proLabTeam.save()
    return proLabTeam
}

/**
 * 获取单个项目劳务队关系通过id
 * @param {*} params {id: xxx} 参数
 */
let getProjectLaborTeam = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let proLabTeam = await ProjectLaborTeam.findById(params['id'])
    return proLabTeam
}

/**
 * 查询项目与劳务队分配关系列表通过条件
 * @param {*} params 请求参数
 */
let queryProjectLaborTeam = async params => {
    let condition = queryConditionParser(params)
    let childCondition = queryChildConditionParser(params, 'Project')
    console.log(`childCondition=${JSON.stringify(childCondition)}`)
    let result = await ProjectLaborTeam.findAndCountAll({
        include: [
            {
                association: ProjectLaborTeam.belongsTo(Project, {foreignKey:'projectId', as:'Project'}),
                where: childCondition,
                required: true // 当require为true时自动转化为inner join,默认false时是left outer join
            },
            {association: ProjectLaborTeam.belongsTo(Corp, {foreignKey:'laborCorpId', as:'LaborCorp'})},
            {association: ProjectLaborTeam.belongsTo(LaborTeam, {foreignKey:'laborTeamId', as:'LaborTeam'})}
        ],
        ...condition
    })
    return result
}

module.exports = {
    saveProject,
    destoryProject,
    getProject,
    queryProject,
    saveProjectLaborTeam,
    queryProjectLaborTeam
}