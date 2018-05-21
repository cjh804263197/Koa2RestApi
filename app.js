// 导入koa,在koa2.x版本中，导入的是一个class
const Koa = require('koa')
// 导入body-parser中间件，解决post请求中无法直接获取到body中请求参数
const bodyParser = require('koa-bodyparser')
// 导入koa-session中间件，主要是来操纵session来控制用的用户的登录状态
const session = require('koa-session')
// 导入自定义的自动扫描controller
const controller = require('./scan-controller')
// 导入自定义rest
const {restify, APIError} = require('./rest')
// 导入koa-static中间件，来处理静态文件网路请求
let serve = require('koa-static')
const mount = require('koa-mount')

// 解决跨域请求问题
const cors = require('koa2-cors')

// 创建一个server对象
let server = new Koa()


server.use(cors({ // 解决js跨域请求问题
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false
        }
        return 'http://localhost:8080'
        // return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    'Access-Control-Allow-Credentials':true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 循环组件keys,防止session被破解
let keys = []
for (var i = 0; i < 10000; i++) {
    keys.push('keys'+Math.random())
}
server.keys= keys

const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 2*3600*1000,  // cookie的过期时间 maxAge in ms (default is 1 days) 设置为2个小时
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
}
server.use(session(CONFIG, server))

// 使用body-parser中间件
server.use(bodyParser())

// 绑定 .rest() for ctx:
server.use(restify())

// log request URL: 拦截非法访问，例如没有登录的用户的访问
server.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    console.log(`Session ${ctx.session.user}`)
    if (ctx.session.user === undefined && ctx.request.url.indexOf('/login') === -1) {
        throw new APIError('auth:unauthorized', 'you should to login!')
    } else {
        if (ctx.request.method === 'POST' && ctx.request.params === {}) {
            throw new APIError('param:null', 'param should not null!')
        } else {
            await next()
        }
    }
})

// 使用自动扫描controller,自动装配路由 默认在路由根路径加上/api
server.use(mount('/api', controller()))
// 当访问路径中带有/static时，则走该默认文件获取方法
server.use(mount('/static', serve(__dirname + '/static'), { extensions: ['html', 'txt', 'jpg', 'png']}))

// 设置server服务器监听8090端口
server.listen(8090)