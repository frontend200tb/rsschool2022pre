document.querySelector('#nav-burger').addEventListener('click', function() {
  this.classList.toggle('open');
  document.querySelector('#nav-menu').classList.toggle('open');
})

console.log('Вёрстка валидная +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css + 12\nИнтерактивность, реализуемая через css +20');