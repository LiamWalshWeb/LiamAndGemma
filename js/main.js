'use strict';

// Set the date we're counting down to
var targetDate = new Date('March 29, 2018').getTime();

// Variables for time units
var days, hours, minutes, seconds;

// Get tag element
var babyTimer = document.getElementById('baby-timer');

// Update the tag with id 'marriage-timer' every 1 second
setInterval(function () {

  // Find the amount of 'seconds' between now and target
  var currentDate = new Date().getTime();
  var secondsLeft = (targetDate - currentDate) / 1000;

  // Do some time calculations
  days = parseInt(secondsLeft / 86400);
  secondsLeft = secondsLeft % 86400;

  hours = parseInt(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  minutes = parseInt(secondsLeft / 60);
  seconds = parseInt(secondsLeft % 60);

  // Format countdown string + set tag value
  babyTimer.innerHTML = days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds';

}, 1000);



// Loaded...
var dawn = new Audio('audio/dawn.mp3');
document.documentElement.className += ' is-time';
dawn.play();
