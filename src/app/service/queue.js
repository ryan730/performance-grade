/**
 * Created by ryan.zhu on 2017/12/6.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 * 任务消息队列
 */
import conf from '../../config/conf'
const ptask = require('../controler/processTask')
const kue = require('kue')
const sha1 = require('sha1')
const moment = require('moment')
const jobs = kue.createQueue()
const jobName = 'performance-grade'
const port = 9010
const taskList = {}
//kue.app.listen(port)
jobs.watchStuckJobs()
//倒计时效果
function count (job) {
  let pending = 10
    , total = pending
  return new Promise((resolve, reject) => {
    var interval = setInterval(function () {
      //console.log('count====>1', job.id, pending)
      job.log('sending!')
      job.progress(total - pending, total)
      pending--
      if (pending < 0) {
        clearInterval(interval)
        pending = total
        resolve()
        console.log('百分比加载完成:', job.id, pending)
      }
    }, 500)
  })
}
//拯救停留在ative,inative状态不动的数据
function rescueActive () {
  jobs.active(function (err, ids) {
    ids.forEach(function (id) {
      kue.Job.get(id, function (err, job) {
        //console.log('tobe rescue:', id, job)
        if (!err) job.inactive()
      })
    })
  })
  jobs.inactive(function (err, ids) {
    ids.forEach(function (id) {
      kue.Job.get(id, function (err, job) {
        console.log('tobe rescue:', id, job)
        if (!err) job.inactive()
      })
    })
  })
}

jobs.on('complete', (result) => {
  console.log('Job complete:', result)
}).on('failed attempt', (errorMessage, doneAttempts) => {
  console.log('Job failed')
}).on('failed', (errorMessage) => {
  console.log('Job failed:', errorMessage)
}).on('progress', (progress) => {
  console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data)
})

//任务入队
jobs.on('job enqueue', (id, type) => {
  console.log('job %s got queued', id)
})

//任务完成
jobs.on('job complete', (id, result) => {
  kue.Job.get(id, (err, job) => {
    if (err) return
    //删除完成的任务
    // job.remove((err) => {
    //   if (err) throw err
    //   console.log('removed completed job #%d', job.id)
    // })
  })
})

//队列处理，并发数5
jobs.process(jobName, 5, (job, done) => {
  let domain = require('domain').create()
  domain.on('error', function (err) {
    done(err)
  })
  domain.run(function () { // your process function
    (async () => {
      console.log('正在处理:', job.data);
      try {
        await ptask.saveGrade(job)
        await count(job)
        console.log('处理完成:', job.data);
        done()
      } catch (e) {
        console.error(e);
        done(e)
      }
    })()
  })

})
//警告
// process.once('SIGTERM', function (sig) {
//   jobs.shutdown(5000, function (err) {
//     console.log('Kue shutdown: ', err || '')
//     process.exit(0)
//   })
// })

exports.add = (req, res,obj,cb) => {
  let url = req.body.url
  let id = sha1(url)
  let callback = cb
  let job = jobs.create(jobName, {
    url: url,
    title: '收集需要性能打分的页面',
    id: id,
    date: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
    state:obj.state,
    userId:conf.userId
  }).attempts(0)
  //.removeOnComplete(true)
    .save((err) => {
      if (!err) console.log(job.id);
      taskList[id] = callback;
      //let cb = taskList[job.data.id]
      callback && callback(Object.assign(job.data, {jobId: job.id}));
    })

}

exports.get = () => {
  return kue
}

exports.create = () => {
  kue.app.listen(port)
  console.log('kue 启动!', port)
}
//exports.add('http://ad.weibo.com')
console.log('kue init!', port)

setInterval(() => {rescueActive()}, 1000000)

