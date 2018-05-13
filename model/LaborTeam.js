// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('LaborTeam',{
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4, // 使用uuid生成全球唯一识别码当做主键值
            primaryKey: true,
            comment: '主键'
        },
        corpId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: 'corp_title', // 创建corpId title字段联合唯一索引，保证一个劳务公司不会出现重名的劳务队
            comment: '所属劳务公司id'
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: 'corp_title', 
            comment: '劳务队名称'
        },
        leader: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '劳务队长'
        },
        leaderTel: {
            type: DataTypes.STRING(11),
            allowNull: false,
            comment: '劳务队长联系电话'
        }
    },{
        timestamps: true, // sequelize自动加入createdAt、updatedAt字段
        comment: '劳务队表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}