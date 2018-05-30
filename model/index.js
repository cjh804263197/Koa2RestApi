const {sequelize} = require('./init-db')
// 导入模型
let CorpUser = sequelize.import('./CorpUser.js')
let Corp = sequelize.import('./Corp.js')
let Dictionary = sequelize.import('./Dictionary.js')
let LaborTeam = sequelize.import('./LaborTeam.js')
let Labor = sequelize.import('./Labor.js')
let Project = sequelize.import('./Project.js')
let ProjectLaborTeam = sequelize.import('./ProjectLaborTeam.js')
let Salary = sequelize.import('./Salary.js')
let SuperviseUser = sequelize.import('./SuperviseUser.js')
let SettleFile = sequelize.import('./SettleFile.js')

// 同步模型到数据库中
sequelize.sync()

module.exports = {
    sequelize,
    CorpUser,
    Corp,
    Dictionary,
    LaborTeam,
    Labor,
    Project,
    ProjectLaborTeam,
    Salary,
    SuperviseUser,
    SettleFile
}