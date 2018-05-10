const Sequelize = require('sequelize')

const {sequelize, id} = require('../init-db')

// User实体类的定义与数据库中的users表关联
const Corp = sequelize.define('corp', {
    id: id,
    status: { // 企业状态
        type: Sequelize.STRING(36),
        allowNull: false // 不允许NULL
    },
    kind: { // 企业类型(建设单位、施工总承包、劳务公司)
        type: Sequelize.STRING(36),
        allowNull: false
    },
    title: { // 企业名称
        type: Sequelize.STRING(50),
        allowNull: false
    },
    registerAddr: {  // 注册地址
        type: Sequelize.STRING(50),
        allowNull: false
    },
    officeAddr: { // 办公地址
        type: Sequelize.STRING(50),
        allowNull: false
    },
    businessLicenceNum: { // 营业执照号码
        type: Sequelize.STRING(50),
        allowNull: false // 不允许NULL
    },
    aptitudeKind: { // 资质类别
        type: Sequelize.STRING(36),
        allowNull: false
    },
    aptitudeCerNum: { // 资质证号
        type: Sequelize.STRING(50),
        allowNull: false
    },
    safetyCerNum: {  // 安全许可证号
        type: Sequelize.STRING(50),
        allowNull: false
    },
    approveDate: { // 批准时间
        type: Sequelize.DATE,
        allowNull: false
    },
    effectiveDate: { // 生效时间
        type: Sequelize.DATE,
        allowNull: false
    },
    corporater: { // 法人代表姓名
        type: Sequelize.STRING(10),
        allowNull: false
    },
    corporateTel: { // 法人电话
        type: Sequelize.STRING(11),
        allowNull: false
    },
    contactor: { // 联系人
        type: Sequelize.STRING(10),
        allowNull: false
    },
    contactTel: { // 联系人电话
        type: Sequelize.STRING(11),
        allowNull: false
    },
    email: { // 邮箱
        type: Sequelize.STRING(25),
        allowNull: false
    },
    businessLicenceImg: { // 营业执照照片url
        type: Sequelize.STRING(100),
        allowNull: false
    },
    aptitudeCerImg: { // 资质证书照片url
        type: Sequelize.STRING(100),
        allowNull: false
    },
    safetyCerImg: { // 安全许可证照片url
        type: Sequelize.STRING(100),
        allowNull: false
    }
},{
    timestamps: false // 防止sequelize自动加入createdAt、updatedAt字段
})

module.exports = Corp
