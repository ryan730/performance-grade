/**
 * Created by ryan.zhu on 2017/12/6.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 ** queue.js 队列的具体处理事件
 */
import LaunchBrowser from '../browser/launchBrowser'
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const sha1 = require('sha1')
const mkdirp = require('mkdirp')
const stringify = require('json-stable-stringify');
import conf from '../../config/conf'
import ruler from '../analyze/ruler'

const walk = require('walk')
const uri = conf.assetsState.fliePath + conf.userId + '/'
const picUri = '/files/' + conf.userId + '/'

/*保存json和截图到本地*/
function saveFiles (listData, picData, jobData) {
  let dirPath = uri + jobData.id + '/'
  let fileName = sha1(jobData.date)
  let filePath = dirPath + fileName
  if (!fs.existsSync(dirPath)) {
    //fs.mkdirSync(dirPath)
    console.log('++++++++++++++++++++++', dirPath)
    mkdirp.sync(dirPath)
  }
  //保存截图,并把地址写入listData
  if (picData && picData instanceof Array) {
    picData.forEach((item, index) => {
      let imgFilePatch = filePath + '-' + index + '.png'
      fs.writeFileSync(imgFilePatch, Buffer.from(item, 'base64'))
      listData.captureImg.push(picUri + jobData.id + '/' + fileName + '-' + index + '.png')
    })
  }

  if (listData instanceof Object) {
    fs.writeFileSync(filePath + '.txt', JSON.stringify(listData, null, 4))
  }
  console.log('文档创建完成;')
}
//合并将要保存的数据
function mergeSaveData (listData, job, analyze) {
  return Object.assign(listData,
    Object.assign(
      {
        jobId: job.id,
        captureImg: [],
        analyze: analyze,
        userId: conf.userId
      },
      job.data
    ))
}
/*以文件形式保存job和grade内容*/
exports.saveGrade = (job, done) => {
  let result = (async () => {
    let jobData = job.data
    let body
    console.log('saveGrade-正在处理:', job.id, job.data, jobData.state)
    try {
      if (jobData.state !== 'success') {
        body = {listData: {timing: null, entries: null, navigation: null}, picData: []};
        //throw new Error(job)
      } else {
        body = await LaunchBrowser.renderPage({body: {url: jobData.url}}, {})
      }

      let listData = body.listData
      let picData = body.picData
      let analyze = ruler(listData)
      //合并job和performance,analyze 的数据
      listData = mergeSaveData(listData, job, analyze)
      //===============>>>结果和截图保存到本地
      saveFiles(listData, picData, jobData)
      console.log('saveGrade-处理完成-success:', job.data)
      done && done()
    } catch (e) {
      console.error(e)
      done && done()
    }
    return job
  })()
  return result
}

exports.loadGrade = (req, res) => {
  return new Promise((resovle, reject) => {
    let dirNameArr = []
    let uri = conf.assetsState.fliePath + '/'
    let walker = walk.walk(uri, {followLinks: false})
    walker.on('directory', function (root, directory, next) {
      let dirName = directory.name
      //console.log('dirName:',dirName.name,uri)
      if (dirName && dirName.length === 11) {
        dirNameArr.push(directory)
      }
      next()
    })
    walker.on('names', function (root, nodeNamesArray) {
      console.log('nodeNamesArray:', nodeNamesArray.length)
    })
    walker.on('end', function () {
      console.log('walker end!', uri, dirNameArr)
      //res.render( 'details',{dataList:flieNameArr})
      dirNameArr = dirNameArr.sort((a,b)=>{
        let preDate = new Date(a.atime).getTime();
        let curDate = new Date(b.atime).getTime();
        return preDate < curDate ? 1 : -1;
      })
      resovle({dataList: dirNameArr})
    })
  })
}

exports.loadAssignments = (req, res) => {
  return new Promise((resovle, reject) => {
    let flieNameArr = []
    let id = req.params.id || conf.userId
    let uri = conf.assetsState.fliePath + '/';
    debugger;
    let walker = walk.walk(uri, {followLinks: false})
    walker.on('file', function (root, fileStats, next) {
      let fileName = fileStats.name

      if (fileName.indexOf('.txt') !== -1) {
        console.log('walker on!', root)
        let data = fs.readFileSync(root + '/' + fileStats.name, 'UTF-8')
        flieNameArr.push(JSON.parse(data))
      }
      next()
    })
    walker.on('names', function (root, nodeNamesArray) {
      console.log('nodeNamesArray:', nodeNamesArray.length)
    })
    walker.on('end', function () {
      //////console.log('walker end!', uri, flieNameArr)
      //排序
      flieNameArr = flieNameArr.sort((a,b)=>{
        let preDate = new Date(a.date).getTime();
        let curDate = new Date(b.date).getTime();
        return preDate < curDate ? 1 : -1;
      })
      resovle({dataList: flieNameArr})
    })
  })
}

exports.loadGradeById = (req, res) => {
  return new Promise((resovle, reject) => {
    let flieNameArr = []
    let id = req.params.id || conf.userId
    let uri = conf.assetsState.fliePath + id + '/'
    let walker = walk.walk(uri, {followLinks: false})
    walker.on('file', function (root, fileStats, next) {
      let fileName = fileStats.name
      if (fileName.indexOf('.txt') !== -1) {
        console.log('walker on!', root)
        let data = fs.readFileSync(root + '/' + fileStats.name, 'UTF-8')
        flieNameArr.push(JSON.parse(data))
      }
      next()
    })
    walker.on('names', function (root, nodeNamesArray) {
      console.log('nodeNamesArray:', nodeNamesArray.length)
    })
    walker.on('end', function () {
      console.log('walker end!', uri, flieNameArr)
      //res.render( 'details',{dataList:flieNameArr})
      // let arr = stringify(obj, function (a, b) {
      //   return a.key < b.key ? 1 : -1;
      // });
      flieNameArr = flieNameArr.sort((a,b)=>{
        let preDate = new Date(a.date).getTime();
        let curDate = new Date(b.date).getTime();
        return preDate < curDate ? 1 : -1;
      })
      resovle({dataList: flieNameArr})
    })
  })

}