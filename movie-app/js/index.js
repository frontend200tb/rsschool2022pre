console.log("start frontend200tb image-galery");

/*******************
Константы
*******************/
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const gallery = document.querySelector(".gallery");

const apiKey = "04056a5d13047223c38ade54b0960adf";
let searchQuery;
let urlApi = "./js/obj.json";

/*******************
Получение данных от API при загрузке страницы
*******************/
async function getMovie() {
  event.preventDefault();
  console.log("вошли в функцию");

  // очистка галереи перед получением данных
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }

  searchQuery = input.value || "fight";
  const urlMovie = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`;
  const response = await fetch(urlMovie);
  const data = await response.json();
  const dataAr = data.results;
  gallery.innerHTML = "";
  if (dataAr.length === 0) {
    emptyResult();
  } else {
    dataAr.forEach((elem) => gallery.append(displayMovie(elem)));
  }
  showDescription();
  console.log("data", data);
}

function displayMovie(json) {
  const movie = document.createElement("div");
  movie.classList.add("movie");
  const moviePoster = document.createElement("div");
  moviePoster.classList.add("movie__poster", "active");
  try {
    moviePoster.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280${json.poster_path}")`;
  } catch (err) {
    console.log(err);
  }
  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container");
  const descriptionText = document.createElement("p");
  descriptionText.classList.add("description__text");
  descriptionText.textContent = json.overview;
  descriptionContainer.append(descriptionText);
  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movie__info");
  const movieName = document.createElement("h3");
  movieName.classList.add("movie__name");
  movieName.textContent = json.title;
  const bottomSection = document.createElement("div");
  bottomSection.classList.add("bottom_section");
  const movieYear = document.createElement("span");
  movieYear.classList.add("movie__year");
  let year, other;
  try {
    [year, ...other] = json.release_date.split("-");
  } catch (err) {
    console.log(err);
    year = "unknown";
  }

  movieYear.textContent = year;
  const movieRating = document.createElement("span");
  movieRating.classList.add("movie__rating");
  movieRating.textContent = json.vote_average;
  switch (true) {
    case +json.vote_average >= 8:
      movieRating.style.color = "green";
      break;
    case +json.vote_average <= 5:
      movieRating.style.color = "red";
      break;
    default:
      movieRating.style.color = "orange";
  }
  bottomSection.append(movieYear, movieRating);
  movieInfo.append(movieName, bottomSection);
  movie.append(moviePoster, descriptionContainer, movieInfo);
  return movie;
}

function showDescription() {
  const posters = document.querySelectorAll(".movie__poster");
  const descriptions = document.querySelectorAll(".description-container");
  posters.forEach((elem) =>
    elem.addEventListener("click", () => {
      elem.classList.toggle("active");
      elem.nextElementSibling.classList.toggle("active");
    })
  );
  descriptions.forEach((elem) =>
    elem.addEventListener("click", () => {
      elem.classList.toggle("active");
      elem.previousElementSibling.classList.toggle("active");
    })
  );
}

// /*******************
// События
// *******************/
document.addEventListener("DOMContentLoaded", getMovie);
form.addEventListener("submit", getMovie);

console.log("js code complete frontend200tb image-galery");
