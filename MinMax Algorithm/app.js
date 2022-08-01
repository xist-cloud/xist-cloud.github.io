let crossTurn = true;
let winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const restart = document.querySelector("#restart");
const winMessage = document.querySelector(".win-message");

function startGame() {
    restart.addEventListener("click", () => {
        window.location.reload(true);
    });
    board.classList.add("circle");
    aiMove();
    cells.forEach((cell) => {
        cell.addEventListener("click", clickHandler, { once: true });
    });
}

startGame();

function clickHandler(e) {
    if (!e.target.classList.contains("circle") && !e.target.classList.contains("cross")) {
        e.target.classList.add("circle");
        checkWin("circle");
        if (!getStatus("circle")) {
            aiMove();
        }
        crossTurn = !crossTurn;
    }
}

function getStatus(currentTurn) {
    return winningStates.some((state) => {
        return state.every((index) => {
            return cells[index].classList.contains(currentTurn);
        });
    });
}

function checkWin(currentTurn) {
    if (getStatus(currentTurn)) {
        winMessage.innerHTML = `${currentTurn === "cross" ? "X" : "O"} Wins`;
        cells.forEach((cell) => {
            cell.removeEventListener("click", clickHandler);
        });
    } else if (checkDraw()) {
        winMessage.innerHTML = "Draw";
    }
}

function checkDraw() {
    let draw = true;
    cells.forEach((cell) => {
        if (!cell.classList.contains("cross") && !cell.classList.contains("circle")) {
            draw = false;
        }
    });
    return draw;
}

function aiMove() {
    let move = bestMove();
    move.classList.add("cross");
    checkWin("cross");
    crossTurn = !crossTurn;
}

function minMax(isMax) {
    /* Returns the best score given the state of the board */
    if (checkDraw()) {
        return 0;
    }
    if (getStatus("cross")) {
        return 1;
    }
    if (getStatus("circle")) {
        return -1;
    }

    let score;
    let bestScore;
    if (isMax) {
        bestScore = -1;
        cells.forEach((cell) => {
            if (!cell.classList.contains("cross") && !cell.classList.contains("circle")) {
                cell.classList.add("cross");
                score = minMax(false);
                cell.classList.remove("cross");
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        bestScore = 1;
        cells.forEach((cell) => {
            if (!cell.classList.contains("cross") && !cell.classList.contains("circle")) {
                cell.classList.add("circle");
                score = minMax(true);
                cell.classList.remove("circle");
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}

function bestMove() {
    let score;
    let bestScore;
    let move;
    bestScore = -1;
    cells.forEach((cell) => {
        if (!cell.classList.contains("cross") && !cell.classList.contains("circle")) {
            cell.classList.add("cross");
            score = minMax(false);
            cell.classList.remove("cross");
            if (score > bestScore) {
                bestScore = score;
                move = cell;
            }
        }
    });
    return move;
}
