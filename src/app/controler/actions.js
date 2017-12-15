/**
 * Created by ryan.zhu on 2017/12/6.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
/////const kuer = require('../service/queue');
import request from 'request';
//尝试请求地址,返回状态
let cookie;
function requestConnet(siteUrl){
  console.log('尝试连接')
  let j = request.jar();
  if(cookie) {
    let myCookie = request.cookie( cookie );
    j.setCookie( myCookie, siteUrl );
  }
  return new Promise((resolve, reject) => {
    request( { url: siteUrl, timeout: 6000,jar: j }, ( error, response, body ) => {
      if (!error && response.statusCode === 200) {
        console.log('尝试连接成功!url地址正常');
        resolve(cookie);
      } else if(!error && response.statusCode !== 200){
        console.log( '尝试连接失败',response.statusCode);
        reject(response.statusCode);
      }else {
        console.log( '尝试连接失败',error);
        reject([error]);
      }
    } )
  })

}
exports.postPerformance = function( req, res, arg ) {
  (async()=>{
    try{
      await requestConnet(req.body.url);
      // kuer.add(req,res,{state:'success'},(data)=>{
      //   res.json({msg:'已提交到服务队列处理',code:0,result:data});
      // });
    }catch(e){
      console.log( 'error:',e );
      // kuer.add(req,res,{state:'fail'},(data)=>{
      //   res.json({msg:'提交url超时或者返回异常',code:-1,result:data,errorMsg:e});
      // });
    }
  })();
}