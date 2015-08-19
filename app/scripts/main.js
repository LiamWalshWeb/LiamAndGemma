/*global WOW, $, Konami */
'use strict';

// set the date we're counting down to
var targetDate = new Date('Jul 4, 2015').getTime();

// variables for time units
var days, hours, minutes, seconds;

// get tag element
var marriageTimer = document.getElementById('marriage-timer');

// update the tag with id 'marriage-timer' every 1 second
setInterval(function () {

    // find the amount of 'seconds' between now and target
    var currentDate = new Date().getTime();
    var secondsLeft = (currentDate - targetDate) / 1000;

    // do some time calculations
    days = parseInt(secondsLeft / 86400);
    secondsLeft = secondsLeft % 86400;

    hours = parseInt(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;

    minutes = parseInt(secondsLeft / 60);
    seconds = parseInt(secondsLeft % 60);

    // format countdown string + set tag value
    marriageTimer.innerHTML = days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds';
	}, 1000);

$(document).ready(function() {
  var cssTarget = $('.css-target-toggle');

  cssTarget.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var target = $(this).attr('href');
    $(target).toggleClass('is-targeted');
    $(this).toggleClass('target-activated');
  });

  var scrollTo = $('.scroll-to');

  scrollTo.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('.is-targeted').removeClass('is-targeted');
    $('.target-activated').removeClass('target-activated');

    var target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1000);
  });

  var easterEgg = new Konami();
  var $konamiCode = $('.konami-code');

  easterEgg.code = function() {
    $.magnificPopup.open({
      items: {
        src: $konamiCode
      },
      type: 'inline'
    });
  };

  easterEgg.load();

  $('.magnific-gallery-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled:true
    }
  });
});

$(window).on('load', function() {
  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0
  });
  wow.init();
});
