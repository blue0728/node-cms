/**
 * Created by Administrator on 2017/3/3.
 */
var admin = require('./admin');
module.exports = function(app) {
    app.use('/api/admin', admin)
}