// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Project', {
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4,
            primaryKey: true,
            comment: '主键'
        },
        buildCorpId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '建设单位Id'
        },
        constructCorpId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '施工总承包单位Id'
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '项目名称'
        },
        addr: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '项目地址'
        },
        buildLicenceCerNum: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '施工许可证号'
        },
        buildArea: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: '建筑面积 单位:㎡'
        },
        struct: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '工程结构'
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: '工程造价 单位:元'
        },
        contractAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: '合同金额'
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '开工日期'
        },
        completeDate: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '竣工日期'
        }
    },{
        timestamps: true, // Sequelize自动加入createdAt、updatedAt字段
        comment: '项目表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
