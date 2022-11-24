'use strict'

// TODO: Variables:

//* Smiley mode
const HAPPYFACE = '😋'
const SADFACE = '🥹'
const WINFACE = '😎'

//* This is an object by which the board size is set (in this case: 4x4 board and how many mines to put)
/* gLevel = { SIZE: 4, MINES: 2 }; */
var gLevel = { Size: 4, Mines: 2 } // Default value

//* This is an object in which you can keep and update the current game state:
// isOn: Boolean, when true we let the user play
// shownCount: How many cells are shown
// markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed
/* gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 } */
var gGame

//? DONE: This is called when page loads
function initGame() {
  const elFace = document.querySelector('.face')
  elFace.innerText = HAPPYFACE
  // Stopping all the intervals
  stopIntervals()
  // initializing variables:
  gBoard = []
  console.log('Page Loaded')
  buildBoard()
  renderBoard(gBoard, '.board-table')
  updateMarkedCount(gLevel.Mines)
  updateShownCount(0)
}

function setDifficulty(size = 4, minesNb = 2) {
  gLevel = { Size: size, Mines: minesNb }
  initGame()
}

//? DONE: Update the marked count value
function updateMarkedCount(value) {
  // The model
  gGame.markedCount += +value
  // The DOM
  const elMarked = document.querySelector('.marked')
  elMarked.style.color = 'blue'
  elMarked.innerText = gGame.markedCount

  checkGameOver()
}

//? DONE: Update the shown count value
function updateShownCount(value) {
  // The model
  gGame.showCount += +value
  // The DOM
  const elShown = document.querySelector('.shown')
  elShown.style.color = 'green'
  elShown.innerText = gGame.showCount

  checkGameOver()
}

function checkGameOver() {
  //? DONE: Game ends when all mines are marked
  //? DONE: and all the other cells are shown
  var emptyCount = gLevel.Size * gLevel.Size - gLevel.Mines
  //   console.log(emptyCount)
  if (
    +gGame.goodFlaggedCount === +gLevel.Mines ||
    +gGame.showCount === +emptyCount
  ) {
    console.log('You Win!!!')
    gGame.isWinning = true
    //? DONE: Because of this function, the face change back to SAD
    gameIsOver()
  }
}
function gameIsOver() {
  gGame.isOn = false
  gGame.isStarted = false
  revealMines(gBoard)
  stopIntervals()
  const elFace = document.querySelector('.face')
  elFace.innerText = gGame.isWinning ? WINFACE : SADFACE
}
