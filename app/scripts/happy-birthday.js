/*global WOW, $ */
'use strict';

$(document).ready(function() {
  var cssTarget = $('.open-card, .close-card');

  cssTarget.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var target = $(this).attr('href');
    $(target).toggleClass('is-open');
  });
});

console.log(WOW);
