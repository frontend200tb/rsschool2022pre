console.log('frontend200tb memory start');


/*****************
Константы
*****************/
const placeCount = document.querySelector('.place-count');
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
let records = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let nextRecord = 0;


/*****************
Функции
*****************/
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

function checkForMatch() {
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
  
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
  
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockCard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}

const startGame = () => {
  cards.forEach(card => {
    card.classList.remove('flip');
  });

  cards.forEach(elem => elem.addEventListener('click', flipCard));

  resetBoard();
  setTimeout(() => {  
    shuffle();
  }, 1000);
  currentScore = 0;
  count.textContent = currentScore + ' moves';

}

const finishGame = () => {
  placeCount.textContent = currentScore;
  count.textContent = 'finish';
}

/*****************
Local storage
*****************/



/*****************
События
*****************/
document.addEventListener('DOMContentLoaded', startGame)
btn.addEventListener('click', startGame);

console.log('frontend200tb memory finish');
