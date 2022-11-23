'use strict'

var gStartTime
var gTimeInterval

//? Stop the intervals
function stopIntervals() {
  //? DONE: Stop Time
  clearInterval(gTimeInterval)
  resetTime()
}

//? Create a timer
function startTimer() {
  gStartTime = Date.now()
  gTimeInterval = setInterval(() => {
    const seconds = (Date.now() - gStartTime) / 1000
    var elTime = document.querySelector('.time')
    elTime.innerText = seconds.toFixed(2)
    gGame.secsPassed = seconds.toFixed(2)
  }, 1)
}

//? Reset the timer
function resetTime() {
  var elTime = document.querySelector('.time')
  elTime.innerText = '0'
}

//? Play the audio file once created
function playAudio(audioFile) {
  //* Use createAudio() before using this function
  //* Make the audio file playable
  audioFile = '.' + audioFile
  var elAudioFile = document.querySelector(audioFile)
  elAudioFile.play()
}

//? Return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
  //*The maximum is exclusive and the minimum is inclusive
}
