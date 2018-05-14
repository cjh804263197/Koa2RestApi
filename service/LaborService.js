const {Labor, LaborTeam, Corp} = require('../model')
const {APIError} = require('../rest')
const {queryConditionParser} = require('../common/util')

/**
 * 保存劳务人员 (若params中带有id,则为修改，否则为添加)
 */
let saveLabor =  async params => {
    let labor = null
    if (params.id !== undefined && params.id !== null) {
        labor = await Labor.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
                labor[key] = params[key]
            }
        }
    } else {
        labor = Labor.build(params)
    }
    labor = await labor.save()
    return labor
}
/**
 * 删除劳务人员
 * @param {*} params {id: xxxxxx} 参数
 */
let destoryLabor = async params => {
    let labor = await Labor.findOne({
        'where': params
    })
    if (labor === null) { throw new APIError('delete:not_found', 'this corp_user has not found!') }
    let res = await labor.destroy()
    return res
}

/**
 * 获取单个劳务人员信息通过id
 * @param {*} params {id: xxx} 参数
 */
let getLabor = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let labor = await Labor.findById(params['id'])
    return labor
}

/**
 * 查询劳务人员信息列表通过条件
 * @param {*} params 请求参数
 */
let queryLabor = async params => {
    let condition = queryConditionParser(params)
    let result = await Labor.findAndCountAll({
        include: [
            {association: Labor.belongsTo(LaborTeam, {foreignKey:'laborTeamId'})},
            {association: LaborTeam.belongsTo(Corp, {foreignKey:'corpId'})}
        ],
        ...condition
    })
    return result
}

module.exports = {
    saveLabor,
    destoryLabor,
    getLabor,
    queryLabor
}