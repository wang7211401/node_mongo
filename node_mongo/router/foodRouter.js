const express = require('express');
const router = express.Router();

const Food = require('../db/model/foodModel')


/**
 * @api {post} /food/add 添加商品
 * @apiName addFood
 * @apiGroup Food
 *
 * @apiParam {String} name 用户名
 * @apiParam {String} price 价格
 * @apiParam {String} desc 描述
 * @apiParam {String} typename 分类
 * @apiParam {String} typeid 分类id
 * @apiParam {String} img 图片
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 */
router.post('/add', (req, res) => {

    // let data = {
    //     name: '西红柿炒鸡蛋',
    //     price: '28',
    //     desc: '国民家常菜',
    //     typename: '热菜',
    //     typeid: 1,
    //     img: '/public/img/19.jpg'
    // }

    let { name, price, desc, typename, typeid, img } = req.body
    if (!name || !price || !desc || !typename || !typeid || !img) {
        return res.send({ err: -2, msg: '参数错误' })
    }

    Food.insertMany({ name, price, desc, typename, typeid, img }).then(() => {
        res.send({ err: 0, msg: '添加成功' })
    }).catch(() => {
        res.send({ err: -1, msg: '请刷新重试' })
    })
})

/**
 * @api {post} /food/getInfoByType 查找商品
 * @apiName getInfoByType
 * @apiGroup Food
 *
 * @apiParam {Number} typeid 分类id
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 * @apiSuccess {Array} data 响应数据
 */

router.post('/getInfoByType', (req, res) => {
    let { typeid } = req.body

    Food.find({ typeid }).then(data => {
        res.send({ err: 0, msg: '查找成功', data })
    }).catch(() => {
        res.send({ err: -1, msg: '请刷新重试' })
    })
})


/**
 * @api {post} /food/getInfoByKw 关键字查询
 * @apiName getInfoByKw
 * @apiGroup Food
 *
 * @apiParam {String} kw 关键字
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 * @apiSuccess {Array} data 响应数据
 */

router.post('/getInfoByKw', (req, res) => {
    let { kw } = req.body
    let reg = new RegExp(kw)

    // Food.find({ name: { $regex: reg } })
    Food.find({ $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }] })
        .then(data => {
            res.send({ err: 0, msg: '查找成功', data })
        }).catch(() => {
            res.send({ err: -1, msg: '请刷新重试' })
        })
})

/**
 * @api {post} /food/del 删除商品
 * @apiName del
 * @apiGroup Food
 *
 * @apiParam {String} _id id
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 */
router.post('/del', (req, res) => {
    let { _id } = req.body
    Food.deleteOne({ _id }).then(() => {
        res.send({ err: 0, msg: '删除成功' })
    }).catch(() => {
        res.send({ err: -1, msg: '请刷新重试' })
    })

})


/**
 * @api {post} /food/update 修改商品
 * @apiName update
 * @apiGroup Food
 *
 * @apiParam {String} _id id
 * @apiParam {String} name 用户名
 * @apiParam {String} price 价格
 * @apiParam {String} desc 描述
 * @apiParam {String} typename 分类
 * @apiParam {String} typeid 分类id
 * @apiParam {String} img 图片
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 */
router.post('/update', (req, res) => {
    let { _id, name, price, desc, type, typeid, img } = req.body
    Food.update({ _id }, { name, price, desc, type, typeid, img }).then(() => {
        res.send({ err: 0, msg: '修改成功' })
    }).catch(() => {
        res.send({ err: -1, msg: '请刷新重试' })
    })

})


/**
 * @api {post} /food/getInfoByPage 分页查询
 * @apiName getInfoByPage
 * @apiGroup Food
 *
 * @apiParam {String} page 当前页
 * @apiParam {pageSize} pageSize 显示条数
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 */

router.post('/getInfoByPage', (req, res) => {
    let pageSize = req.body.pageSize || 3 // 显示条数
    let page = req.body.page || 1 // 当前页

    Food.find().limit(Number(pageSize)).skip(Number((page - 1) * pageSize))
        .then(data => {
            res.send({ err: 0, msg: '查找成功', data })
        }).catch(() => {
            res.send({ err: -1, msg: '请刷新重试' })
        })

})

module.exports = router