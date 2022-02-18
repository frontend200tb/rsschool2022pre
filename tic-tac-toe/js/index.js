console.log('frontend200tb tic tac toe start');


/*****************
Константы
*****************/
const imgX = document.querySelector('.img-x');
const imgO = document.querySelector('.img-o');

const countX = document.querySelector('.count-x');
const countO = document.querySelector('.count-o');
const playground = document.querySelector('.playground');
console.log(playground);
const cells = document.querySelectorAll('.cell');
console.log(cells);
const btn = document.querySelector('.btn');
console.log(btn);


/*****************
Переменные
*****************/
let isPlay = false;
let scoreX = 0;
let scoreO = 0;
let turnX = true; //ход крестика
let xArr = [];
let oArr = [];
/* из нод листа с ячейками делаем массив с ячейками */
const cellArr = new Array(...cells);
console.log(cellArr);

const winArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


/*****************
Функции
*****************/

/* курсор над playground */
const cellOver = e => {
  e.target.classList.add('highlight');
};

const cellOut = e => {
  e.target.classList.remove('highlight');
};

/* счет игры */
const setScoreX = () => {
  if (scoreX === 9) {
    scoreX = 0;
  } else {
    scoreX++;
  }
  countX.style.backgroundImage = `url(assets/img/${scoreX}.png)`;
};

const setScoreO = () => {
  if (scoreO === 9) {
    scoreO = 0;
  } else {
    scoreO++;
  }

  countO.style.backgroundImage = `url(assets/img/${scoreO}.png)`;
};

/* очистка playground */
const clearPlayground = () => {
  cells.forEach((elem) => {
    elem.classList.remove('x');
    elem.classList.remove('o');
  })
}

const checkWinX = () => {
  console.log('Проверка х на вывигрыш');
  winArr.forEach(elem => {
    console.log(elem);
    if (xArr.includes(elem[0]) && xArr.includes(elem[1]) && xArr.includes(elem[2])) {
      setScoreX();
      endGame();
    }
  })
}

const checkWinO = () => {
  console.log('Проверка о на вывигрыш')
  winArr.forEach(elem => {
    console.log(elem);
    if (oArr.includes(elem[0]) && oArr.includes(elem[1]) && oArr.includes(elem[2])) {
      setScoreO();
      endGame();
    }
  })
}

const tag = e => {
  console.log('зашли в функцию')
  if (e.target.classList.contains('x') || e.target.classList.contains('o')) {
    return
  }
  if (turnX) {
    xArr.push(cellArr.indexOf(e.target));
    console.log('xArr', xArr);
    e.target.classList.add('x');
    playground.classList.remove('x');
    playground.classList.add('o');
    checkWinX();
  } else {
    oArr.push(cellArr.indexOf(e.target));
    console.log('oArr', oArr);
    e.target.classList.add('o');
    playground.classList.remove('o');
    playground.classList.add('x');
    checkWinO();
  }
  turnX = !turnX;
}

const startGame = () => {
  isPlay = true;
  turnX = true;
  xArr = [];
  oArr = [];
  playground.classList.remove('o');
  playground.classList.add('x');
  clearPlayground();
  playground.addEventListener('mouseover', cellOver);
  playground.addEventListener('mouseout', cellOut);
  playground.addEventListener('click', tag);
};

const endGame = () => {
  isPlay = false;
  playground.classList.remove('o');
  playground.classList.remove('x');
  playground.removeEventListener('mouseover', cellOver);
  playground.removeEventListener('click', tag);

}

/*****************
События
*****************/
imgX.addEventListener('click', setScoreX);
imgO.addEventListener('click', setScoreO);

btn.addEventListener('click', startGame);

console.log('frontend200tb tic tac toe finish');
