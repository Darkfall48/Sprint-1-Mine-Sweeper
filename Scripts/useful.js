'use strict'

//? Create and return a sized matrix
function createMat(ROWS, COLS) {
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

//? Copy an existing matrix and return the copy
function copyMat(mat) {
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}

//? Render the board in the index HTML
function renderBoard(mat, selector) {
  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = `cell cell-${i}-${j}`

      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

//? Render the cell in the index
function renderCell(location, value) {
  //* location should be an object like this: { i: 2, j: 7 }
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}

//? Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

//? Shuffle the board inserted
function shuffleBoard(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const k = Math.floor(Math.random() * (i + 1))
      const l = Math.floor(Math.random() * (j + 1))
      var tmp = board[i][j]
      board[i][j] = board[k][l]
      board[k][l] = tmp
    }
  }
}

//? Return an array with all the empty locations in the board
function findEmpty(board) {
  var empties = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const currCellContent = board[i][j]
      if (currCellContent === '' || currCellContent === null) {
        empties.push([{ i, j }])
      }
    }
  }
  return empties
}

//? Count how many neighbors nears the player and return the value
function countNeighbors(mat, cellI, cellJ, valueToCount) {
  var neighborsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    // If on border, continue
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      // Do not count the player position (center)
      if (i === cellI && j === cellJ) continue
      // If on border, continue
      if (j < 0 || j >= mat[i].length) continue
      //* If needed, insert more neighbors to count here:
      if (mat[i][j] === valueToCount) neighborsCount++
    }
  }
  return neighborsCount
}

//? Move the player by keyboard arrows
function onHandleKey(event) {
  //* Should create and render a board before using this function
  const i = gGamerPos.i
  const j = gGamerPos.j
  console.log('event.key:', event.key)

  switch (event.key) {
    case 'ArrowLeft':
      moveTo(i, j - 1)
      break
    case 'ArrowRight':
      moveTo(i, j + 1)
      break
    case 'ArrowUp':
      moveTo(i - 1, j)
      break
    case 'ArrowDown':
      moveTo(i + 1, j)
      break
  }
}

//? Create and audio element in the index
function createAudio(audioFile) {
  //* Create the audio file
  var strHTML = `<audio class="${audioFile}" src="Sound/${audioFile}.mp3"></audio>`
  const elAudio = document.querySelector('.audio')
  elAudio.innerHTML = strHTML
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

//? Return a random integer
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
  //* The maximum is inclusive and the minimum is inclusive
}

//? Return a random color
function getRandomColor() {
  var randomColor =
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()
  return randomColor
}

//? Print the Unit Testing
function printUnitTesting(input, expected, actual) {
  var green = '\x1b[32m'
  console.log('----------------------------')
  console.log('INPUT: ' + green + input)
  console.log('\nEXPECTED: ' + green + expected)
  console.log('\nACTUAL: ' + green + actual)
  console.log('----------------------------')
}

//? Check if the matrix is a matrix square
function checkIfMagicSquare(mat) {
  if (mat.length === mat[0].length) {
    // For a matrix to be a Magic Square, it must meet the following conditions:
    // It must be a square.
    // The sums of the rows, columns, and the two diagonals should all be equal.
    var sumR = sumRows(mat)
    var sumC = sumCols(mat)
    var sumMainD = sumMainDiagonal(mat)
    var sumSecD = sumSecondDiagonal(mat)
    var sumTotal = sumR + sumC + sumMainD + sumSecD
    if (sumTotal / 4 === sumR) return true
  }
  return false
}

//? Check if the matrix is symmetric
function checkIfSymmetric(mat) {
  // A matrix that passes this boolean condition:
  // mat[i][j] === mat[j][i]
  // is a symmetric matrix
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat.length; j++) {
      if (mat[i][j] != mat[j][i]) return false
    }
  }
  return true
}

//? Return the sum of the main diagonal of the matrix
function sumMainDiagonal(mat) {
  var sum = 0
  for (let i = 0; i < mat.length; i++) {
    const element = mat[i][i]
    sum += element
  }
  return sum
}

//? Return the sum of the second diagonal of the matrix
function sumSecondDiagonal(mat) {
  var sum = 0
  for (let i = 0; i < mat.length; i++) {
    const element = mat[i][mat.length - 1 - i]
    sum += element
  }
  return sum
}

//? Return the sum of the colons of the matrix
function sumCols(mat) {
  var sum = 0
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat.length; j++) {
      const element = mat[j][i]
      sum += element
    }
  }
  return sum / mat.length
}

//? Return the sum of the rows diagonal of the matrix
function sumRows(mat) {
  var sum = 0
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat.length; j++) {
      const element = mat[i][j]
      sum += element
    }
  }
  return sum / mat.length
}
