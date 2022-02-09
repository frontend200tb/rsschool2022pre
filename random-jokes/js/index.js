console.log('start frontend200tb random-jokes');


/*******************
Константы
*******************/
let urlQuote = "./js/quotes18.json";
const urlImage = "./js/images18.json";

const img = document.querySelector(".img");
const btn = document.querySelector(".btn");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
let currentLang = 'en';


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
import i18Obj from './translate.js';

const langs = document.querySelectorAll('.lang');
const langElements = document.querySelectorAll('[data-i18]');

langs.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    getTranslate(e.target.dataset.lang);
    let oldUrlQuote = urlQuote;
    if (e.target.dataset.lang === 'en') {
      urlQuote = "./js/quotes18.json";
    } else {
      urlQuote = "./js/quotes18rus.json";
    }
    (oldUrlQuote === urlQuote) || getPhrase();
  });
  elem.addEventListener('click', changeLangClassActive);
})


function getTranslate(ln) {
  langElements.forEach((elem) => {
    let k = elem.dataset.i18;
    elem.textContent = i18Obj[ln][k];
    if (elem.placeholder) {
      elem.placeholder = i18Obj[ln][elem.dataset.i18];
      elem.textContent = '';
    }
  });
}

function changeLangClassActive(event) {
  langs.forEach((elem) => {
    elem.classList.remove('lang-active');
  });
  event.target.classList.add('lang-active');
}


/*******************
Local Storage - Language
*******************/
langs.forEach((elem) => {
  elem.addEventListener('click', (e) => {
  // Допустим, язык английский
  currentLang = e.target.dataset.lang;
  // После чего сохраняем язык в localStorage
  localStorage.setItem("langPortfolio", currentLang);
  })
})

// Выбираем настройки языка из localStorage
const savedLang = localStorage.getItem('langPortfolio');
// Если текущий язык в localStorage равен "ru"
if (savedLang == 'ru') {
  // Переводим страницу на русский
  langElements.forEach((elem) => {
    let k = elem.dataset.i18;
    elem.textContent = i18Obj[savedLang][k];
  });
  // Изменяем активный класс языка
  langs[0].classList.remove('lang-active');
  langs[1].classList.add('lang-active');
  urlQuote = "./js/quotes18rus.json";
}


console.log('js code complete frontend200tb random-jokes');