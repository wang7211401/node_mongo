const express = require('express');
const router = express.Router();
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './static/img')
    },
    filename: function(req, file, cb) {
        var arrFile = file.originalname.split('.')
        var suffix = arrFile[arrFile.length - 1]
        cb(null, file.fieldname + '-' + Date.now() + '.' + suffix)
    }
})

var upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: function(req, file, cb) {

        // 需要调用回调函数 `cb`，
        // 并在第二个参数中传入一个布尔值，用于指示文件是否可接受
        let types = ['jpg', 'jpeg', 'png', 'gif']
        let tmpType = file.mimetype.split('/')[1]

        if (types.indexOf(tmpType) == -1) {
            cb(null, false)
        } else {
            cb(null, true)
        }
    }
})

/**
 * @api {post} /file/upload 图片上传
 * @apiName upload
 * @apiGroup File
 *
 * @apiParam {FormData} file 图片
 *
 * @apiSuccess {Number} err 响应码
 * @apiSuccess {String} msg 响应内容
 * @apiSuccess {Object} data 响应数据
 */

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.send({ err: -3, msg: '类型错误' })
    }
    let { size, mimetype, filename } = req.file
    let types = ['jpg', 'jpeg', 'png', 'gif']
    let tmpType = mimetype.split('/')[1]
    if (size > 10000000) {
        return res.send({ err: -1, msg: '图片过大' })
    } else if (types.indexOf(tmpType) === -1) {
        return res.send({ err: -2, msg: '媒体类型错误' })
    } else {
        var imgPath = `http://127.0.0.1:3000/public/img/${filename}`
        res.send({ err: 0, msg: '上传成功', data: { img: imgPath } })
    }


    // res.send({ err: 0, msg: '上传成功' })
})

module.exports = router