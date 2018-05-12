const {CorpUser, Corp} = require('../model')
const {APIError} = require('../rest')
const {queryConditionParser} = require('../common/util')

/**
 * 保存企业用户 (若params中带有id,则为修改，否则为添加)
 */
let saveCorpUser =  async params => {
    let corpUser = null
    if (params.id !== undefined && params.id !== null) {
        corpUser = await CorpUser.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
                corpUser[key] = params[key]
            }
        }
    } else {
        corpUser = CorpUser.build(params)
    }
    corpUser = await corpUser.save()
    return corpUser
}
/**
 * 删除企业用户
 * @param {*} params {id: xxxxxx} 参数
 */
let destoryCorpUser = async params => {
    let corpUser = await CorpUser.findOne({
        'where': params
    })
    if (corpUser === null) { throw new APIError('delete:not_found', 'this corp_user has not found!') }
    let res = await corpUser.destroy()
    return res
}

/**
 * 获取单个企业用户信息通过id
 * @param {*} params {id: xxx} 参数
 */
let getCorpUser = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let corpUser = await CorpUser.findById(params['id'])
    return corpUser
}

/**
 * 查询企业信息通过条件
 * @param {*} params 请求参数
 */
let queryCorpUser = async params => {
    let condition = queryConditionParser(params)
    let result = await CorpUser.findAndCountAll({
        include: [{association: CorpUser.belongsTo(Corp, {foreignKey:'corpId'})}],
        ...condition
    })
    return result
}

module.exports = {
    saveCorpUser,
    destoryCorpUser,
    getCorpUser,
    queryCorpUser
}