/*******************
BURGER MENU
*******************/
const navBurger = document.querySelector('#nav-burger');
const navMenu = document.querySelector('#nav-menu');

navBurger.addEventListener('click', function() {
  this.classList.toggle('open');
  navMenu.classList.toggle('open');
})

let navItems = document.querySelectorAll('.nav-link');

for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener('click', function() {
    navBurger.classList.remove('open');
    navMenu.classList.remove('open');
  })
}


/*******************
Portfolio change images
*******************/
const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-img');

function changeImage(event) {
  if(event.target.classList.contains('portfolio-btn')) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`);
  }
}

function changeClassActive(event) {
  portfolioBtn.forEach((elem) => {
    elem.classList.remove('btn_active');
  });
  event.target.classList.add('btn_active');
}

portfolioBtns.addEventListener('click', changeImage);
portfolioBtns.addEventListener('click', changeClassActive);


/*******************
Portfolio cache images
*******************/
const seasons = ['winter', 'spring', 'summer', 'autumn'];
  
function preloadImages() {
  seasons.forEach((season) => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `assets/img/${season}/${i}.jpg`;
    }
  })
}

preloadImages();


/*******************
Translate internationalization
*******************/
import i18Obj from './translate.js';

const langs = document.querySelectorAll('.lang');
const langElements = document.querySelectorAll('[data-i18]');

langs.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    getTranslate(e.target.dataset.lang);
  });
  elem.addEventListener('click', changeLangClassActive);
})


function getTranslate(ln) {
  langElements.forEach((elem) => {
    let k = elem.dataset.i18;
    elem.textContent = i18Obj[ln][k];
  });
}

function changeLangClassActive(event) {
  langs.forEach((elem) => {
    elem.classList.remove('lang-active');
  });
  event.target.classList.add('lang-active');
}


/*******************
Theme
*******************/
const theme = document.querySelector('.theme');
const page = document.querySelector('.page');

theme.addEventListener('click', function() {
  theme.classList.toggle('light-theme');
  page.classList.toggle('light-theme');
})


/*******************
Local Storage - Theme
*******************/
theme.addEventListener('click', function() {
  // Допустим, тема темная
  let themePortfolio = "dark";
  // Если theme содержит класс .light-theme
  if (theme.classList.contains("light-theme")) {
    // тогда делаем тему светлой
    themePortfolio = "light";
  }
  // После чего сохраняем тему в localStorage
  localStorage.setItem("themePortfolio", themePortfolio);
});


// Выбираем настройки темы из localStorage
const currentTheme = localStorage.getItem('themePortfolio');
// Если текущая тема в localStorage равна "light"
if (currentTheme == 'light') {
  // тогда мы используем класс .light-theme
  theme.classList.toggle('light-theme');
  page.classList.toggle('light-theme');
}


/*******************
Local Storage - Language
*******************/
langs.forEach((elem) => {
  elem.addEventListener('click', (e) => {
  // Допустим, язык английский
  let langPortfolio = 'en';
  langPortfolio = e.target.dataset.lang;
  // После чего сохраняем язык в localStorage
  localStorage.setItem("langPortfolio", langPortfolio);
  })
})

// Выбираем настройки языка из localStorage
const currentLang = localStorage.getItem('langPortfolio');
// Если текущий язык в localStorage равен "ru"
if (currentLang == 'ru') {
  // Переводим страницу на русский
  langElements.forEach((elem) => {
    let k = elem.dataset.i18;
    elem.textContent = i18Obj[currentLang][k];
  });
  // Изменяем активный класс языка
  langs[0].classList.remove('lang-active');
  langs[1].classList.add('lang-active');
}


/*******************
Button Effects
*******************/
const btns = document.querySelectorAll('button');

btns.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    console.log('клик по кнопке', elem);
    elem.classList.add('btn-click'), setTimeout(() => elem.classList.remove('btn-click'), 500);
  });
})


console.log('Total points 85\nСмена изображений в секции portfolio +25\nПеревод страницы на два языка +25\nПереключение светлой и тёмной темы +25\nДополнительный функционал +10');

