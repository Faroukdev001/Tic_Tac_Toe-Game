const tiles = document.querySelectorAll(".tile");
const PLAYER_X = 'X';
const PLAYER_O = "O";
let turn = PLAYER_X;
let playerXScore = 0;
let playerOScore = 0;
let totalRounds = 0;
let playerXRoundWins = 0;
let playerORoundWins = 0;


const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

const scoreboard = document.getElementById("scoreboard");
const playerXScoreElement = document.getElementById("player-x-score");
const playerOScoreElement = document.getElementById("player-o-score");

//Sounds
const gameOverSound = new Audio("sounds/game_over.wav");
const clickSound = new Audio("sounds/click.wav");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));
// tiles.forEach((tile) => tile.addEventListener("touchstart", tileClick));

function setHoverText() {
    // remove all hover text
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach(tile => {
        if(tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    });
}

setHoverText();

function tileClick(event) {
    if (gameOverArea.classList.contains('visible')) {
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText != "") {
        return
    }

    if (turn === PLAYER_X) {
        tile.innerText = PLAYER_X;
        boardState[tileNumber - 1] = PLAYER_X;
        turn = PLAYER_O;
    }
    else {
        tile.innerText = PLAYER_O;
        boardState[tileNumber - 1] = PLAYER_O;
        turn = PLAYER_X;
    }

    clickSound.play();
    setHoverText();
    checkWinner();
}

function checkWinner() {
    // Check for a winner
    for(const winnnigCombination of winnnigCombinations) {
        // Object Destructuring
        const { combo, strikeClass } = winnnigCombination;
        const tileValue1 = boardState[combo[0] - 1]
        const tileValue2 = boardState[combo[1] - 1]
        const tileValue3 = boardState[combo[2] - 1]

        if(tileValue1 != null && tileValue1 ===  tileValue2 && tileValue1 === tileValue3) {
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }
    
    // check for draw
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if (allTileFilledIn) {
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText) {
    let text = 'Draw!';
    if(winnerText != null) {
        text = `Winner is ${winnerText}!`;
        updateScore(winnerText);
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
    gameOverSound.play();
}

function updateScore(winner) {
    if (winner === PLAYER_X) {
        playerXScore++;
    } else if (winner === PLAYER_O) {
        playerOScore++;
    }
    updateScoreboard();
}

function updateScoreboard() {
    playerXScoreElement.textContent = `Player X: ${playerXScore}`;
    playerOScoreElement.textContent = `Player O: ${playerOScore}`;
}

function startNewGame() {
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = PLAYER_X;
    setHoverText();

    totalRounds++;
    if (totalRounds > 0 && totalRounds % 5 === 0) {
        determineOverallWinner();
    }
}



function determineOverallWinner() {
    if (playerXScore > playerOScore) {
        overallWinner = PLAYER_X;
    } else if (playerOScore > playerXScore) {
        overallWinner = PLAYER_O;
    } else {
        overallWinner = null; // Draw
    }

    showOverallWinner();
}

const overallWinnerElement = document.getElementById("overall-winner");

function showOverallWinner() {
    if (overallWinner !== null) {
        const text = `Overall Winner is ${overallWinner}!`;
        overallWinnerElement.textContent = text;
        overallWinnerElement.classList.remove("hidden");
        gameOverArea.className = "visible";
        gameOverText.innerText = text;
        gameOverSound.play();
        resetScores();
    } else {
        resetScores();
    }
}

function resetScores() {
    totalRounds = 0;
    playerXScore = 0;
    playerOScore = 0;
    updateScoreboard();
}


const winnnigCombinations = [
    //rows
    {combo: [1,2,3], strikeClass: "strike-row-1"},
    {combo: [4,5,6], strikeClass: "strike-row-2"},
    {combo: [7,8,9], strikeClass: "strike-row-3"},

    //columns
    {combo: [1,4,7], strikeClass: "strike-column-1"},
    {combo: [2,5,8], strikeClass: "strike-column-2"},
    {combo: [3,6,9], strikeClass: "strike-column-3"},

    //diagonals
    {combo: [1,5,9], strikeClass: "strike-diagonal-1"},
    {combo: [3,5,7], strikeClass: "strike-diagonal-2"},
]