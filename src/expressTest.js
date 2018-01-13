/**
 * Created by ryan.zhu on 2018/1/13.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
//加载express框架
var express = require('express');
//创建一个express实例
var app = express();
//创建express的路由功能，可以根据需要创建多个路由，需要多少，创建多少。
var router = express.Router();

router.use(function(req, res, next) {
  //路由，类似于java中的拦截器功能，在请求到达后台之前，先在这里处理。
  //  some logic here ..
  req.query["name"] = "tom";
  console.info('进入路由，添加一个参数name=tom');
  //next的作用是将请求转发，这个必须有，如果没有，请求到这就挂起了。
  next();
});

//get('/login') 截取Get请求方式的url中含有/login的请求
router.get('/get', function(req, res, next) {
  console.log('get进入路由，添加一个参数age=28');
  req.query["age"] = "28";
  next(); //请求转发
});
router.post('/post', function(req, res, next) {
  console.log('post进入路由，添加一个参数age=28');
  req.query["age"] = "28";
  next(); //请求转发
});

//加载路由，这里要放在下面原始监听/login的上面
app.get('/get', router);
app.get('/get', function(req, res) {
  console.log('get-打印参数', req.query);
  res.end('get-ok');
});

app.post('/post',router);
app.post('/post',function(req, res, next) {
  console.log('post-打印参数', req.body);
  res.end('post-ok');
})

app.listen(2018); //指定端口并启动express web服务

console.log('http://127.0.0.1:2018')