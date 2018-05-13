// 引入uuid,生成唯一主键
const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProjectLaborTeam',{
        id: {
            type: DataTypes.STRING(36),
            defaultValue: uuid.v4, // 使用uuid生成全球唯一识别码当做主键值
            primaryKey: true,
            comment: '主键'
        },
        projectId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: 'pro_labteam', // 创建projectId laborTeamId字段联合唯一索引，保证一个项目该劳务队只能有一次分配关系
            comment: '项目Id'
        },
        laborTeamId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: 'pro_labteam', // 创建projectId laborTeamId字段联合唯一索引，保证一个项目该劳务队只能有一次分配关系
            comment: '劳务队Id'
        },
        effectiveDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            comment: '生效日期'
        },
        invaildDate: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '失效日期'
        }
    },{
        timestamps: true, // sequelize自动加入createdAt、updatedAt字段
        comment: '项目劳务队关系表',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}