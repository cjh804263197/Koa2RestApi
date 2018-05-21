// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('SuperviseUser', {
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4, // 使用uuid生成全球唯一识别码当做主键值
            primaryKey: true,
            comment: '主键'
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '姓名'
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true, // 唯一性约束
            comment: '用户名'
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false,
            comment: '密码'
        },
        position: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '职位'
        },
        department: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '所属部门'
        }
    }, 
    {
        timestamps: false, // 防止sequelize自动加入createdAt、updatedAt字段
        comment: '监督部门用户表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
