/**
 * Created by ryan.zhu on 2017/12/5.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
require('babel-core/register');
require('babel-polyfill');
require('./app');

const logger = require('./utils/logHelp').helper;
logger.writeInfo("==开始记录日志==");