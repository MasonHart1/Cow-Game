supabase = window.supabase.createClient(
    'https://qgdnavrvqtuzhyqrtxfe.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZG5hdnJ2cXR1emh5cXJ0eGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNzY0MTksImV4cCI6MjA5MjY1MjQxOX0.zkkqLMJwEIZKerPpFqIAvGO2NQegFnk0617ZclEehDQ'
)

const translation = 'eng_dra';
const books = [
    { id: "GEN", name: "Genesis" },
    { id: "EXO", name: "Exodus" },
    { id: "LEV", name: "Leviticus" },
    { id: "NUM", name: "Numbers" },
    { id: "DEU", name: "Deuteronomy" },
    { id: "JOS", name: "Joshua" },
    { id: "JDG", name: "Judges" },
    { id: "RUT", name: "Ruth" },
    { id: "1SA", name: "1 Samuel" },
    { id: "2SA", name: "2 Samuel" },
    { id: "1KI", name: "1 Kings" },
    { id: "2KI", name: "2 Kings" },
    { id: "1CH", name: "1 Chronicles" },
    { id: "2CH", name: "2 Chronicles" },
    { id: "EZR", name: "Ezra" },
    { id: "NEH", name: "Nehemiah" },
    { id: "EST", name: "Esther" },
    { id: "JOB", name: "Job" },
    { id: "PSA", name: "Psalms" },
    { id: "PRO", name: "Proverbs" },
    { id: "ECC", name: "Ecclesiastes" },
    { id: "SNG", name: "Song of Solomon" },
    { id: "ISA", name: "Isaiah" },
    { id: "JER", name: "Jeremiah" },
    { id: "LAM", name: "Lamentations" },
    { id: "EZK", name: "Ezekiel" },
    { id: "DAN", name: "Daniel" },
    { id: "HOS", name: "Hosea" },
    { id: "JOL", name: "Joel" },
    { id: "AMO", name: "Amos" },
    { id: "OBA", name: "Obadiah" },
    { id: "JON", name: "Jonah" },
    { id: "MIC", name: "Micah" },
    { id: "NAM", name: "Nahum" },
    { id: "HAB", name: "Habakkuk" },
    { id: "ZEP", name: "Zephaniah" },
    { id: "HAG", name: "Haggai" },
    { id: "ZEC", name: "Zechariah" },
    { id: "MAL", name: "Malachi" },
    { id: "MAT", name: "Matthew" },
    { id: "MRK", name: "Mark" },
    { id: "LUK", name: "Luke" },
    { id: "JHN", name: "John" },
    { id: "ACT", name: "Acts" },
    { id: "ROM", name: "Romans" },
    { id: "1CO", name: "1 Corinthians" },
    { id: "2CO", name: "2 Corinthians" },
    { id: "GAL", name: "Galatians" },
    { id: "EPH", name: "Ephesians" },
    { id: "PHP", name: "Philippians" },
    { id: "COL", name: "Colossians" },
    { id: "1TH", name: "1 Thessalonians" },
    { id: "2TH", name: "2 Thessalonians" },
    { id: "1TI", name: "1 Timothy" },
    { id: "2TI", name: "2 Timothy" },
    { id: "TIT", name: "Titus" },
    { id: "PHM", name: "Philemon" },
    { id: "HEB", name: "Hebrews" },
    { id: "JAS", name: "James" },
    { id: "1PE", name: "1 Peter" },
    { id: "2PE", name: "2 Peter" },
    { id: "1JN", name: "1 John" },
    { id: "2JN", name: "2 John" },
    { id: "3JN", name: "3 John" },
    { id: "JUD", name: "Jude" },
    { id: "REV", name: "Revelation" },
    { id: "TOB", name: "Tobit" },
    { id: "JDT", name: "Judith" },
    { id: "WIS", name: "Wisdom of Solomon" },
    { id: "SIR", name: "Sirach" },
    { id: "BAR", name: "Baruch" },
    { id: "1MA", name: "1 Maccabees" },
    { id: "2MA", name: "2 Maccabees" }
];
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function getDailySeed() {
    const today = new Date();
    // Creates a unique number per day e.g. 20260501
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

async function getDailyBook() {
    document.getElementById("books").value = "";
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const { data, error } = await supabase
        .from("BibleVerses")
        .select("*")
        .eq("created_at", todayISO)
        .or("Random.is.null,Random.eq.false");

    if (error) {
        console.error("Supabase error:", error.message);
        return;
    }

    if (data.length > 0) {
        document.getElementById("verseTitle").textContent = "Bible verse: " + data[0].Verse.split("—")[0];
        document.getElementById("verse").textContent = data[0].Verse.split("—")[1];
        return;
    }

    const seed = getDailySeed();
    const bookIndex = Math.floor(seededRandom(seed) * books.length);
    const randomBook = books[bookIndex];
    console.log(books[bookIndex].toString())

    const bookRes = await fetch(`https://bible.helloao.org/api/${translation}/${randomBook.id}/1.json`);
    const bookData = await bookRes.json();
    const numberOfChapters = bookData.book.numberOfChapters;
    const randomChapter = Math.floor(seededRandom(seed + 1) * numberOfChapters) + 1;

    const chapterRes = await fetch(`https://bible.helloao.org/api/${translation}/${randomBook.id}/${randomChapter}.json`);
    const chapterData = await chapterRes.json();
    const numberOfVerses = chapterData.numberOfVerses;
    const randomVerse = Math.floor(seededRandom(seed + 2) * numberOfVerses) + 1;

    const verseObj = chapterData.chapter.content.find(
        item => item.type === "verse" && Number(item.number) === Number(randomVerse)
    );

    const verseText = verseObj.content
        .filter(item => typeof item === "string")
        .join(" ");

    const verseRef = `${randomBook.name} ${randomChapter}:${randomVerse}`;

    const { data: newData, error: newError } = await supabase
        .from("BibleVerses")
        .insert([{ Verse: `${verseRef} — ${verseText}`, created_at: todayISO }])
        .select()
        .single();

    if (newError) {
        console.error("Insert error:", newError.message);
        return;
    }

    console.log(newData.Verse);

    document.getElementById("verseTitle").textContent = "Bible verse: " + newData.Verse.split("—")[0];
    document.getElementById("verse").textContent = newData.Verse.split("—")[1];
}

async function getRandomBook() {
    document.getElementById("books").value = "";
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const seed = Math.random() * 1000000;
    const bookIndex = Math.floor(seededRandom(seed) * books.length);
    const randomBook = books[bookIndex];

    const bookRes = await fetch(`https://bible.helloao.org/api/${translation}/${randomBook.id}/1.json`);
    const bookData = await bookRes.json();
    const numberOfChapters = bookData.book.numberOfChapters;
    const randomChapter = Math.floor(seededRandom(seed + 1) * numberOfChapters) + 1;

    const chapterRes = await fetch(`https://bible.helloao.org/api/${translation}/${randomBook.id}/${randomChapter}.json`);
    const chapterData = await chapterRes.json();
    const numberOfVerses = chapterData.numberOfVerses;
    const randomVerse = Math.floor(seededRandom(seed + 2) * numberOfVerses) + 1;

    const verseObj = chapterData.chapter.content.find(
        item => item.type === "verse" && Number(item.number) === Number(randomVerse)
    );

    const verseText = verseObj.content
        .filter(item => typeof item === "string")
        .join(" ");

    const verseRef = `${randomBook.name} ${randomChapter}:${randomVerse}`;

    const { data: newData, error: newError } = await supabase
        .from("BibleVerses")
        .insert([{ Verse: `${verseRef} — ${verseText}`, created_at: null, Random: true }])
        .select()
        .single();

    if (newError) {
        console.error("Insert error:", newError.message);
        return;
    }

    console.log(newData.Verse);

    document.getElementById("verseTitle").textContent = "Bible verse: " + newData.Verse.split("—")[0];
    document.getElementById("verse").textContent = newData.Verse.split("—")[1];
}

async function chooseBook() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const seed = Math.random() * 1000000;

    const chosenBook = document.getElementById("books").value;
    const bookId = books.find(book => book.name === chosenBook).id;

    const bookRes = await fetch(`https://bible.helloao.org/api/${translation}/${bookId}/1.json`);
    const bookData = await bookRes.json();
    const numberOfChapters = bookData.book.numberOfChapters;
    let randomChapter = chosenBook == "Philippians" ? 4 : Math.floor(seededRandom(seed + 1) * numberOfChapters) + 1;

    const chapterRes = await fetch(`https://bible.helloao.org/api/${translation}/${bookId}/${randomChapter}.json`);
    const chapterData = await chapterRes.json();
    const numberOfVerses = chapterData.numberOfVerses;
    let randomVerse = chosenBook == "Philippians" ? 13 : Math.floor(seededRandom(seed + 2) * numberOfVerses) + 1;

    const verseObj = chapterData.chapter.content.find(
        item => item.type === "verse" && Number(item.number) === Number(randomVerse)
    );

    const verseText = verseObj.content
        .filter(item => typeof item === "string")
        .join(" ");

    const verseRef = `${chosenBook} ${randomChapter}:${randomVerse}`;

    const { data: newData, error: newError } = await supabase
        .from("BibleVerses")
        .insert([{ Verse: `${verseRef} — ${verseText}`, created_at: null, Random: null }])
        .select()
        .single();

    if (newError) {
        console.error("Insert error:", newError.message);
        return;
    }

    console.log(newData.Verse);

    document.getElementById("verseTitle").textContent = "Bible verse: " + newData.Verse.split("—")[0];
    document.getElementById("verse").textContent = newData.Verse.split("—")[1];
}

for (const book of books) {
    const option = document.createElement("option");
    option.value = book.name;
    option.textContent = book.name;
    document.getElementById("books").appendChild(option);
}

document.getElementById("books").addEventListener("change", chooseBook);

getDailyBook();