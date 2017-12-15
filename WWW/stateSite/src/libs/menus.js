/**
 * Created by ryan.zhu on 2017/12/12.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
$(document).ready(function() {
  var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false;
  trigger.click(function() {
    hamburger_cross();
  });
  function hamburger_cross() {
    if (isClosed == true) {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  }
  $('[data-toggle="offcanvas"]').click(function() {
    $('#wrapper').toggleClass('toggled');
  });
});