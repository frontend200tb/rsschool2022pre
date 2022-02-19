console.log('frontend200tb memory start');


/*****************
Константы
*****************/
const cards = document.querySelectorAll('.card');


/*****************
Переменные
*****************/
let hasFlippedCard = false;
let lockCard = false;
let firstCard;
let secondCard;


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

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  }

  secondCard = this;
  
  checkForMatch();  
}

function checkForMatch() {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    disableCards();
    return;
  }
  
  unflipCards();
}
  
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
  
function unflipCards() {
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockCard = false;
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


/*****************
События
*****************/
cards.forEach(card => card.addEventListener('click', flipCard));

console.log('frontend200tb memory finish');
