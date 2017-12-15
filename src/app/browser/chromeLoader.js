/**
 * Created by ryan.zhu on 2017/12/5.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 *浏览器的渲染
 */
const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const fs = require('fs');


export default (req,res,callbck)=>{
  let url = (req&&req.body)?req.body.url:'https://ad.weibo.com';
  let isDo = false;
  function launchChrome(headless=true) {
    return chromeLauncher.launch({
      chromeFlags: [
        url,
        '--window-size=1024,768',
        '--disable-gpu',
        headless ? '--headless' : ''
      ]
    });
  }
  async function launch_chrome() {
    isDo = false;
    console.log('launchChrome->start');
    const chrome = await launchChrome();
    const client = await CDP({port: chrome.port});
    console.log('launchChrome->init:',chrome.port);
    const {Network,Emulation,Page, Runtime} = client;
    //网络仿真
    Network.canEmulateNetworkConditions().catch(function () {
      console.log("Do not support network emulation!");
    });
    //清除cache
    Network.canClearBrowserCache().catch(function () {
      console.log("Do not support cache clear!");
    });
    await Promise.all([Page.enable(), Runtime.enable(),Network.enable()])
    console.log('launchChrome->env set completed!');
    //Page.navigate({url: 'https://ad.weibo.com/'});
    Network.requestWillBeSent(params => {
      console.log('Network:',params.request.url);
    });
    const captureImg1= (await Page.captureScreenshot()).data;//截图
    console.log('launchChrome->capture-1!');
    async function done(){
      try{
        let js =  `
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          let con={
                            timing : performance.timing,
                            entries:performance.getEntries(),
                            navigation:performance.navigation
                          };
                          resolve(JSON.stringify(con));
                      }, 100); // simulate a long-running async operation
                  })`;
        const result = await Runtime.evaluate({
          awaitPromise: true,
          expression: js
        });
        const captureImg2 = (await Page.captureScreenshot()).data;//截图2
        console.log('launchChrome->capture-2!');
        client.close();
        chrome.kill(); // Kill Chrome.
        if (result.exceptionDetails && result.exceptionDetails.exception) {
          throw Error(result.exceptionDetails.exception.description); //Used for any invalid js execution
        }
        //listData:页面数据,picData:截图二进制
        callbck({listData:JSON.parse(result.result.value),picData:[captureImg1,captureImg2]});
      }catch(e){
        callbck({listData:{timing : null, entries: null, navigation:null},picData:[]});
      }
    }
    let doneId = setTimeout(()=>{
      if(!isDo){
        isDo = true;
        done();
      }
    },30000);
    Page.loadEventFired(async () => {
      console.log('launchChrome->end');
      clearTimeout(doneId);
      if(!isDo){
        isDo = true;
        done();
      }
    });
  }

  function launch_CDP() {
    CDP(async (client) => {
      const {Page} = client;
      try {
        await Page.enable();
        await Page.navigate({url: url});
        await Page.loadEventFired();
        //const {data} = await Page.captureScreenshot();
        //fs.writeFileSync('scrot.png', Buffer.from(data, 'base64'));
      } catch (err) {
        console.error(err);
      } finally {
        await client.close();
      }
    }).on('error', (err) => {
      console.error(err);
    });
  }

  //launch_CDP();
  launch_chrome();
}