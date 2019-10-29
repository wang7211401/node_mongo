const express = require('express');
const User = require('../db/model/userModel')
const Mail = require('../utils/mail')

let codes = {}
const router = express.Router();

/**
 * @api {post} /user/reg 用户注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} email 邮箱
 * @apiParam {String} code 验证码
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 */
router.post('/reg', async(req, res) => {
    let { username, password, email, code } = req.body;

    if (!username || !password || !email || !code) {
        return res.send({ err: 1, msg: '参数错误' })
    }

    if (codes[email] != code) {
        return res.send({ err: -3, msg: '验证码错误' })
    }
    let newUser = await User.find({ username })

    if (newUser.length > 0) {
        return res.send({ err: -1, msg: '用户名已经存在' })
    }
    User.insertMany({ username, password, email }).then(() => {
        res.send({ err: 0, msg: '注册成功' })
    }).catch(err => {
        res.send({ err: -2, msg: '注册失败' })
    })
})

/**
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 */
router.post('/login', async(req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.send({ err: 1, msg: '参数错误' })
    }

    let userDate = User.find({ username, password }).then(data => {
        if (data.length > 0) {
            res.send({ err: 0, msg: '登录成功' })
        } else {
            res.send({ err: -3, msg: '用户名或密码错误' })
        }
    }).catch(err => {
        res.send({ err: -4, msg: '请刷新重试' })
    })

})

/**
 * @api {post} /user/getMailCode 验证码
 * @apiName getMailCode
 * @apiGroup User
 *
 * @apiParam {String} mail 邮箱
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 */
router.post('/getMailCode', (req, res) => {
    let { mail } = req.body
    let code = parseInt(Math.random() * (1000000 - 100000) + 100000)

    Mail.send(mail, code).then(() => {
        codes[mail] = code
        res.send({ err: 0, msg: '验证码发送成功' })
    }).catch(err => {
        res.send({ err: -1, msg: '发送失败' })
    })
})
module.exports = router