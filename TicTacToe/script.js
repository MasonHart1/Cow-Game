let player1 = 'X';
let player2 = 'O';
let turn = player1;
const returnButton = document.getElementById('return');

let text = document.getElementById('text');

const winningCombinations = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6]
]

document.querySelectorAll('.ticButton').forEach(function (button) {
    button.addEventListener('click', function () {
        if (button.textContent === '') {
            button.textContent = turn;
            if (checkIfWin()) return;
            if (checkIfDraw()) return;
        };
        if (turn === player1) {
            turn = player2
            text.textContent = 'Player 2 turn'
        } else {
            turn = player1
            text.textContent = 'Player 1 turn'
        }
    })
})


function checkIfWin() {
    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        let buttons = document.querySelectorAll('.ticButton');

        if (
            buttons[a].textContent === player1 &&
            buttons[b].textContent === player1 &&
            buttons[c].textContent === player1
        ) {
            text.textContent = `Player 1 won!`;
            returnButton.style.display = 'block';
            return true;
        }

        if (
            buttons[a].textContent === player2 &&
            buttons[b].textContent === player2 &&
            buttons[c].textContent === player2
        ) {
            text.textContent = `Player 2 won!`;
            returnButton.style.display = 'block';
            return true;
        }
    }
    return false;
}

function checkIfDraw() {
    let buttons = document.querySelectorAll('.ticButton');
    if (Array.from(buttons).every(button => button.textContent !== '')) {
        text.textContent = 'Draw!';
        returnButton.style.display = 'block';
        return true;
    }
    return false;
}