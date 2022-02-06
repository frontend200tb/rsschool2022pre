console.log('start frontend200tb random-jokes');

const btn = document.querySelector(".btn");
const content = document.querySelector(".content");

async function getJock() {
  const jokeData = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  });
  const jokeObj = await jokeData.json();
  content.innerHTML = jokeObj.joke;
  console.log(jokeData);
}

document.addEventListener("DOMContentLoaded", getJock);

btn.addEventListener("click", getJock);


console.log('js code complete frontend200tb random-jokes');