const template = document.getElementById('cowCardTemp');
const board = document.getElementById('gameBoard');
let deck = [];

fetch('uno.json')
    .then(res => res.json())
    .then(data => {
        const cows = data.cows;
        const values = data.values;

        Object.keys(cows).forEach(cowName => {
            values.forEach(value => {
                let card = {
                    cow: cowName,
                    value: value,
                    src: cows[cowName]
                }
                deck.push(card)

                let clone = template.content.cloneNode(true)
                clone.querySelector('.img').src = card.src;
                clone.querySelector('.topLeft span').textContent = card.cow;
                clone.querySelector('.bottomRight span').textContent = card.value;
                board.appendChild(clone);
            })
        })

        console.log(deck)
    })
    .catch(err => console.error(err));