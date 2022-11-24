'use strict'

//? DONE: Variables:

//* Smiley mode
const HAPPYFACE = '😋'
const SADFACE = '🥹'
const WINFACE = '😎'
//* Lives
const LIVE = '💖'
const DEAD = '☠️'
const HINT =
  '<span onclick="onHints()" style="cursor: not-allowed" title="Not ready Yet!">💡</span>'
const MOON = '🌛'
const SUN = '🌞'

//* This is an object by which the board size is set (in this case: 4x4 board and how many mines to put)
/* gLevel = { SIZE: 4, MINES: 2 }; */
var gLevel = {
  Level: 'Easy',
  Size: 4,
  Mines: 2,
  Lives: 1,
} // Default value
var gBestScore = []
var gisScoreShown = false

//* This is an object in which you can keep and update the current game state:
// isOn: Boolean, when true we let the user play
// shownCount: How many cells are shown
// markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed
/* gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 } */
var gGame

//? DONE: This is called when page loads
function checkBrowser() {
  console.log('Page Loaded')
  //* First lets check if the user can use Web Storage
  checkWebStorage()
  //* Now, let's initialize the game!
  initGame()
}

//? DONE: Initialize the game
function initGame() {
  // Hide the scrollbar (just because I don't like it)
  hideScrollbar()
  // Because of CSS problem, I decided to use the Zoom out (CTRL+-) from the page of the user
  document.body.style.zoom = '90%'
  const elFace = document.querySelector('.face')
  elFace.innerText = HAPPYFACE
  // Stopping all the intervals
  stopIntervals()
  // initializing variables:
  gBoard = []
  buildBoard()
  renderBoard(gBoard, '.board-table')
  updateMarkedCount(gLevel.Mines)
  updateShownCount(0)
  updateLives(gLevel.Lives)
  updateHints(gGame.hints)
  storeBestScore()
}

//? DONE: Add support for “LIVES”
function updateLives(livesNmb = 1) {
  const elLives = document.querySelector('.lives')
  elLives.innerText = ''
  if (livesNmb === 0 || isNaN(gLevel.Lives)) {
    elLives.innerText = DEAD
    return
  }
  for (var i = 0; i < livesNmb; i++) {
    elLives.innerText += LIVE
  }
}

//? DONE: Add support for “HINTS”
function updateHints(hintsNmb = 3) {
  const elHints = document.querySelector('.hints')
  elHints.innerHTML = ''
  for (var i = 0; i < hintsNmb; i++) {
    elHints.innerHTML += HINT
  }
}

//? DONE: Set the difficulty the user chooses
function setDifficulty(size = 4, minesNb = 2, lives = 1, diffStr) {
  if (!diffStr) diffStr = 'Easy'
  gLevel = {
    Level: diffStr,
    Size: size,
    Mines: minesNb,
    Lives: lives,
  }
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

//* TODO: add Hints to the game
function onHints() {
  console.log('hello')
}

//? Check if the game is over and if it's victory
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
    playAudio('victory')
    gGame.isWinning = true
    //? DONE: Because of this function, the face change back to SAD
    gameIsOver()
  }
}

//? End the game
function gameIsOver() {
  gGame.isOn = false
  gGame.isStarted = false
  revealMines(gBoard)
  stopIntervals()
  storeBestScore()
  const elFace = document.querySelector('.face')
  elFace.innerText = gGame.isWinning ? WINFACE : SADFACE
}

//? DONE: Implement Dark-Mode for the game
function toggleDarkMode() {
  const elBody = document.querySelector('body')
  var isDark = elBody.classList.toggle('dark-mode')
  const elDarkButton = document.querySelector('.dark-mode-button')
  if (isDark) {
    elDarkButton.innerText = SUN
  } else {
    elDarkButton.innerText = MOON
  }
}

//? DONE: Keep the best score in local storage (per level)
function storeBestScore() {
  //* Check if the user Win
  if (!gGame.isOn && gGame.isWinning) {
    // console.log(gGame.secsPassed)
    //   console.log(gLevel.Level)
    var timeScore = +gGame.secsPassed
    var levelScore = gLevel.Level

    localStorage.setItem('Score', timeScore)
    localStorage.setItem('Level', levelScore)

    const localScore = +localStorage.getItem('Score')
    const localLevel = localStorage.getItem('Level')
    console.log('Score:', localScore, '\nLevel:', localLevel)

    const user = { Level: localLevel, Score: localScore }
    console.log(user)
    //! KNOWN ISSUE: Work only without reloading the page (so it's not working..)
    gBestScore.push(user)
  }
  //* Render the score
  renderScore()
}

//? DONE: Show the score panel with scores rendered
function showScore() {
  const elTable = document.querySelector('.board-table')
  const elPannel = document.querySelectorAll('.pannel')
  const elDiffBtn = document.querySelectorAll('.difficulty')
  if (!gisScoreShown) {
    //* Show Score Panel with rendered scores
    renderScore()
    for (var i = 0; i < elPannel.length; i++) {
      const currentPannel = elPannel[i]
      currentPannel.classList.add('hide')
    }
    elTable.classList.add('hide')
    // Disable the difficulty buttons
    for (var i = 0; i < elDiffBtn.length; i++) {
      const currentBtn = elDiffBtn[i]
      currentBtn.disabled = true
      currentBtn.style.cursor = 'not-allowed'
    }
    gisScoreShown = true
  } else {
    //* Hide Score Panel
    for (var i = 0; i < elPannel.length; i++) {
      const currentPannel = elPannel[i]
      currentPannel.classList.remove('hide')
    }
    elTable.classList.remove('hide')
    // Enable the difficulty buttons
    for (var i = 0; i < elDiffBtn.length; i++) {
      const currentBtn = elDiffBtn[i]
      currentBtn.disabled = false
      currentBtn.style.cursor = 'pointer'
    }
    gisScoreShown = false
  }
}

//? DONE: Render the scores in the index HTML
function renderScore() {
  if (!gBestScore) return
  var strHTML = ''

  for (let i = 0; i < gBestScore.length; i++) {
    const currentLevel = gBestScore[i].Level
    const currentScore = gBestScore[i].Score
    var randomColor = getRandomColor()
    strHTML += `<tr>
      <td class="score" style="color:${randomColor}">${currentLevel}</td>
      <td class="score" style="color:${randomColor}">${currentScore} seconds</td>
    </tr>`
  }

  const elRenderScore = document.querySelector('.render-score')
  elRenderScore.innerHTML = strHTML
}

//? DONE: Hide the scroll bar (because I don't like it)
function hideScrollbar() {
  var style = document.createElement('style')
  style.innerHTML = `body::-webkit-scrollbar {display: none;}`
  document.head.appendChild(style)
}
