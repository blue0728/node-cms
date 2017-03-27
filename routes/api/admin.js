/**
 * Created by Administrator on 2017/3/3.
 */
var express = require('express');
var router = express.Router();
var admin = require('../../model/admin');
var fs = require('fs')
var logger = require('../../util/logger')

//支持post get方式
router.all('/add', function (req, res, next) {
    admin.add(req, res, next)
})

router.all('/login', function (req, res, next) {
    admin.select(req, res, next)
})

router.all('/fs', function (req, res, next) {
    function hello(file) {
        logger.log_debug('进入hello:' + new Date().getTime())
        console.log('进入hello:' + new Date().getTime())
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                fs.readFile(process.cwd() + file, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data.toString())
                    }
                })
            }, 1000)
        })
    }

    function world(file) {
        console.log('进入world:' + new Date().getTime())
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                fs.readFile(process.cwd() + file, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data.toString())
                    }
                })
            }, 1000)
        })
    }

    var start = async() => {
        console.log('----------------------------------')
        try {
            var helloVal = await hello('/1.text');
            console.log('结束hello:' + helloVal, new Date().getTime())
            var wordVal = await world('/2.text');
            console.log('结束world:' + wordVal, new Date().getTime())
        }
        catch (err) {
            console.log(err)
        }
    }
    //Node7 async await 让异步回调变得更加优雅
    start();
    res.json({
        code: 200,
        data: '开始'
    });
})

module.exports = router;