/**
 * Created by ryan.zhu on 2017/12/5.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 * 处理浏览器的渲染结果
 */
const ChromeRender = require('chrome-render')
import chromeLoader from '../browser/chromeLoader'
//输出页面内容
exports.putOutPage = (req, res) => {
  let url = req.body.url
  return new Promise((resolve, reject) => {
    ChromeRender.new({}).then(async (chromeRender) => {
      const htmlString = await chromeRender.render({
        url: url,
      })
      resolve(htmlString)
    })
  })
}

//渲染页面内容
exports.renderPage = (req, res) => {
  let url = req.body.url
  return new Promise((resolve, reject) => {
    chromeLoader(req, res, (data) => {
      if(!data) {
        console.error('页面渲染返回错误');
        reject(new Error('页面渲染返回错误!'))
        return;
      }
      let rel = data;
      resolve(rel)
    })
    //console.log('renderPage:', renderPage)
  })
}