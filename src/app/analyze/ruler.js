/**
 * Created by ryan.zhu on 2017/12/11.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
/*
 *
 * redirectCount
 重定向次数	:
 navigation.redirectCount

 redirect
 重定向时长(跳转耗时):
 timing.redirectEnd-timing. redirectStart

 appcache
 APP CACHE 耗时,验证是否缓存:
 timing.domainLookupStart - timing.fetchStart

 dns
 Dns查找耗时:
 timing.domainLookupEnd - timing.domainLookupStart

 connect
 Tcp 连接耗时:
 timing.connectEnd - timing.connectStart

 request
 等待服务器响应耗时（注意是否存在cache：
 timing.responseStart - timing.requestStart

 response
 内容加载耗时（注意是否存在cache:
 timing.responseEnd - timing.responseStart

 network
 总体网络交互耗时，即开始跳转到服务器资源下载完成:
 timing.connectEnd - timing.navigationStart

 processing
 Dom渲染处理时长:
 (timing.domComplete || timing.domLoading) - timing.domLoading

 load
 页面事件加载成功时长（onload）:
 timing.loadEventEnd – timing.loadEventStart

 total
 总耗时:
 (timing.loadEventEnd || timing.loadEventStart || timing.domComplete || timing.domLoading) - timing.navigationStart;

 domReady
 DomReady时长:
 timing.domContentLoadedEventStart - timing.navigationStart

 active
 到达页面‘可交互状态’时长:
 timing.domInteractive - timing.navigationStart

 FirstByte
 首字节时长	:
 timing.responseStart - timing.navigationStart

 firstPaint
 白屏时长:
 timing.msFirstPaint - timing.navigationStart

 FirstRender
 到达首次渲染时长:
 timing.domLoading - timing.navigationStart

 firstSrceen
 到达首屏完成时长:
 timing.loadEventEnd - timing.navigationStart

 * */
export default (performance) => {
  let navigation = performance.navigation
  let timing = performance.timing
  if(!navigation||!timing){
    return {};
  }
  return {
    //重定向次数
    redirectCount: {
      'title': '重定向次数',
      'value': (() => navigation.redirectCount)()
    },
    //重定向时长(跳转耗时)
    edirect: {
      'title': '重定向时长(跳转耗时)',
      'value': (() => timing.redirectEnd - timing.redirectStart)()
    },
    //APP CACHE 耗时,验证是否缓存
    appcache: {
      'title': 'APP CACHE 耗时,验证是否缓存',
      'value': (() => timing.domainLookupStart - timing.fetchStart)()
    },
    //Dns查找耗时
    dns: {
      'title': 'Dns查找耗时',
      'value': (() => timing.domainLookupEnd - timing.domainLookupStart)()
    },
    //Tcp 连接耗时
    connect: {
      'title': 'Tcp 连接耗时',
      'value': (() => timing.connectEnd - timing.connectStart)()
    },
    //等待服务器响应耗时（注意是否存在cache）
    request: {
      'title': '等待服务器响应耗时（注意是否存在cache）',
      'value': (() => timing.responseStart - timing.requestStart)()
    },
    //内容加载耗时（注意是否存在cache
    response: {
      'title': '内容加载耗时（注意是否存在cache',
      'value': (() => timing.responseEnd - timing.responseStart)()},
    //总体网络交互耗时，即开始跳转到服务器资源下载完成
    network: {
      'title': '总体网络交互耗时，即开始跳转到服务器资源下载完成',
      'value': (() => timing.connectEnd - timing.navigationStart)()},
    //Dom渲染处理时长
    processing: {
      'title': 'Dom渲染处理时长',
      'value': (() => (timing.domComplete || timing.domLoading) - timing.domLoading)()},
    //页面事件加载成功时长（onload)
    load: {
      'title': '页面事件加载成功时长（onload)',
      'value': (() => timing.loadEventEnd - timing.loadEventStart)()},
    //总耗时
    total: {
      'title': '总耗时',
      'value': (() => (timing.loadEventEnd || timing.loadEventStart || timing.domComplete || timing.domLoading) - timing.navigationStart)()
    },
    //DomReady时长
    domReady: {
      'title': 'DomReady时长',
      'value': (() => timing.domContentLoadedEventStart - timing.navigationStart)()},
    //到达页面‘可交互状态’时长
    active: {
      'title': '到达页面‘可交互状态’时长',
      'value': (() => timing.domInteractive - timing.navigationStart)()},
    //首字节时长
    firstByte: {
      'title': '首字节时长',
      'value': (() => timing.responseStart - timing.navigationStart)()},
    //白屏时长
    firstPaint: {
      'title': '白屏时长',
      'value': (() => timing.msFirstPaint - timing.navigationStart)()},
    //到达首次渲染时长
    firstRender: {
      'title': '到达首次渲染时长',
      'value': (() => timing.domLoading - timing.navigationStart)()},
    //到达首屏完成时长
    firstSrceen: {
      'title':'到达首屏完成时长',
      'value':(() => timing.loadEventEnd - timing.navigationStart)()
    }
  }
}