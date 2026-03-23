let clicked = [];

function shuffleCards() {
    const container = document.querySelector('.container');
    const children = Array.from(container.children);

    for (let i = children.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [children[i], children[j]] = [children[j], children[i]];
    }

    children.forEach(cow => container.appendChild(cow));
}

shuffleCards()

function checkIfWon() {
    const cows = Array.from(document.querySelector('.container').children);
    if (cows.every(cow => cow.classList.contains('clicked'))) {
        alert('You won!');
        setTimeout(function () {
            window.location.reload()
        }, 500)
    }
}

document.querySelectorAll('div.cow').forEach(function (div) {
    div.addEventListener('click', function () {
        if (clicked.length < 2) {
            clicked.push(div);
            div.classList.add('clicked');
        }
        else {
            clicked.shift();
            clicked.push(div);
            div.classList.add('clicked');
        }
        if (clicked.length === 2) {
            var image1 = clicked[0].querySelector('img').src;
            var image2 = clicked[1].querySelector('img').src;
            if (image1 === image2) {
                clicked = [];
                checkIfWon();
            }
            else {
                setTimeout(function () {
                    clicked[0].classList.remove('clicked');
                    clicked[1].classList.remove('clicked');
                    clicked = [];
                }, 500);
                setTimeout(function () {
                    alert('Try again!');

                }, 900)
            }
        }
    });
});