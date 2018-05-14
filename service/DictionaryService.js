const {Dictionary} = require('../model')
const {APIError} = require('../rest')
const {queryConditionParser} = require('../common/util')

/**
 * 保存数据字段 (若params中带有id,则为修改，否则为添加)
 */
let saveDictionary = async params => {
    let dictionary = null
    if (params.id !== undefined && params.id !== null) {
        dictionary = await Dictionary.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
                dictionary[key] = params[key]
            }
        }
    } else {
        dictionary = Dictionary.build(params)
    }
    dictionary = await dictionary.save()
    return dictionary
}
/**
 * 删除数据词典
 * @param {*} params 
 */
let destoryDictionary = async params => {
    let dictionary = await Dictionary.findOne({
        'where': params
    })
    if (dictionary === null) { throw new APIError('delete:not_found', 'this dictionary has not found!') }
    let res = await dictionary.destroy()
    return res
}

/**
 * 获取单个数据字典对象
 * @param {*} params 
 */
let getDicionary = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let dictionary = await Dictionary.findById(params['id'])
    return dictionary
}

/**
 * 根据条件查询数据字典对象列表
 * @param {*} param 
 */
let queryDictionary = async params => {
    let condition = queryConditionParser(params)
    let result = await Dictionary.findAndCountAll(condition)
    return result
}

module.exports = {
    saveDictionary,
    destoryDictionary,
    getDicionary,
    queryDictionary
}