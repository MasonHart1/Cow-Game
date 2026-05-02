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

const loggedIn = window.localStorage.getItem('loggedIn')

if (loggedIn == "false" || loggedIn == null) {
    window.location.href = "login.html"
}

const calcButton = document.getElementById("goCalculator")
calcButton.addEventListener('click', function () {
    window.location.href = "Calculator/index.html"
})

const dailyButton = document.getElementById("goDaily")
dailyButton.addEventListener('click', function () {
    window.location.href = "BibleVerse/index.html"
})