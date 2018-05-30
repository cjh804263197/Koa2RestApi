const { Salary, SettleFile, sequelize} = require('../model')
const {APIError} = require('../rest')
const {queryConditionParser} = require('../common/util')
const fs = require('fs')

/**
 * 保存工资结算文件信息 (若params中带有id,则为修改，否则为添加)
 */
let saveSettleFile =  async params => {
    let settleFile = null
    if (params.id !== undefined && params.id !== null) {
      settleFile = await SettleFile.findById(params.id)
        for (let key in params) {
            if (key !== 'id') {
              settleFile[key] = params[key]
            }
        }
    } else {
      settleFile = SettleFile.build(params)
    }
    settleFile = await settleFile.save()
    return settleFile
}
/**
 * 删除工资结算文件信息
 * @param {*} params {id: xxxxxx} 参数
 */
let destorySettleFile = async params => {
    let settleFile = await SettleFile.findOne({
        'where': params
    })
    if (settleFile === null) { throw new APIError('delete:not_found', 'this corp_user has not found!') }
    let res = await settleFile.destroy()
    return res
}

/**
 * 获取单个工资结算文件信息通过id
 * @param {*} params {id: xxx} 参数
 */
let getSettleFile = async params => {
    if (!params['id']) {
        throw new APIError('param:error', 'param should include id!')
    }
    let settleFile = await SettleFile.findById(params['id'])
    return settleFile
}

/**
 * 查询工资信息信息列表通过条件
 * @param {*} params 请求参数
 */
let querySettleFile = async params => {
    let condition = queryConditionParser(params)
    let result = await SettleFile.findAndCountAll({
        ...condition
    })
    return result
}

/**
 * 通过项目Id、劳务队Id以及年、月份查询工资结算文件数据
 * @param {*} params {projectId: xxx, laborTeamId: xxx, year: xxxx, month: x}
 */
let querySalarySettleData = async params => {
  let results = []
    await sequelize.query('SELECT pro.title as `project`,labteam.title as `laborTeam`,pro.account,constructCorp.title,lab.`name`,sala.money,sala.`year`,sala.`month`,sala.id '
    + 'FROM salaries AS `sala` '
    + 'LEFT OUTER JOIN projects AS `pro` ON sala.projectId = pro.id '
    + 'LEFT OUTER JOIN corps AS `buildCorp` ON buildCorp.id = pro.buildCorpId AND buildCorp.kind = :kind1 '
    + 'LEFT OUTER JOIN corps AS `constructCorp` ON constructCorp.id = pro.constructCorpId AND constructCorp.kind = :kind2 '
    + 'LEFT OUTER JOIN laborteams AS `labteam` ON labteam.id = sala.laborTeamId '
    + 'LEFT OUTER JOIN corps AS `labCorp` ON labCorp.id = labteam.corpId AND labCorp.kind = :kind3 '
    + 'LEFT OUTER JOIN labors AS `lab` ON lab.id = sala.laborId '
    + 'WHERE sala.projectId=:projectId AND sala.laborTeamId=:laborTeamId AND sala.`year`=:year AND sala.`month`=:month AND sala.`status`=:status ',
  {raw: true, replacements: {
      kind1: '建设单位', kind2: '施工总承包单位', 
      kind3: '劳务公司', projectId: params['projectId'], 
      laborTeamId: params['laborTeamId'], year: params['year'], 
      month: params['month'],status: '已审核'
    }
  }).then(res => {
    console.log(`createSettleFileData=${JSON.stringify(res[0])}`)
    results = res[0]
  })

  return results
}

/**
 * 通过工资结算数据，生成工资结算文件
 * @param {*} datas 工资结算数据
 * 注：回车在各系统中的差异
 * \r回车 \n换行
 * window中用 \r\n
 * Linux中用 \n
 * Mac中用 \r
 */
let createSettleFile = async datas => {
  let space = ' '
  let enter = '\r\n'
  let chunks = []
  let length = 0
  datas.forEach(data => {
    let record = data.account + space + data.title + space 
    + data.name + space + data.money + space + data.year + space 
    + data.month + space + data.id + enter
    let buffer = new Buffer(record, 'utf8')
    length += buffer.length
    chunks.push(buffer)
  })
  let resultBuffer = new Buffer(length)
  for (let i=0, size=chunks.length, pos=0; i < size; i++) {
    chunks[i].copy(resultBuffer, pos)
    pos += chunks[i].length
  }
  // 拼接生成文件名
  let filename = `${datas[0].year}年${datas[0].month}月${datas[0].project + datas[0].laborTeam}工资结算.txt`
  let filePath = __dirname + '/../' + 'static/upload/txt/' + filename
  try {
    fs.writeFileSync(filePath, resultBuffer)
  } catch (e) {
    console.error(e)
    throw new APIError('create:faile', 'the salary is create faile')
  }
  return {filename: filename, kind: '结算文件', url: '/static/upload/txt/' + filename}
}


module.exports = {
    saveSettleFile,
    destorySettleFile,
    getSettleFile,
    querySettleFile,
    querySalarySettleData,
    createSettleFile
}