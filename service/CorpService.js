const {Corp, sequelize} = require('../model')
const {APIError} = require('../rest')
const {queryConditionParser} = require('../common/util')

/**
 * 保存企业 (若params中带有id,则为修改，否则为添加)
 */
let saveCorp =  async params => {
    let corp = null
    if (params.id !== undefined && params.id !== null) {
        corp = await Corp.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
                corp[key] = params[key]
            }
        }
    } else {
        corp = Corp.build(params)
    }
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
    let condition = queryConditionParser(params)
    let result = await Corp.findAndCountAll(condition)
    return result
}

/**
 * 企业分类状态统计查询
 * @param {*} params 
 */
let corpStatistic = async params => {
    let results = []
    await sequelize.query('select kind,`status`,COUNT(*) as `count` from corps GROUP BY kind,`status`',
    {raw: true}).then(res => {
    console.log(`corpStatistic=${JSON.stringify(res)}`)
    results = res[0]
  })
  return results
}

module.exports = {
    saveCorp,
    destoryCorp,
    getCorp,
    queryCorp,
    corpStatistic
}