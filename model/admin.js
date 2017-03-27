/**
 * Created by Administrator on 2017/3/3.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('../conf/adminMsqlMaping');
var util = require('../util/util');
var pool = mysql.createPool($conf.mysql);

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            //获取参数 get post
            var params = req.query || req.body;
            if (!params.username || !params.password) {
                util.returnJson(res, {
                    code: 100,
                    msg: '参数不完整'
                });
                return;
            }
            //用户ID
            var uuid = util.getUuid(4);  //uuid.v4()
            var username = params.username;
            //加密盐
            var salt = util.getUuid(1);  //uuid.v1()
            //密码加密 sha256
            var password = util.getCrypto(params.password + '' + salt, 'sha256');
            var email = params.email;
            var mobile = params.mobile;
            //IP地址
            var reg_ip = util.getIp(req);
            var reg_time = (new Date()).getTime();
            var update_time = (new Date()).getTime();
            var status = params.status || 'ON';
            var arr = [uuid, username, password, salt, email, mobile, reg_ip, reg_time, update_time, status];
            //建立连接，向表中插入值
            connection.query($sql.insert, arr, function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    }
                }
                if(err.errno === 1062){
                    result = {
                        code: 1062,
                        msg: '用户名重复'
                    }
                }
                //返回结果
                util.returnJson(res, result);
                //释放数据库连接
                connection.release();
            })
        })
    },
    select: function(req, res, next){
        pool.getConnection(function (err, connection) {
            //获取参数 get post
            var params = req.query || req.body;
            if (!params.username || !params.password) {
                util.returnJson(res, {
                    code: 100,
                    msg: '请输入用户名/密码'
                });
                return;
            }
            //建立连接,查询登录
            connection.query($sql.select, [params.username], function (err, result) {
                if (result) {
                    var user = result[0];
                    //加密盐
                    var salt = user.Salt;
                    //密码 + 盐 重新sha256 加密后和密码匹配
                    var password = util.getCrypto(params.password + '' + salt, 'sha256');
                    if(password === user.Password){
                        result = {
                            code: 200,
                            msg: '登录成功'
                        }
                    }else{
                        result = {
                            code: 200,
                            msg: '用户名/密码错误'
                        }
                    }
                }
                //返回结果
                util.returnJson(res, result);
                //释放数据库连接
                connection.release();
            })
        })
    }
}