// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    // User实体类的定义与数据库中的users表关联
    return sequelize.define('Corp', {
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4,
            primaryKey: true,
            comment: '主键'
        },
        status: { // 企业状态
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '企业状态'
        },
        kind: { // 企业类型(建设单位、施工总承包、劳务公司)
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '企业类型'
        },
        title: { // 企业名称
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '企业名称'
        },
        registerAddr: {  // 注册地址
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '注册地址'
        },
        officeAddr: { // 办公地址
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '办公地址'
        },
        businessLicenceNum: { // 营业执照号码
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '营业执照号码'
        },
        aptitudeKind: { // 资质类别
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '资质类别'
        },
        aptitudeCerNum: { // 资质证号
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '资质证号'
        },
        safetyCerNum: {  // 安全许可证号
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '安全许可证号'
        },
        approveDate: { // 批准时间
            type: DataTypes.DATE,
            allowNull: false,
            comment: '批准时间'
        },
        effectiveDate: { // 生效时间
            type: DataTypes.DATE,
            allowNull: false,
            comment: '生效时间'
        },
        corporater: { // 法人代表姓名
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '法人代表姓名'
        },
        corporateTel: { // 法人电话
            type: DataTypes.STRING(11),
            allowNull: false,
            comment: '法人电话'
        },
        contactor: { // 联系人
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '联系人'
        },
        contactTel: { // 联系人电话
            type: DataTypes.STRING(11),
            allowNull: false,
            comment: '联系人电话'
        },
        email: { // 邮箱
            type: DataTypes.STRING(25),
            allowNull: false,
            comment: '企业邮箱'
        },
        businessLicenceImg: { // 营业执照照片url
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '营业执照照片url'
        },
        aptitudeCerImg: { // 资质证书照片url
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '资质证书照片url'
        },
        safetyCerImg: { // 安全许可证照片url
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '安全许可证照片url'
        }
    },{
        timestamps: true, // Sequelize自动加入createdAt、updatedAt字段
        comment: '企业表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}
