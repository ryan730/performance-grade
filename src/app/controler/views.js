/**
 * Created by ryan.zhu on 2017/12/5.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
import ptk from './processTask'
exports.getPerformance = function (req, res, arg) {
  //performance是模版的名称
  res.render('performance')
}
exports.getDetailId = function (req, res, arg) {
  //render是模版的名称
  (async () => {
    let result = await ptk.loadGradeById(req, res)
    res.render('detailsId', result)
  })()
}

exports.getDetails = function (req, res, arg) {
  //render是模版的名称
  (async () => {
    let result = await ptk.loadGrade(req, res)
    res.render('details', result)
  })()
}

exports.getAssignments = function (req, res, arg) {
  //render是模版的名称
  (async () => {
    let result = await ptk.loadAssignments(req, res)
    res.render('detailsId', result)
  })()
}

exports.getQueue = function (req, res, arg) {
  //render是模版的名称
  let result = {name: req.params.id}
  res.render('queue', result)
}