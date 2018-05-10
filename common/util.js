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

module.exports = {
    formDataParser
}