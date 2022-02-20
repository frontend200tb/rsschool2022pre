console.log('frontend200tb random start');


/*****************
Константы
*****************/
const place = document.querySelectorAll('.place-count');
const count = document.querySelector('.count');
const btn = document.querySelector('.btn');
const playground = document.querySelector('.playground');
const time = document.querySelector('.time');
const resultHeader = document.querySelector('#result-header');
const result = document.querySelector('#result');
const timeHeader = document.querySelector('#time-header');
const gameTime = document.querySelector('#game-time');


/*****************
Переменные
*****************/
let colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED'];
let currentScore = 0;
let isGameStarted = false;


/*****************
Local storage
*****************/
let records = localStorage.getItem('squares');
console.log('get local storage records', records);
if (!records) {
  console.log('local storage empty');
  records = [];
} else {
  records = records.split(',');
}

if (records.length > 0) {
  for (let i = 0; i < records.length; i++) {
    place[i].textContent = records[i];
  }
}


/*****************
Функции
*****************/
function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}


function setGameScore() {
  result.textContent = currentScore.toString()
}

function setGameTime() {
  let times = +gameTime.value
  time.textContent = times.toFixed(1)
  show(timeHeader)
  hide(resultHeader)
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return 
  }

  if (event.target.dataset.box) {
    currentScore++
    count.textContent = currentScore + ' hits';
    renderBox()
  }
}

function renderBox() {
  playground.innerHTML = ''
  let box = document.createElement('div')
  let boxSize = getRandom(30, 100)
  let gameSize = playground.getBoundingClientRect()
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize
  let randomColorIndex = getRandom(0, colors.length)

  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = colors[randomColorIndex]
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  playground.insertAdjacentElement('afterbegin', box)

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}


/*****************
START GAME
*****************/
function startGame() {
  currentScore = 0;
  setGameTime()
  gameTime.setAttribute('disabled', 'true')
  isGameStarted = true
  hide(btn)

  let interval = setInterval(function() {
    let times = parseFloat(time.textContent)
    
    if (times <= 0) {
      clearInterval(interval)
      finishGame()
    } else {
      time.textContent = (times - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}


/*****************
FINISH GAME
*****************/
const newScore = () => {
  console.log('newScore', currentScore);
  if (records.length >= 10) {
    records.shift();
    records.push(currentScore);
    console.log('finish records', records);
    for (let i = 0; i < records.length - 1; i++) {
      place[i].textContent = place[i+1].textContent;
      console.log(i);
    }
  } else {
    records.push(currentScore);
    console.log('finish records', records);
  }
    place[records.length - 1].textContent = currentScore;
}

const newLocalStorage = () => {
  localStorage.setItem('squares', records);
  console.log('set local storage records', records);  
}

const finishGame = () => {
  isGameStarted = false
  setGameScore()
  newScore();
  newLocalStorage();
  gameTime.removeAttribute('disabled')
  show(btn)
  playground.innerHTML = ''
  hide(timeHeader)
  show(resultHeader)
}


/*****************
События
*****************/
btn.addEventListener('click', startGame)
playground.addEventListener('click', handleBoxClick)
gameTime.addEventListener('input', setGameTime)

console.log('frontend200tb random finish');
