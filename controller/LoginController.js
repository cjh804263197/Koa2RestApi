const {CorpUser, Corp, SuperviseUser} = require('../model')
const encrypt = require('../common/encrypt')
const {APIError} = require('../rest')

const formParse = require('../upload')

const {formDataParser} = require('../common/util')

/**
 * 企业用户登录
 */
var corp_user_login = async (ctx, next) => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    console.log(`signin with name: ${username}, password: ${password}`)
    
    let users = await CorpUser.findAll({
        include: [{association: CorpUser.belongsTo(Corp, {foreignKey:'corpId'})}],
        where: {
            username: username
        }
    })

    console.log(`find ${users.length} users`)

    if (users.length === 0) {
        throw new APIError('auth:not_found', 'username not found')
    } else if (users.length > 1) {
        throw new APIError('auth:has_much', 'this user has much!')
    } else {
        let user = users[0]
        if (user.password === password) {
            ctx.session.user = JSON.stringify(user)
            ctx.rest({
                user
            })
        } else {
            throw new APIError('auth:password_error', 'the password is error!')
        }
    }
}

/**
 * 监管用户登录
 */
var supervise_user_login = async (ctx, next) => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    console.log(`signin with name: ${username}, password: ${password}`)
    
    let users = await SuperviseUser.findAll({
        where: {
            username: username
        }
    })

    console.log(`find ${users.length} users`)

    if (users.length === 0) {
        throw new APIError('auth:not_found', 'username not found')
    } else if (users.length > 1) {
        throw new APIError('auth:has_much', 'this user has much!')
    } else {
        let user = users[0]
        if (user.password === password) {
            ctx.session.user = JSON.stringify(user)
            ctx.rest({
                user
            })
        } else {
            throw new APIError('auth:password_error', 'the password is error!')
        }
    }
}


var test_post_upload = async (ctx, next) => {
    let obj = await formParse(ctx)
    console.log(`obj=${JSON.stringify(obj)}`)
    let params = formDataParser(obj)
    console.log(`params=${JSON.stringify(params)}`)
    ctx.rest(params)
}

module.exports = {
    'POST /corp/user/login': corp_user_login,
    'POST /supervise/user/login': supervise_user_login
}