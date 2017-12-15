/**
 * Created by ryan.zhu on 2017/12/5.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
//res.status(500).send('Internal Server Error')
const views = require( '../app/controler/views' );
const actions = require( '../app/controler/actions' );
const express = require( 'express' );
const router = express.Router();

// 该路由使用的中间件
router.use(( req, res, next )=> {
    console.log( '中间件-Time: ', Date.now() );
    next();
} );

// router.get( '/', ( req, res )=>{
//     console.log('服务根目录')
//     res.json( '展示页面-/' );
// } );

// 定义网站主页的路由
router.get( '/index', ( req, res )=>{
    res.json( '展示页面-index' );
    //res.send('Birds home page');
} );

// 定义list页面的路由
router.get( '/list',( req, res )=>{
    res.json( '展示页面-list' );
} );

// 定义queue页面的路由
router.get( '/queue/:id',( req, res )=>{
  //res.json( '展示页面-list' );
  views.getQueue(req, res);
} );

// 定义detail页面的路由
router.get( '/detail',( req, res )=>{
    //res.json( '展示页面-detail' );
    views.getDetails(req, res);
} );

// 定义assignments页面的路由
router.get( '/assignments',( req, res )=>{
    //res.json( '展示页面-detail' );
    views.getAssignments(req, res);
} );

router.get( '/detail/:id', ( req, res )=>{//打印所有数据
    //res.json( '展示页面-detail:'+req.params.id);
    views.getDetailId(req, res);
} );

router.get( '/main', ( req, res )=>{
    views.getPerformance(req, res);
} );

router.post( '/post/ppter', ( req, res )=>{
  //res.json( {result:'展示页面-detail'} );
  actions.postPerformance(req, res);
} );

// router.get( '/*', ( req, res )=> {
//     ////console.log('req:::',req);
//     res.json( {
//         'get':{
//             '/getPerformance:ppter':'用 pupperteer 性能测试及打分页面'
//         },
//         'post':{
//             '/getPerformance:ppter':'用 pupperteer 性能测试及打分结果'
//         }
//     } );
// } );

module.exports = router;
