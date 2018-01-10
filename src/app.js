/**
 * Created by ryan.zhu on 2017/12/5.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routers/router');
const kuer = require('./app/service/queue');
///////const kuerTest = require('./kueTest');

const express = require('express');
const app = express();
const port = process.env.PORT || 1501

//模版view所在的目录或者目录数组
app.set('views', path.join(process.cwd(), 'WWW/stateSite') + '/views');

//模版解析器
app.set('view engine', 'pug');
//parsing application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: true}));

//body返回json格式
app.use(bodyParser.json());

//跨域
app.use( function( req, res, next ) {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
  next();
} );

//默认指向一个静态页面文件夹,这一句和router.get( '/' ）覆盖关系
app.use(express.static(path.join(process.cwd(), 'WWW/stateSite')));

//设置路由
app.use(router);

app.use(kuer.get().app);

kuer.create();

//启动监听路由
app.listen( port );

console.log( 'Listening on port:' + port );
console.log( 'asset patch: ' + path.join(process.cwd(), 'WWW/stateSite') );