const gameStatus = document.querySelector('.status');

let gameActive = true; 
let currentPlayer = "X";
let position = ["", "", "", "", "", "", "", "", ""];

const win = () => `Player ${currentPlayer} has won!`;
const draw = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;// takes from the playerChange function

gameStatus.innerHTML = currentPlayerTurn();

// The winning conditions in the TIC TAC TOE game 
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//The Function creation for cellchange and the current player option
function cellChange(clickedCell, clickedCellIndex) {
    position[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

//The function creation for knowing the currentPlayerTurn
function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerHTML = currentPlayerTurn();
}
// The function creation for obtaining the result
function result() {
    let roundWon = false;

    // checking for the won condition
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = position[winCondition[0]];
        let b = position[winCondition[1]];
        let c = position[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
        
    }

    if (roundWon) {
        gameStatus.innerHTML = win();
        gameStatus.style.color ="black"
        gameActive = false;
        return;
    }

    //checks the draw condition
    let roundDraw = !position.includes("");
    if (roundDraw) {
        gameStatus.innerHTML = draw();
        gameStatus.style.color="white"
        gameActive = false;
        return;
    }

    playerChange();
}

//on click behaviour on each cell in the grid
function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (position[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    cellChange(clickedCell, clickedCellIndex);
    result();
}

// for restarting the game and clearing the board
function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    position = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// on click on each cell  it runs the funtion cellClick
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));

// on click on the clear board it runs the function reStartGame
document.querySelector('.restart').addEventListener('click', restartGame);