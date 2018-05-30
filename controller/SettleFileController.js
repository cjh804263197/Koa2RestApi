const {APIError} = require('../rest')
const { txtParse } = require('../upload')
const {formDataParser} = require('../common/util')
const {saveSettleFile,
  destorySettleFile,
  getSettleFile,
  querySettleFile,
  querySalarySettleData,
  createSettleFile} = require('../service/SettleFileService')
  const {readReportFileToSalary} = require('../service/SalaryService')
  const pathObj = require('path')

var fn_post_save = async (ctx, next) => {
    let settleFile = await saveSettleFile(ctx.request.body)
    if (settleFile) { // 若有user,则表示保存成功,返回id
        ctx.rest({id: settleFile.id})
    } else { // 否则表示失败，抛出失败的异常
        throw new APIError('save:faile', 'the salary is save faile')
    }
}

var fn_post_destory = async (ctx, next) => {
    let res = await destorySettleFile(ctx.request.body)
    ctx.rest(res)
}

var fn_post_get = async (ctx, next) => {
    let settleFile = await getSettleFile(ctx.request.body)
    if (settleFile) {
        ctx.rest(settleFile)
    } else {
        throw new APIError('get:no_found', 'the corp is not found')
    }
}

var fn_post_query = async (ctx, next) => {
    let res = await querySettleFile(ctx.request.body)
    ctx.rest(res)
}

/**
 * 生成工资结算文件
 * @param {*} ctx 
 * @param {*} next 
 */
var fn_post_createSettleFile = async (ctx, next) => {
  // 查询出工资结算数据
  let datas = await querySalarySettleData(ctx.request.body)
  if (datas.length === 0) { // 若工资结算数据长度为0,则代表没有工资结算数据
    throw new APIError('create:faile', 'the salary is no data')
  }
  // 将工资结算数据写入到txt文件中，并返回文件名和文件路径
  let fileObj = await createSettleFile(datas)
  // 查询是否存在该文件名的数据
  let res = await querySettleFile({filename: fileObj.filename})
  if (res.count > 0) { // 若存在
    fileObj = res.rows[0]
  }
  let saveRes = await saveSettleFile(fileObj)
  if (saveRes) { // 若有proLabTeam,则表示保存成功,返回id
      ctx.rest(saveRes)
  } else { // 否则表示失败，抛出失败的异常
      throw new APIError('create:faile', 'the salary is create faile')
  }
}

/**
 * 上传工资结算报告并回写入数据库
 * @param {*} ctx 
 * @param {*} next 
 */
var fn_post_uploadSettleReportFile = async (ctx, next) => {
  // 将formData表单转化为接受对象
  let obj = await txtParse(ctx)
  // 获取到上传文件的对象
  let file = obj.files.reportFile[0]
  // 获取文件名
  let filename = file.originalFilename
  let url = file.path.replace(/\\/g, '/')
  let fileObj = {filename: filename, kind: '结算报告', url: url}
  // 查询是否存在该文件名的数据
  let res = await querySettleFile({filename: filename})
  if (res.count > 0) { // 若存在
    fileObj = res.rows[0]
    fileObj.url = url
  }
  let saveRes = await saveSettleFile(fileObj)
  let affectRows = await readReportFileToSalary(__dirname + '/../' + url)
  ctx.rest({affectRows})
}

module.exports = {
    'POST /settlefile/save': fn_post_save,
    'POST /settlefile/destory': fn_post_destory,
    'POST /settlefile/get': fn_post_get,
    'POST /settlefile/query': fn_post_query,
    'POST /settlefile/createSettleFile': fn_post_createSettleFile,
    'POST /settlefile/uploadReport': fn_post_uploadSettleReportFile
}
