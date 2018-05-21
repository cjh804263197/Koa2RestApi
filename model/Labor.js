// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Labor',{
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4, // 使用uuid生成全球唯一识别码当做主键值
            primaryKey: true,
            comment: '主键'
        },
        laborTeamId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '所属劳务队id'
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '姓名'
        },
        position: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '职位'
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '年龄'
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '性别'
        },
        idCardNum: {
            type: DataTypes.STRING(18),
            allowNull: false,
            comment: '身份证号'
        },
        bankCardNum: {
            type: DataTypes.STRING(19),
            allowNull: false,
            comment: '银行卡号'
        },
        attendCardNum: {
            type: DataTypes.STRING(30),
            allowNull: false,
            comment: '考勤卡号'
        },
        entryDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            comment: '入职日期'
        }
    },{
        timestamps: true, // sequelize自动加入createdAt、updatedAt字段
        comment: '劳务人员表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}