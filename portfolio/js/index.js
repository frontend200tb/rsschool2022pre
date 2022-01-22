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
  portfolioBtn.forEach((elem, index) => {
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
      console.log(img.src);
    }
  })
}

preloadImages();

console.log('Вёрстка соответствует макету +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22');