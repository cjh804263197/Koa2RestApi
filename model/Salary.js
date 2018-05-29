// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Salary', {
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4,
            primaryKey: true,
            comment: '主键'
        },
        laborTeamId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '劳务队Id'
        },
        projectId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: 'pro_lab_year_month', // 创建projectId laborId year month字段联合唯一索引，保证一个项目一个员工一年中一个月只有一条工资记录
            comment: '项目Id'
        },
        laborId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: 'pro_lab_year_month', // 创建projectId laborId year month字段联合唯一索引，保证一个项目一个员工一年中一个月只有一条工资记录
            comment: '劳务人员Id'
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'pro_lab_year_month', // 创建projectId laborId year month字段联合唯一索引，保证一个项目一个员工一年中一个月只有一条工资记录
            comment: '年'
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'pro_lab_year_month', // 创建projectId laborId year month字段联合唯一索引，保证一个项目一个员工一年中一个月只有一条工资记录
            validate: {min: 1, max: 12}, // 允许的最小值 1 代表一月 允许最大值 12 代表12月
            comment: '月份'
        },
        standardAttendDay: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: '应出勤天数'
        },
        actualAttendDay: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: '实际出勤天数'
        },
        money: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: '工资 单位:元'
        },
        status: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '状态'
        }
    },{
        timestamps: true, // Sequelize自动加入createdAt、updatedAt字段
        comment: '工资表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
