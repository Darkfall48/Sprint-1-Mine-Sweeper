'use strict'

// TODO: Variables:

//* The model
/* gBoard – A Matrix containing cell objects:
Each cell: { minesAroundCount: 4, isShown: false, isMine: false, isMarked: true } */
var gBoard
var gNextMineIdx = 0
var gIsMinesOnBoard
const EMPTY = '///'
// const MINE = '☠️'
//? DONE: Mines look like mines.
const MINE = '<img src="Img/mine.png" height="32px" alt="mine">'
const FLAG = '🚩'
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

var gStartTime
var gTimeInterval

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
}

function setDifficulty(size = 4, minesNb = 2) {
  gLevel = { Size: size, Mines: minesNb }
  initGame()
}

function buildBoard() {
  //? DONE: Builds the board
  gGame = {
    isOn: false,
    isStarted: true,
    showCount: 0,
    markedCount: 0,
    goodFlaggedCount: 0,
    secsPassed: 0,
  }
  gIsMinesOnBoard = false
  gBoard = createBoard(gLevel.Size) //? DONE: Change '4' to difficulties
  //? DONE: Set mines manually on the board
  //   gBoard[1][2] = createMine()
  //   gBoard[2][3] = createMine()

  //? TODO DONE: Call setMinesNegsCount()
  //* Already used in @cellClicked()
  //   setMinesNegsCount(gBoard)

  // TODO: Return the created board
  //* I don't need it
}

function setRandomMines() {
  //? DONE: Set mines at random locations
  //! Bug known, random I and J can get the same position more than once, resulting having less mines than expected
  for (var i = 0; i < gLevel.Mines; i++) {
    var randomIdxI = getRandomInt(0, gBoard.length)
    var randomIdxJ = getRandomInt(0, gBoard[0].length)
    gBoard[randomIdxI][randomIdxJ] = createMine()
  }
}

function createBoard(boardSize) {
  var board = []
  for (var i = 0; i < boardSize; i++) {
    board[i] = []
    for (var j = 0; j < boardSize; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMarked: false,
        isMine: false,
      }
    }
  }
  return board
}

function createMine() {
  var mine = {
    idx: gNextMineIdx++,
    isShown: false,
    isMine: true,
  }
  return mine
}

function setMinesNegsCount(board) {
  var negsCount = 0
  //? DONE: Count mines around each cell
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      //?DONE: Only if is shown and not isMine
      if (board[i][j].isShown && !board[i][j].isMine) {
        var negsCount = countNeighbors(board, i, j)
        //? DONE: Set the cell's minesAroundCount.
        board[i][j].minesAroundCount = negsCount
        //? DONE: Render the cell
        renderCell({ i, j }, negsCount)
      }
    }
  }
  //? DONE: Have a console log to help with the debug
  console.log(board)
}

//? Count how many mines nears the cell and return the value
function countNeighbors(board, cellI, cellJ) {
  var neighborsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    // If on border, continue
    if (i < 0 || i >= board.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      // Do not count the player position (center)
      if (i === cellI && j === cellJ) continue
      // If on border, continue
      if (j < 0 || j >= board[i].length) continue
      //* If needed, insert more neighbors to count here:
      if (board[i][j].isMine) neighborsCount++
    }
  }
  return neighborsCount
}

//? Render the cell in the index HTML
function renderCell(location, value) {
  //* location should be an object like this: { i: 2, j: 7 }
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  switch (value) {
    case 0:
      value = ' ' //? DONE: Change to space/tab
      break
    case 1:
      elCell.style.color = 'blue'
      break
    case 2:
      elCell.style.color = 'green'
      break
    case 3:
      elCell.style.color = 'red'
      break
    case 4:
      elCell.style.color = 'purple'
      break
    default:
      elCell.style.color = 'yellow'
      break
  }
  elCell.innerHTML = value
}

