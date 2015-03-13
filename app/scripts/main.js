/*global WOW */
'use strict';

var wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 0
});
wow.init();

// set the date we're counting down to
var targetDate = new Date('Jul 4, 2015').getTime();

// variables for time units
var days, hours, minutes, seconds;

// get tag element
var countdown = document.getElementById('countdown');

// update the tag with id 'countdown' every 1 second
setInterval(function () {

    // find the amount of 'seconds' between now and target
    var currentDate = new Date().getTime();
    var secondsLeft = (targetDate - currentDate) / 1000;

    // do some time calculations
    days = parseInt(secondsLeft / 86400);
    secondsLeft = secondsLeft % 86400;

    hours = parseInt(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;

    minutes = parseInt(secondsLeft / 60);
    seconds = parseInt(secondsLeft % 60);

    // format countdown string + set tag value
    countdown.innerHTML = days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds';
	}, 1000);
