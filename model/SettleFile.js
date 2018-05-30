// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('SettleFile', {
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4, // 使用uuid生成全球唯一识别码当做主键值
            primaryKey: true,
            comment: '主键'
        },
        filename: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: 'filename_unique', // 创建filename唯一索引，保证filename的值不会重复
            comment: '文件名称'
        },
        kind: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '文件类型'
        },
        url: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '文件路径'
        }
    },{
        timestamps: true, // sequelize自动加入createdAt、updatedAt字段
        comment: '结算文件表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}