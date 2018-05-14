const {LaborTeam, Corp} = require('../model')
const {APIError} = require('../rest')
const {queryConditionParser} = require('../common/util')

/**
 * 保存劳务队 (若params中带有id,则为修改，否则为添加)
 */
let saveLaborTeam =  async params => {
    let laborTeam = null
    if (params.id !== undefined && params.id !== null) {
        laborTeam = await LaborTeam.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
                laborTeam[key] = params[key]
            }
        }
    } else {
        laborTeam = LaborTeam.build(params)
    }
    laborTeam = await laborTeam.save()
    return laborTeam
}
/**
 * 删除劳务队
 * @param {*} params {id: xxxxxx} 参数
 */
let destoryLaborTeam = async params => {
    let laborTeam = await LaborTeam.findOne({
        'where': params
    })
    if (laborTeam === null) { throw new APIError('delete:not_found', 'this corp_user has not found!') }
    let res = await laborTeam.destroy()
    return res
}

/**
 * 获取单个劳务队信息通过id
 * @param {*} params {id: xxx} 参数
 */
let getLaborTeam = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let laborTeam = await LaborTeam.findById(params['id'])
    return laborTeam
}

/**
 * 查询劳务队信息列表通过条件
 * @param {*} params 请求参数
 */
let queryLaborTeam = async params => {
    let condition = queryConditionParser(params)
    let result = await LaborTeam.findAndCountAll({
        include: [
            {association: LaborTeam.belongsTo(Corp, {foreignKey:'corpId'})}
        ],
        ...condition
    })
    return result
}

module.exports = {
    saveLaborTeam,
    destoryLaborTeam,
    getLaborTeam,
    queryLaborTeam
}