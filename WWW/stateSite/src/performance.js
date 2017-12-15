/**
 * Author:zhuyan(ryan)
 * Email:zhuyan6@staff.weibo.com
 * Create Time: 2017-24 16:02
 * Description: performance
 */



//-$(document).ajaxStart(function () {
//-NProgress.start();
//-})
//-$(document).ajaxComplete(function () {
//-NProgress.done();
//-});

$('.btn.btn-default').click(function() {
  var inp = $('.form-control');
  if(inp.val()!==''&&!validator.isURL(inp.val(),{'require_protocol':true})){
    alert('提供的地址非法');
    return;
  }
  if(inp.val()===''){
    inp.val('http://ad.weibo.com');
  }
  requestURL({'url':inp.val()});
})
function requestURL ( sendData ) {
  $.ajax( {
    //url: 'http://127.0.0.1:15972/getPerformance:yslow',
    //url: 'http://127.0.0.1:1501/getPerformance/'+location.pathname.split(':')[1],//yslow or pupperteer
    url: 'http://127.0.0.1:1501/post/ppter',
    type: 'POST',
    data: sendData,
    dataType: 'json',
    beforeSend:function() {
      NProgress.start();
    },
    complete:function() {
      NProgress.done();
    },
    error:function() {
      //NProgress.done();
    },
    success: function( data ) {
      console.log( 'ok:', data );
      /////output( syntaxHighlight( JSON.stringify( data, null, 4 ) ) );
      outputJSONHandle(JSON.stringify( data, null, 4 ) );
    }

  } )
}

function outputJSONHandle(data){
  window.getJSONHandler=function() {
    return syntaxHighlight(data);
  }
  var iframe = document.getElementById('jsonHandle');
  if(!iframe){
    iframe = document.createElement( 'iframe' );
    iframe.id='jsonHandle';
  }
  iframe.onload = function() {
    iframe.contentWindow.onload=function(  ) {
      console.log('iframe:',iframe.contentWindow)
      //window.setJSONHandler();
    }
    $(iframe.contentWindow.document).ready(function() {
      setTimeout(function(args) {
        window.setJSONHandler();
      },0)
    })
  }
  iframe.src ='../json-handle/JSON-handle.html';
  $('.resultContainer')[0].appendChild( iframe );
}

function output ( inp ) {
  var preElement = document.createElement( 'pre' );
  preElement.className = 'language-json';
  preElement.style.height = '800px';
  preElement.setAttribute('data-line','10')
  $('.resultContainer')[0].appendChild( preElement ).innerHTML = inp;
}

function syntaxHighlight ( json ) {
  json = json.replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
  return json.replace( /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function( match ) {
    var cls = 'number';
    if (/^"/.test( match )) {
      if (/:$/.test( match )) {
        cls = 'key';
        if(String(match).replace(/"/g,'') === 'score:'){
          cls = 'key score'
        }
        match=String(match).replace(/^"y/,'"');
      } else {
        cls = 'string';
        match = decodeURIComponent(match);
      }
    } else if (/true|false/.test( match )) {
      cls = 'boolean';
    } else if (/null/.test( match )) {
      cls = 'null';
    }
    //return '<span class="' + cls + '">' + match + '</span>';
    return match ;
  } );
}