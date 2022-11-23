'use strict'

// TODO: Variables:

//* The model
/* gBoard – A Matrix containing cell objects:
Each cell: { minesAroundCount: 4, isShown: false, isMine: false, isMarked: true } */
var gBoard
var gNextMineIdx = 0

//* This is an object by which the board size is set (in this case: 4x4 board and how many mines to put)
/* gLevel = { SIZE: 4, MINES: 2 }; */

//* This is an object in which you can keep and update the current game state:
// isOn: Boolean, when true we let the user play
// shownCount: How many cells are shown
// markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed
/* gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 } */

//? DONE: This is called when page loads
function initGame() {
  // initializing variables:
  gBoard = []
  console.log('Page Loaded')
  buildBoard()
}

function buildBoard() {
  //? DONE: Builds the board
  gBoard = createBoard(4) // TODO: Change '4' to difficulties
  // TODO: Set mines manually on the board
  gBoard[1][2] = createMine()
  gBoard[2][3] = createMine()

  // TODO: Set mines at random locations
  // TODO: Call setMinesNegsCount()
  // TODO: Return the created board
}

function createBoard(boardSize) {
  var board = []
  for (var i = 0; i < boardSize; i++) {
    board[i] = []
    for (var j = 0; j < boardSize; j++) {
      board[i][j] = ''
    }
  }
  return board
}

function createMine() {
  var mine = {
    idx: gNextMineIdx++,
    isShown: false,
  }
  return mine
}

function setMinesNegsCount(board) {
  // TODO: Count mines around each cell
  // TODO: Set the cell's minesAroundCount.
}

function renderBoard(board) {
  // TODO: Render the board as a <table> to the page
}

function cellClicked(elCell, i, j) {
  // TODO: Called when a cell (td) is clicked
}

function cellMarked(elCell) {
  // TODO: Called on right click to mark a cell (suspected to be a mine)
  // TODO: Search the web (and implement) how to hide the context menu on right click
}

function checkGameOver() {
  // TODO: Game ends when all mines are marked, and all the other cells are shown
}

function expandShown(board, elCell, i, j) {
  // TODO: When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
  // ? NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
  // ? BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
}
