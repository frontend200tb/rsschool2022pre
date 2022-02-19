console.log('frontend200tb memory start');


/*****************
Константы
*****************/
const place = document.querySelectorAll('.place-count');
console.log('games', place);
const count = document.querySelector('.count');
const cards = document.querySelectorAll('.card');
const btn = document.querySelector('.btn');


/*****************
Переменные
*****************/
let hasFlippedCard = false;
let lockCard = false;
let firstCard;
let secondCard;
let currentScore = 0;
let countOpenCards = 0;
let countAllCards = 16;
let records = [];


/*****************
Local storage
*****************/
records = localStorage.getItem('records').split(',');
console.log('get local storage records', records);
if (!records) {
  let records = [];
  console.log('records', records);
  localStorage.setItem('records', records);
  console.log('set local storage records', records);
}


for (let i = 0; i < records.length; i++) {
  place[i].textContent = records[i];
}


/*****************
Функции
*****************/


/*****************
start game
*****************/
function unflipLastTwoCards() {
  hasFlippedCard = false;
  lockCard = false;
  firstCard = null;
  secondCard = null;
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  unflipLastTwoCards();
}
  
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    unflipLastTwoCards();
  }, 1000);
}

const checkForMatch = () => {
  let isMatch = firstCard.dataset.img === secondCard.dataset.img;
  if (isMatch) {
    disableCards();
    countOpenCards += 2;
    if (countOpenCards === countAllCards) {
      finishGame();
    }

  } else {
    unflipCards();
  } 
}

function flipCard() {
  if (lockCard) {
    return
  }

  if (this === firstCard) {
    return
  }
  
  currentScore++;
  count.textContent = currentScore + ' moves';
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockCard = true;
  
  checkForMatch();
}
  
const shuffle = () => {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}

const startGame = () => {
  console.log('start game');
  hasFlippedCard = false;
  lockCard = false;
  firstCard = null;
  secondCard = null;
  countOpenCards = 0;
  currentScore = 0;
  count.textContent = currentScore + ' moves';
  cards.forEach(card => card.classList.remove('flip'));

  cards.forEach(elem => elem.addEventListener('click', flipCard));

  setTimeout(() => {  
    shuffle();
  }, 1000);

}


/*****************
finish game
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
  localStorage.setItem('records', records);
  console.log('set local storage records', records);  
}

const finishGame = () => {
  console.log('finish game');
  count.textContent = 'finish';
  newScore();
  newLocalStorage();
}


/*****************
События
*****************/
document.addEventListener('DOMContentLoaded', startGame);
btn.addEventListener('click', startGame);

console.log('frontend200tb memory finish');