//? Render the board in the index HTML
function renderBoard(board, selector) {
  //? DONE: Render the board as a <table> to the page
  var strHTML = '<table class="board" border="1" cellpadding="auto";><tbody>'
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      var currentCell = board[i][j]

      // Check if current cell is a mine and if he is supposed to be shown
      if (currentCell.isShown && currentCell.isMine) {
        currentCell = MINE
      } else {
        currentCell = EMPTY
      }

      const className = `cell cell-${i}-${j}`
      strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})">${currentCell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elTable = document.querySelector(selector)
  elTable.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
  //? DONE: Called when a cell (td) is clicked
  //   console.log('elCell:', elCell)
  //   console.log('i:', i)
  //   console.log('j:', j)

  //? DONE: User can click only if the game is ON and if the cell is not shown
  //* Prevent future bugs
  if (gBoard[i][j].isShown) return
  //? DONE: Prevent the user to reveal a flagged cell
  if (gBoard[i][j].isMarked) return
  if (!gGame.isOn && gGame.isStarted) {
    gGame.isOn = true
    startTimer()
    return
  } else if (!gGame.isOn && !gGame.isStarted) {
    return
  }

  //? DONE: BONUS: Place the mines and count the neighbors only on first click.
  if (!gIsMinesOnBoard) {
    setRandomMines()
    gIsMinesOnBoard = true
  }

  // TODO: BONUS: When an empty cell is clicked, open all empty cells that are connected and their numbered neighbors

  //* Update the model
  gBoard[i][j].isShown = true
  //   console.log(gBoard[i][j])

  //* Update the DOM
  if (gBoard[i][j].isMine) {
    renderCell({ i, j }, MINE)
    //? DONE: Game Over!
    gameIsOver()
  } else {
    //* DONE: Count neighbors
    setMinesNegsCount(gBoard)
    // console.log(gBoard[i][j].minesAroundCount)
    renderCell({ i, j }, gBoard[i][j].minesAroundCount)
    //? DONE: Count how many cells are shown
    updateShownCount('1')
    console.log('Show count:', gGame.showCount)
  }
}

function cellMarked(elCell, cellI, cellJ) {
  //? DONE: Search the web (and implement) how to hide the context menu on right click
  //? DONE: User can click only if the game is ON and if the cell is not shown
  //* Prevent future bugs
  if (!gGame.isOn && gGame.isStarted) {
    gGame.isOn = true
    startTimer()
    return
  } else if (!gGame.isOn && !gGame.isStarted) {
    return
  }
  if (gBoard[cellI][cellJ].isShown) return
  //   console.log("It's right!")
  //   console.log(elCell)
  //? DONE: Called on right click to mark a cell (suspected to be a mine)
  // When the cell is unmarked:
  if (!gBoard[cellI][cellJ].isMarked) {
    //? Done: Check if a good mine is flagged
    if (gBoard[cellI][cellJ].isMine) {
      gGame.goodFlaggedCount++
      checkGameOver()
      console.log('Good flagged mine count:', gGame.goodFlaggedCount)
    }
    elCell.innerHTML = FLAG
    gBoard[cellI][cellJ].isMarked = true
    // console.log('This cell is marked')
    updateMarkedCount('+1')
    // console.log('Marked count:', gGame.markedCount)
  } else {
    //? Done: Check if a good mine is unFlagged
    if (gBoard[cellI][cellJ].isMine) {
      gGame.goodFlaggedCount--
      checkGameOver()
      console.log('Good flagged mine count:', gGame.goodFlaggedCount)
    }
    //When the cell is already marked
    elCell.innerHTML = EMPTY
    gBoard[cellI][cellJ].isMarked = false
    // console.log('This cell is unmarked')
    updateMarkedCount('-1')
    // console.log('Marked count:', gGame.markedCount)
  }
}

//? DONE: Update the marked count value
function updateMarkedCount(value) {
  // The model
  gGame.markedCount += +value
  // The DOM
  const elMarked = document.querySelector('.marked')
  elMarked.style.color = 'blue'
  elMarked.innerText = gGame.markedCount
}

//? DONE: Update the shown count value
function updateShownCount(value) {
  // The model
  gGame.showCount += +value
  // The DOM
  const elShown = document.querySelector('.shown')
  elShown.style.color = 'green'
  elShown.innerText = gGame.showCount
}

function checkGameOver() {
  //? DONE: Game ends when all mines are marked
  if (+gGame.goodFlaggedCount === +gLevel.Mines) {
    console.log('You Win!!!')
    const elFace = document.querySelector('.face')
    elFace.innerText = WINFACE
    gameIsOver()
  }
  //? DONE: and all the other cells are shown
  var emptyCount = gLevel.Size * gLevel.Size - gLevel.Mines
  if (gGame.showCount === emptyCount) {
    console.log('You Win!!!')
    const elFace = document.querySelector('.face')
    elFace.innerText = WINFACE
    gameIsOver()
  }
}
function gameIsOver() {
  gGame.isOn = false
  gGame.isStarted = false
  revealMines(gBoard)
  stopIntervals()
  const elFace = document.querySelector('.face')
  elFace.innerText = SADFACE
}

//? DONE: Reveal all mines
function revealMines(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].isMine) {
        board[i][j].isShown = true
        renderCell({ i, j }, MINE)
      }
    }
  }
  console.log('Mines revealed')
}

function expandShown(board, elCell, i, j) {
  // TODO: When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
  // ? NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
  // ? BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
}

function stopIntervals() {
  //? DONE: Stop Time
  clearInterval(gTimeInterval)
  resetTime()
}

//? Return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
  //*The maximum is exclusive and the minimum is inclusive
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
