const Corp = require('../model/corp')
const {APIError} = require('../rest')

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
 * @param {*} params 
 */
let destoryCorp = async params => {
    var corp = await Corp.findOne({
        'where': params
    })
    if (corp === null) { throw new APIError('delete:not_found', 'this corp has not found!') }
    let res = await corp.destroy()
    return res
}

module.exports = {
    saveCorp,
    destoryCorp
}