console.log('start frontend200tb random-jokes');


/*******************
Константы
*******************/
const urlQuote = "./js/quotes18rus.json";
const urlImage = "./js/images18.json";

const img = document.querySelector(".img");
const btn = document.querySelector(".btn");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");


/*******************
Получение json
*******************/
async function getPhrase() {
  const phraseData = await fetch(urlQuote);
  const obj = await phraseData.json();
  randomQuote(obj);
}

async function getImage() {
  const imageData = await fetch(urlImage);
  const obj = await imageData.json();
  randomImg(obj);
}


/*******************
Получение случайной фразы и изображения
*******************/
function randomQuote(obj) {
  let random = obj.quotes[Math.floor(Math.random() * obj.quotes.length)];
  quote.innerText = `“${random.quote}.”`;
  author.innerText = random.author;
}

function randomImg(obj) {
  let random = obj.images[Math.floor(Math.random() * obj.images.length)];
  img.src = random.image;
}


/*******************
События
*******************/
document.addEventListener("DOMContentLoaded", getPhrase);
document.addEventListener("DOMContentLoaded", getImage);

btn.addEventListener("click", getPhrase);
btn.addEventListener("click", getImage);


/*******************
Перевод
*******************/


console.log('js code complete frontend200tb random-jokes');