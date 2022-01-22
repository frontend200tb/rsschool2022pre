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
    elem.classList.remove('btn_gold');
  });
  event.target.classList.add('btn_gold');
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

const lang = document.querySelectorAll('.lang');
const langRu = document.querySelector('.ru');
const langEn = document.querySelector('.en');
const langElements = document.querySelectorAll('[data-i18]');

function getTranslateRu () {
  langElements.forEach((elem) => {
    let k = elem.dataset.i18;
    elem.textContent = i18Obj.ru[k];
    console.log(elem, i18Obj.ru[k], k);
  });
}

function getTranslateEn () {
  langElements.forEach((elem) => {
    let k = elem.dataset.i18;
    elem.textContent = i18Obj.en[k];
    console.log(elem, i18Obj.en[k], k);
  });
}

function changeLangClassActive(event) {
  lang.forEach((elem) => {
    elem.classList.remove('lang-active');
  });
  event.target.classList.add('lang-active');
}

langRu.addEventListener('click', getTranslateRu);
langEn.addEventListener('click', getTranslateEn);
langRu.addEventListener('click', changeLangClassActive);
langEn.addEventListener('click', changeLangClassActive);


console.log('Вёрстка соответствует макету +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22');