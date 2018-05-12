const {sequelize} = require('./init-db')
// 导入模型
let Corp = sequelize.import('./Corp.js')
let CorpUser = sequelize.import('./CorpUser.js')

// 同步模型到数据库中
sequelize.sync()

module.exports = {
    CorpUser,
    Corp
}