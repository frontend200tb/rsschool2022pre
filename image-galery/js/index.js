console.log('start frontend200tb image-galery');


/*******************
Константы
*******************/
let url = "https://api.unsplash.com/photos/?client_id=hwxC3T49Lg8eHq6EssaHcwBzIC6zRmvgJHB6ofcJeEA";

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const galery = document.querySelector('.galery');
const img = document.querySelectorAll('.img');

async function getImage() {
  const imageData = await fetch(url);
  const obj = await imageData.json();
  randomImg(obj);
}


/*******************
Получение случайного изображения
*******************/
function randomQuote(obj) {
  let random = obj.quotes[Math.floor(Math.random() * obj.quotes.length)];
  quote.innerText = `“${random.quote}.”`;
  author.innerText = random.author;
}

function randomImg(obj) {
  let random = obj[Math.floor(Math.random() * obj.length)];
  img.src = random.urls.small;
}


/*******************
События
*******************/
//document.addEventListener("DOMContentLoaded", getPhrase);
//document.addEventListener("DOMContentLoaded", getImage);

//btn.addEventListener("click", getPhrase);
//btn.addEventListener("click", getImage);



console.log('js code complete frontend200tb image-galery');