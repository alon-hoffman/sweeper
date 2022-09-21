'use strict'


function firstClick(event, cell, i, j) {
    gGame.isOn = true
    gBoard = buildBoard(i, j);
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
    clicked(event, cell, i, j)
    timeInterval = setInterval(countUp, 1000)
}


function clicked(event, elCell, i, j) {
    if (!gGame.isOn) return
    if (event.which === 1) {
        console.log("ev", event.which);
        const currentCell = gBoard[i][j]
        if (currentCell.isBomb) {
            gameOver()
            return
        }
        showValue({ i, j })
        if (!currentCell.minesAroundCount) {
            recursionReveal({ i, j })
        }
    }
    else markCell(elCell, i, j)
}


function recursionReveal(location) {
    if (gBoard[location.i][location.j].isBomb) return
    showValue(location)
    for (var i = location.i - 1; i <= location.i + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = location.i - 1; j <= location.j + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (gBoard[i][j].isShown) continue
            recursionReveal({ i, j })
        }
    }
}

function markCell(elCell, i, j) {
    console.log(elCell);
    if (gBoard[i][j].isMarked) {
        gGame.markedCount++;
        document.querySelector('.score').innerHTML = `🚩 ${gGame.markedCount}`
        renderCell({ i, j }, '')
        return
    }
    if (gGame.markedCount === 0) return
    gBoard[i][j].isMarked = true
    renderCell({ i, j }, FLAG)
    gGame.markedCount--;
    document.querySelector('.score').innerHTML = `🚩 ${gGame.markedCount}`

}

function showValue(location) {
    gBoard[location.i][location.j].isShown = true
    renderCell(location, gBoard[location.i][location.j].minesAroundCount)
    gGame.shownCount++
    console.log(gGame.shownCount);
}


