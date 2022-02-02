console.log('старт');
const sounds = [
  'assets/audio/forest.mp3',
  'assets/audio/solovey.mp3',
  'assets/audio/drozd.mp3',
  'assets/audio/zarynka.mp3',
  'assets/audio/javoronok.mp3',
  'assets/audio/slavka.mp3',
];
const mainImg = [
  'forest',
  'solovey',
  'drozd',
  'zarynka',
  'javoronok',
  'slavka',
]

const birds = document.querySelectorAll('.bird');
const main = document.querySelector('.main');
const player = document.querySelector('.player');
const btn = document.querySelector('.btn');
let isPlay = false;
// const log = document.querySelector('.log');


// При нажатии на птичку или название птицы
function clickBird(elem, index) {
  changeImg(index);
  changeBird(elem, index);
  if (!isPlay) {
    changeBtn();
  } else {
    isPlay = false;
    play()
  }
}

// Смена картинки
function changeImg(index) {
  mainImg.forEach( (elem) => main.classList.remove(elem));
  main.classList.add(mainImg[index]);
  // log.innerHTML = main.classList;
}

// Смена птицы
function changeBird(elem, index) {
  birds.forEach( (elem) => elem.classList.remove('bird-active'));
  elem.classList.add('bird-active');
  player.src = sounds[index];
}

// Смена кнопки
function changeBtn() {
  btn.classList.toggle('play');
  // log.innerHTML = btn.classList;
  play();
}

// Включение и выключение проигрывателя
function play() {
  player.currentTime = 0;
  if(!isPlay) {
    player.play();
    isPlay = true;
  } else {
    player.pause();
    isPlay = false;
  }  
}

birds.forEach( (elem, index) => elem.addEventListener('click', () => clickBird(elem, index)) );

btn.addEventListener('click', changeBtn);

console.log('финиш');