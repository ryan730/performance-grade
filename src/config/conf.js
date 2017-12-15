/**
 * Created by ryan.zhu on 2017/12/7.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
const path = require('path')
const conf = {
  userId: '1341234567' + (new Date().getTime() % 9),
  assetsState: {
    fliePath: path.join(process.cwd(), '/WWW/stateSite/files/')
  }
}
export default conf