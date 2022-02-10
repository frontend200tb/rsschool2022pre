console.log('start frontend200tb image-galery');


/*******************
Константы
*******************/
//let url = "https://api.unsplash.com/photos/?client_id=hwxC3T49Lg8eHq6EssaHcwBzIC6zRmvgJHB6ofcJeEA";
let url = "js/obj.json";

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const galery = document.querySelector('.galery');
const img = document.querySelectorAll('.img');

async function getImage() {
  const res = await fetch(url);
  const data = await res.json();
  console.log('data', data);
  randomImg(data);
}

let objElem;
/*******************
Получение случайного изображения
*******************/
function randomImg(obj) {
  let random = obj[Math.floor(Math.random() * obj.length)];
  objElem = random;
  console.log('objElem', objElem);
  console.log('objElemUrl', objElem.urls);
  console.log('objElemUrlSmall', objElem.urls.small);
}


/*******************
События
*******************/
document.addEventListener("DOMContentLoaded", getImage);

//btn.addEventListener("click", getImage);



console.log('js code complete frontend200tb image-galery');