console.log('start frontend200tb random-jokes');

const btn = document.querySelector(".btn");
const content = document.querySelector(".content");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

// async function getJock() {
//   const jokeData = await fetch("https://icanhazdadjoke.com/", {
//     headers: {
//       Accept: "application/json"
//     }
//   });
//   const jokeObj = await jokeData.json();
//   content.innerHTML = jokeObj.joke;
//   console.log(jokeData);
// }

// document.addEventListener("DOMContentLoaded", getJock);

// btn.addEventListener("click", getJock);



// function randomQuote() {
//   let random = quotes[Math.floor(Math.random() * quotes.length)];
//   quote.innerText = `“${random.quote}.”`;
//   author.innerText = random.author;
// }

async function getPhrase() {
  const phraseData = await fetch("./js/spungebob.json");
  const jokeObj = await phraseData.json();
  content.innerHTML = jokeObj.quotes;
  console.log(phraseData);
}


document.addEventListener("DOMContentLoaded", getPhrase);

btn.addEventListener("click", getPhrase);

console.log('js code complete frontend200tb random-jokes');