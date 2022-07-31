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
const turn = document.querySelector("#turn");
const winMessage = document.querySelector(".win-message");

function startGame() {
    restart.addEventListener("click", () => {
        window.location.reload(true);
    });
    cells.forEach((cell) => {
        cell.addEventListener("click", clickHandler, { once: true });
    });
    changeHoverState();
}

startGame();

function clickHandler(e) {
    if (crossTurn) {
        e.target.classList.add("cross");
    } else {
        e.target.classList.add("circle");
    }
    crossTurn ? checkWin("cross") : checkWin("circle");
    crossTurn = !crossTurn;
    changeHoverState();
}

function changeHoverState() {
    board.classList.remove("cross");
    board.classList.remove("circle");
    if (crossTurn) {
        turn.innerHTML = "X";
        board.classList.add("cross");
    } else {
        turn.innerHTML = "O";
        board.classList.add("circle");
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
