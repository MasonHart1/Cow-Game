let i = 0;
let listOfPossibleWords = [
    "cow", "bull", "calf", "herd", "udder",
    "hooves", "pasture", "grazing", "muzzle", "branded",
    "barnyard", "Holstein", "longhorn", "cowbell", "milking",
    "feedlot", "manure", "lowing", "dewlap", "steer",
    "mooing", "cud", "stockyard", "brisket", "bovine",
    "heifer", "rangeland", "trough", "cowpat", "halter",
    "flank", "paddock", "lasso", "branding", "oxen",
    "cowhide", "Angus", "Hereford", "rumen", "clovers",
    "cowhand", "bellowing", "yoke", "livestock", "stampede",
    "wrangler", "roundup", "dairy", "cowshed", "Guernsey"
];
for (let node of document.querySelectorAll("td")) {
    node.textContent = i++;

    node.addEventListener("click", () => {
        node.classList.toggle("selected");
    });
}

const ROWS = 10;
const COLS = 10;
const DIRECTIONS = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal down-right
    [0, -1],  // left
    [-1, 0],  // up
    [-1, -1], // diagonal up-left
    [1, -1],  // diagonal down-left
    [-1, 1],  // diagonal up-right
];

function selectRandomWords() {
    const shuffled = [...listOfPossibleWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10); // pick 10 words to hide
}

function placeWords(words) {
    // build empty 10x10 grid
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    const placedWords = [];

    for (const word of words) {
        const letters = word.toUpperCase().split("");
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 200) {
            attempts++;
            const [dr, dc] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
            const startR = Math.floor(Math.random() * ROWS);
            const startC = Math.floor(Math.random() * COLS);

            // check it fits
            const endR = startR + dr * (letters.length - 1);
            const endC = startC + dc * (letters.length - 1);
            if (endR < 0 || endR >= ROWS || endC < 0 || endC >= COLS) continue;

            // check no conflicts
            let conflict = false;
            for (let i = 0; i < letters.length; i++) {
                const cell = grid[startR + dr * i][startC + dc * i];
                if (cell !== null && cell !== letters[i]) { conflict = true; break; }
            }
            if (conflict) continue;

            // place it
            for (let i = 0; i < letters.length; i++) {
                grid[startR + dr * i][startC + dc * i] = letters[i];
            }
            placedWords.push(word);
            placed = true;
        }
    }
    console.log(placedWords)

    // fill remaining cells with random letters
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][c] === null) {
                grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }

    // write to DOM — index = row * COLS + col
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const index = r * COLS + c;
            const td = document.querySelector(`td[data-index="${index}"]`);
            if (td) td.textContent = grid[r][c];
        }
    }

    return placedWords; // return so you can show the word list to the player
}

const wordsToFind = placeWords(selectRandomWords());
for (let node in wordsToFind) {
    let li = document.createElement("li");
    li.textContent = wordsToFind[node];
    document.getElementById("wordList").appendChild(li);
}

function checkForWord() {
    for (let node in document.querySelectorAll("td.selected")) {
        if (wordsToFind.includes(node.textContent)) {
            node.classList.add("found");
        }
    }
}