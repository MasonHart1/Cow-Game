const template = document.getElementById('cowCardTemp');
const board = document.getElementById('playerHand');
let deck = [];
let tempDeck = [];
let cardsToDraw = []
let playArea = document.getElementById("playArea");

fetch('uno.json')
    .then(res => res.json())
    .then(data => {
        const cows = data.cows;
        const values = data.values;

        for (let i = 0; i < 5; i++) {
            Object.keys(cows).forEach(cowName => {
                values.forEach(value => {
                    let card = {
                        cow: cowName,      // normal cow
                        value: value,
                        src: cows[cowName]
                    };
                    tempDeck.push(card);
                });
            });
        }
        let specialCards = [
            { cow: "Sprinkles", value: "wild", src: "../Images/cow5.png" },
            { cow: "Cowsley", value: "draw 4", src: "../Images/cow6.png" }
        ];

        // add multiple copies if needed
        specialCards.forEach(card => {
            for (let i = 0; i < 10; i++) { // usually 4 of each special card in UNO
                tempDeck.push({ ...card });
            }
        });
        cardsToDraw = tempDeck

        console.log(cardsToDraw)

        let randomCards = [];
        for (let i = 0; i < 7; i++) {
            let randomIndex = Math.floor(Math.random() * tempDeck.length);
            let randomCard = tempDeck.splice(randomIndex, 1)[0];
            randomCards.push(randomCard);
        }

        deck = randomCards;
        gameStart();

        randomCards.forEach(card => {
            let clone = template.content.cloneNode(true);

            let cardElement = clone.querySelector('.cowCard');

            clone.querySelector('.img').src = card.src;
            clone.querySelector('.topLeft span').textContent = card.cow + " " + card.value;
            clone.querySelector('.bottomRight span').textContent = card.value;

            // ✅ click = play card
            cardElement.addEventListener('click', function () {
                playCard(cardElement);
            });

            board.appendChild(clone);
        });

        console.log(deck)
    })
    .catch(err => console.error(err));




function drawCard() {
    let randomIndex = Math.floor(Math.random() * tempDeck.length);
    if (cardsToDraw.length === 0) return;
    let card = cardsToDraw.splice(randomIndex, 1)[0];
    let clone = template.content.cloneNode(true)
    let cardElement = clone.querySelector('.cowCard');
    clone.querySelector('.img').src = card.src;
    clone.querySelector('.topLeft span').textContent = card.cow + " " + card.value;
    clone.querySelector('.bottomRight span').textContent = card.value;
    cardElement.addEventListener('click', function () {
        playCard(cardElement);
    });
    board.appendChild(clone);
}


function playCard(cardElement) {
    let topCard = playArea.lastElementChild;

    // Get cow/value from top card
    let topCow = topCard ? topCard.querySelector('.topLeft span').textContent.split(" ")[0] : null;
    let topValue = topCard ? topCard.querySelector('.bottomRight span').textContent : null;

    // Get cow/value from clicked card
    let cardCow = cardElement.querySelector('.topLeft span').textContent.split(" ")[0];
    let cardValue = cardElement.querySelector('.bottomRight span').textContent;

    // Check if valid
    let isValid = !topCard || topCow === cardCow || topValue === cardValue || cardValue === "wild" || cardValue === "draw 4";

    if (isValid) {
        // Get card's current position
        const rect = cardElement.getBoundingClientRect();
        const playRect = playArea.getBoundingClientRect();
        const dx = playRect.left - rect.left;
        const dy = playRect.top - rect.top;

        // temporarily set absolute position
        cardElement.style.position = 'absolute';
        cardElement.style.left = rect.left + 'px';
        cardElement.style.top = rect.top + 'px';
        document.body.appendChild(cardElement); // move to body for absolute positioning

        // force reflow
        cardElement.getBoundingClientRect();

        // move to play area position
        cardElement.style.transform = `translate(${dx}px, ${dy}px) scale(1.1)`;
        cardElement.style.transition = 'transform 0.5s ease';

        // after animation, append to playArea and reset styles
        setTimeout(() => {
            cardElement.style.position = '';
            cardElement.style.left = '';
            cardElement.style.top = '';
            cardElement.style.transform = '';
            cardElement.style.transition = '';
            playArea.appendChild(cardElement);
        }, 500);
    } else {
        // shake invalid card
        cardElement.classList.add('shake');
        cardElement.addEventListener('animationend', () => {
            cardElement.classList.remove('shake');
        }, { once: true });
    }
}

function gameStart() {
    let card = deck.pop();
    let clone = template.content.cloneNode(true)
    clone.querySelector('.img').src = card.src;
    clone.querySelector('.topLeft span').textContent = card.cow + " " + card.value;
    clone.querySelector('.bottomRight span').textContent = card.value;
    playArea.appendChild(clone);
}
