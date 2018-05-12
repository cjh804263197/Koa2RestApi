/**
 * 该类的作用主要就是初始化Sequelize对象，并进行一些基础的配置，最终将sequelize暴露给调用者
 */

// 导入sequelize，ORM实体对象框架类似于javaweb中的hibernate
const Sequelize = require('sequelize')

// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

// 创建Sequelize对象，并传入相应参数创建数据库连接
var sequelize = new Sequelize('LaborManage', 'root', 'root', { // 从左到右依次是:数据库名称 数据库账号 数据库密码
    host: 'localhost', // 数据库所在的主机名
    dialect: 'mysql', // 数据库方言 也就是使用哪种数据库
    pool: { // 数据库连接池相关属性设置
        max: 5,
        min: 0,
        idle: 10000
    }
  })
  console.log('init sequelize...')

  let id = {
    type: Sequelize.STRING(36),
    defaultValue: uuid.v4,
    primaryKey: true
  }

  let createdAt = {
      type: Sequelize.BIGINT,
      defaultValue: Date.now(),
      allowNull: false
  }
  
  module.exports = {
      sequelize,
      Sequelize
    }