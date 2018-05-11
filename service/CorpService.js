const Corp = require('../model/corp')
const {APIError} = require('../rest')
const {queryConditionParser} = require('../common/util')

/**
 * 保存企业 (若params中带有id,则为修改，否则为添加)
 */
let saveCorp =  async params => {
    let corp = Corp.build(params)
    corp = await corp.save()
    return corp
}
/**
 * 删除企业
 * @param {*} params {id: xxxxxx} 参数
 */
let destoryCorp = async params => {
    let corp = await Corp.findOne({
        'where': params
    })
    if (corp === null) { throw new APIError('delete:not_found', 'this corp has not found!') }
    let res = await corp.destroy()
    return res
}

/**
 * 获取单个企业信息通过id
 * @param {*} params {id: xxx} 参数
 */
let getCorp = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let corp = await Corp.findById(params['id'])
    return corp
}

/**
 * 查询企业信息通过条件
 * @param {*} params 请求参数
 */
let queryCorp = async params => {
    let condition = queryConditionParser(params, ['status', 'kind', 'aptitudeKind', 'like%title'])
    let result = await Corp.findAndCountAll(condition)
    return result
}

module.exports = {
    saveCorp,
    destoryCorp,
    getCorp,
    queryCorp
}