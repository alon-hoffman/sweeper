'use strict'

//to do:cellMarked(elCell) 
//to do:cellClicked(elCell, i, j)
//to do:expandShown(board, elCell,i, j)
//checkGameOver()
// change this expression gLvls[gIdx].totalCells ** 0.5
//Restart

const BOMB = "💣"
const FLAG = '🚩'

var timeInterval
var gGame = {
    isOn: true,
    shownCount: +0,
    markedCount: +0,
    secsPassed: +0
}
var gLvls = [
    { totalCells: 16, numberOfBombs: 2 },
    { totalCells: 64, numberOfBombs: 14 },
    { totalCells: 124, numberOfBombs: 42 }
]
var gIdx = 0
var gBoard

var bombsArray = []

function initGame() {
    document.querySelector('button').innerText = '😁'
    renderDummyBoard()
    //gBoard = buildBoard()
    //renderBoard(gBoard)
    //setMinesNegsCount(gBoard)
    gGame.seconds = 0
    //reverse count
    gGame.markedCount = gLvls[gIdx].numberOfBombs
    document.querySelector('.score').innerHTML = `🚩 ${gGame.markedCount}`

}


function gameOver() {
    //stop clock
    clearInterval(timeInterval)
    //show all bombs
    _revealBombs()
    //prevent further clicks
    gGame.isOn = false
    //make sad face
    document.querySelector('button').innerText = '😵'
}

function _revealBombs() {

    for (var i = 0; i < bombsArray.length; i++) {
        renderCell(bombsArray[i], BOMB)
    }
}

function restart() {
    bombsArray = []
    clearInterval(timeInterval)
    gGame.shownCount = 0
    initGame()
}


