console.log("start frontend200tb image-galery");

/*******************
Константы
*******************/
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const gallery = document.querySelector(".gallery");

const apiId = "hwxC3T49Lg8eHq6EssaHcwBzIC6zRmvgJHB6ofcJeEA";
let searchQuery;
let urlApi = "./js/obj.json";

/*******************
Получение данных от API при загрузке страницы
*******************/
async function getImage() {
  event.preventDefault();
  console.log("вошли в функцию");
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
  searchQuery = input.value || "random";
  const urlImg = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=12&&client_id=${apiId}`;
  const response = await fetch(urlImg);
  const data = await response.json();
  console.log("data", data);
  displayImg(data);
}

function displayImg(json) {
  json.results.forEach((result) => {
    const url = result.urls.small;
    console.log("url", url);
    const unsplashLink = result.links.html;

    gallery.insertAdjacentHTML(
      "beforeend",
      `<div>
				<a href="${unsplashLink}" target="_blank">
					<div class="img" style="background-image: url(${url});"></div>
				</a>
			</div>`
    );
  });
}

/*******************
События
*******************/
document.addEventListener("DOMContentLoaded", getImage);
form.addEventListener("submit", getImage);

console.log("js code complete frontend200tb image-galery");
