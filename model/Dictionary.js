// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Dictionary', {
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4, // 使用uuid生成全球唯一识别码当做主键值
            primaryKey: true,
            comment: '主键'
        },
        key: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: 'k_v', // 创建key value字段联合唯一索引，保证key value联合的值不会重复
            comment: '键'
        },
        value: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: 'k_v',
            comment: '值'
        },
        desc: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '描述'
        }
    },{
        timestamps: true, // sequelize自动加入createdAt、updatedAt字段
        comment: '数据字典表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}