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
const logo = document.querySelector('.logo');
const hero = document.querySelector('.hero');
const contacts = document.querySelector('.contacts');

theme.addEventListener('click', function() {
  theme.classList.toggle('light-theme');
  page.classList.toggle('light-theme');
  logo.classList.toggle('light-theme');
  hero.classList.toggle('light-theme');
  contacts.classList.toggle('light-theme');
})


/*******************
Local Storage
*******************/
  // Допустим, тема светлая
  let theme = "light";
  // Если <body> содержит класс .dark-theme…
  if (page.classList.contains("dark-theme")) {
    // …тогда делаем тему тёмной
    theme = "dark";
  }
  // После чего сохраняем выбор в localStorage
  localStorage.setItem("theme", theme);
});


// Выбираем настройки темы из localStorage
const currentTheme = localStorage.getItem('theme');
// Если текущая тема в localStorage равна "dark"…
if (currentTheme == 'dark') {
  // …тогда мы используем класс .dark-theme
  page.classList.add("dark-theme");
}

console.log('Total points 85\nСмена изображений в секции portfolio +25\nПеревод страницы на два языка +25\nПереключение светлой и тёмной темы +25\nДополнительный функционал +10');

