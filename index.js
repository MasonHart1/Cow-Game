const cardButton = document.getElementById('playCard');
cardButton.addEventListener('click', function () {
    window.location.href = 'CardMatch/index.html';
});

const ticTacToeButton = document.getElementById('playTTT');
ticTacToeButton.addEventListener('click', function () {
    window.location.href = 'TicTacToe/index.html';
});

const notesButton = document.getElementById("playNotes")
notesButton.addEventListener('click', function () {
    window.location.href = "Notes/index.html"
})