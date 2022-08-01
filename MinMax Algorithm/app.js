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
const player = document.querySelector("#turn");
const winMessage = document.querySelector(".win-message");

function startGame() {
    restart.addEventListener("click", () => {
        window.location.reload(true);
    });
    board.classList.add("circle");
    aiMove();
    player.innerHTML = "<b>O</b>";
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
    }
}

function aiMove() {
    let available = [];
    let move;
    cells.forEach((cell) => {
        if (!cell.classList.contains("cross") && !cell.classList.contains("circle")) {
            available.push(cell);
        }
    });
    move = available[Math.floor(Math.random() * available.length)];
    move.classList.add("cross");
    checkWin("cross");
    crossTurn = !crossTurn;
}
