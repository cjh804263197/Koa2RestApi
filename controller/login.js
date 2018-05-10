const User = require('../model/user')
const encrypt = require('../common/encrypt')
const {APIError} = require('../rest')

const formParse = require('../upload')

const {formDataParser} = require('../common/util')

var fn_get_login = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/api/login" method="post">
            <p>Name: <input name="username" value="chen"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`
}

var fn_post_login = async (ctx, next) => {
    let username = ctx.request.body.username
    let password = encrypt.md5(ctx.request.body.password)
    console.log(`signin with name: ${username}, password: ${password}`)

    console.log(`User: ${JSON.stringify(User)}`)
    
    let users = await User.findAll({
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

var test_get_upload = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/api/upload" method="post" enctype="multipart/form-data">
            <p>Name: <input type="text" name="name"></p>
            <p>Age: <input type="text" name="age"></p>
            <p>Select File: <input type="file" name="file1"></p>
            <p>Select File: <input type="file" name="file2"></p>
            <p><input type="submit" value="sumbit"></p>
        </form>`
}

var test_post_upload = async (ctx, next) => {
    let obj = await formParse(ctx)
    console.log(`obj=${JSON.stringify(obj)}`)
    let params = formDataParser(obj)
    console.log(`params=${JSON.stringify(params)}`)
    ctx.rest(params)
}

module.exports = {
    'GET /login': fn_get_login,
    'POST /login': fn_post_login,
    'GET /upload': test_get_upload,
    'POST /upload': test_post_upload
}