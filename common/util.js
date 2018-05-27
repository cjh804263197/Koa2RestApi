/**
 * 处理form表单中的数据，将其转换为key value形式
 * @param {*} obj 
 */
let formDataParser = obj => {
    let fields = obj.fields === undefined ? [] : obj.fields
    let files = obj.files === undefined ? [] : obj.files
    let params = {}
    for (let key in fields) {
        if (fields[key].length > 0) {
            params[key] = fields[key][0]
        }
    }
    for (let key in files) {
        if (files[key].length > 0) {
            params[key] = files[key][0]['path']
        }
    }
    return params
}

/**
 * 通过传入字段，自动加工为查询条件,若所指定的查询字段在请求参数中为undefined，在查询条件中没有该字段的查询条件
 * @param {*} params 请求参数
 */
let queryConditionParser = (params) => {
    let condition = {}
    for (let key in params) {
        if (key !== 'limit' && key !== 'currentPage' && key.indexOf('.') === -1) {
            if (key.startsWith('like%')) {
                let field = key.replace('like%', '')
                condition = (params[key] === undefined || params[key] === '' || params[key] === null) ? {...condition} : {...condition, [field]: {'$like': `%${params[key]}%`}}
            } else {
                condition = (params[key] === undefined || params[key] === '' || params[key] === null) ? {...condition} : {...condition, [key]: params[key]}
            }
        }
    }
    let opt = { where: condition }
    if (params.limit !== undefined && params.currentPage !== undefined && params.limit !== null && params.currentPage !== null) {
        opt.limit = params['limit'],
        opt.offset = (params['currentPage'] - 1) * params['limit']
    }
    console.log(`opt=${JSON.stringify(opt)}`)
    return opt
}

/**
 * 通过传入字段，自动加工为子查询的条件，若所指定的查询字段在请求参数中为undefined，在查询条件中没有该字段的查询条件
 * @param {*} params 请求参数
 * @param {*} alias 子查询的表名(别名)
 */
let queryChildConditionParser = (params, alias) => {
    let condition = {}
    for (let key in params) {
        if (key.indexOf('.') !== -1) { // 当key中带有.时，则表明该字段为子查询条件
            if (params[key] !== undefined && params[key] !== '' && params[key] !== null) {
                let subKeys = key.split('.')
                condition = {...condition, [subKeys[subKeys.length-1]]: params[key]}
            }
        }
    }
    return condition
}

module.exports = {
    formDataParser,
    queryConditionParser,
    queryChildConditionParser
}