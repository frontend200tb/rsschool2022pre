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
Portfolio images
*******************/
const portfolioBtn = document.querySelector('.portfolio-btn');
const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioImages = document.querySelectorAll('.portfolio-img');

function changeImage(event) {
  if(event.target.classList.contains('portfolio-btn')) {
    let folder = event.target.dataset.season;
    portfolioImages.forEach((img, index) => img.src = `assets/img/${folder}/${index + 1}.jpg`)
  }
}

portfolioBtns.addEventListener('click', changeImage);



console.log('Вёрстка соответствует макету +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22');