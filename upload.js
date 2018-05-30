// 导入文件上传中间件
const multiparty = require("multiparty")


let imgParse = ctx => {
  return new Promise((resolve, reject) => {
    // 为了避免第二次上传时报write after end错误，因此每次请求都重新创建form对象
    // 具体参考：https://stackoverflow.com/questions/29846199/uploading-document-in-nodejs-using-fs-module-error-write-after-end?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    let form = new multiparty.Form({uploadDir:'./static/upload/'})
    form.parse(ctx.req,function(err,fields,files){
      if(err){
        console.log(`form_parser_err=${err.message}`)
        reject(err)
      } else {
        console.log(fields)//除文件外的其他附带信息
        console.log(files)//文件信息
        let obj = {fields, files}
        resolve(obj)
      }
    })
  })
}

let txtParse = ctx => {
  return new Promise((resolve, reject) => {
    // 为了避免第二次上传时报write after end错误，因此每次请求都重新创建form对象
    // 具体参考：https://stackoverflow.com/questions/29846199/uploading-document-in-nodejs-using-fs-module-error-write-after-end?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    let form = new multiparty.Form({uploadDir:'./static/upload/txt/'})
    form.parse(ctx.req,function(err,fields,files){
      if(err){
        console.log(`form_parser_err=${err.message}`)
        reject(err)
      } else {
        console.log(fields)//除文件外的其他附带信息
        console.log(files)//文件信息
        let obj = {fields, files}
        resolve(obj)
      }
    })
  })
}
  
module.exports = {
  imgParse,
  txtParse
}