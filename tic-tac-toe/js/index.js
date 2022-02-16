console.log('frontend200tb tic tac toe start');

/*****************
Константы
*****************/
const imgX = document.querySelector('.img-x');
console.log(imgX);
const imgO = document.querySelector('.img-o');
console.log(imgO);

const countX = document.querySelector('.count-x');
console.log(countX);
const countO = document.querySelector('.count-o');
console.log(countO);
const playground = document.querySelector('.playground');
console.log(playground);
const cells = document.querySelectorAll('.cell');
console.log(cells);
const btn = document.querySelector('.btn');
console.log(btn);

let winX = 0;
let winO = 0;
let turn = 'x';

/*****************
Функции
*****************/
const cellOver = (e) => {
  e.target.classList.add('highlight');
}

const cellOut = (e) => {
  e.target.classList.remove('highlight');
}

const setWinX = () => {
  if (winX === 9) {
    winX = 0;
  } else {
  winX++;
  }
  countX.style.backgroundImage = `url(assets/svg/${winX}.png)`;
};

const setWinO = () => {
  if (winO === 9) {
    winO = 0;
  } else {
  winO++;
  }

  countO.style.backgroundImage = `url(assets/svg/${winO}.png)`;
};

const startGame = () => {
  countX.style.backgroundImage = 'url(assets/svg/o.svg)';
};

/*****************
События
*****************/
imgX.addEventListener("click", setWinX);
imgO.addEventListener("click", setWinO);

playground.addEventListener('mouseover', cellOver);
playground.addEventListener('mouseout', cellOut);
btn.addEventListener("click", setWinX);

console.log("frontend200tb tic tac toe finish");
