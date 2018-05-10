const Sequelize = require('sequelize')

const {sequelize, id} = require('../init-db')

// User实体类的定义与数据库中的users表关联
const User = sequelize.define('user', {
    id: id,
    username: {
        type: Sequelize.STRING(20),
        allowNull: false,// 不允许NULL
        unique: true // 唯一性约束
    },
    password: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    corpType: {
        type: Sequelize.STRING(36),
        allowNull: false
    },
    position: {
        type: Sequelize.STRING(36),
        allowNull: false
    },
    corpId: {
        type: Sequelize.STRING(36),
        allowNull: false
    }
},{
    timestamps: false // 防止sequelize自动加入createdAt、updatedAt字段
})

module.exports = User
