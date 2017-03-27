/**
 * Created by Administrator on 2017/3/8.
 */
var log4js = require('log4js');
//log4js levels
var log4jsLevels = {
    log_date: 'ALL',
    log_debug: 'DEBUG',
    log_info: 'INFO',
    log_warn: 'WARN',
    log_error: 'ERROR'
};
//log4js.configure.appenders
var appenders = [{
    type: 'console',
    category: 'console'
}];
for (key in log4jsLevels) {
    appenders.push({
        type: 'dateFile',
        filename: 'logs/' + key + '/log',
        alwaysIncludePattern: true,
        pattern: '-yyyy-MM-dd.log',
        category: key
    })
}
//log4js.configure
log4js.configure({
    appenders: appenders,
    replaceConsole: true,
    levels: log4jsLevels
});

module.exports = {
    log_date: function (app) {
        app.use(log4js.connectLogger(log4js.getLogger('log_date'), {
            level: log4js.levels.log_date
        }))
    },
    log_debug: function (data) {
        var loggerWrite = log4js.getLogger('log_debug')
        data = data || '';
        loggerWrite.debug(data);
    },
    log_info: function (data) {
        var loggerWrite = log4js.getLogger('log_info')
        data = data || '';
        loggerWrite.info(data);
    },
    log_warn: function (data) {
        var loggerWrite = log4js.getLogger('log_warn')
        data = data || '';
        loggerWrite.warn(data);
    },
    log_error: function (data) {
        var loggerWrite = log4js.getLogger('log_warn')
        data = data || '';
        loggerWrite.error(data);
    }
}
