'use strict'

var gStartTime
var gTimeInterval

//? DONE: Stop the intervals
function stopIntervals() {
  //? DONE: Stop Time
  clearInterval(gTimeInterval)
  resetTime()
}

//? DONE: Create a timer
function startTimer() {
  gStartTime = Date.now()
  gTimeInterval = setInterval(() => {
    const seconds = (Date.now() - gStartTime) / 1000
    var elTime = document.querySelector('.time')
    elTime.innerText = seconds.toFixed(2)
    gGame.secsPassed = seconds.toFixed(2)
  }, 1)
}

//? DONE: Reset the timer
function resetTime() {
  var elTime = document.querySelector('.time')
  elTime.innerText = '0'
}

//? DONE: Play the audio file once created
function playAudio(audioFile) {
  //* Use createAudio() before using this function
  //* Make the audio file playable
  audioFile = '.' + audioFile
  var elAudioFile = document.querySelector(audioFile)
  elAudioFile.play()
}

//? DONE: Return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
  //*The maximum is exclusive and the minimum is inclusive
}

//? DONE: Return a random color
function getRandomColor() {
  var randomColor =
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()
  return randomColor
}

//? DONE: Check if the user can use Web Storage
function checkWebStorage() {
  if (typeof Storage === 'undefined') {
    console.log('Sorry, your browser does not support Web Storage')
    return
  } else {
    console.log("Your browser support Web Storage, that's cool!")
  }
}
