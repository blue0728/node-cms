/**
 * Created by Administrator on 2017/3/3.
 */
var crypto = require('crypto');
var uuid = require('node-uuid');
module.exports = {
    getUuid: function (v) {
        return v === 1 ? uuid.v1() : uuid.v4();
    },
    getCrypto: function (str, type) {
        var f = crypto.createHash(type);
        return f.update(str).digest('hex');
    },
    getIp: function (req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    },
    checkLogin: function (req, res, next) {
        if (!req.session.user) {
            res.json({
                code: -100,
                msg: '请先登录'
            })
        } else {
            next();
        }
    },
    returnJson: function (res, result) {
        if (typeof result === 'undefined') {
            res.json({
                code: -1,
                msg: '操作失败'
            });
        } else {
            res.json(result);
        }
    }
};