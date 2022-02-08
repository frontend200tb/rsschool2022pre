console.log('start frontend200tb random-jokes');
const quotes = [
  { 
   "quote" : "Home is where you’re surrounded by other critters that care about you", 
   "author" : "Sandy Cheeks" 
  },
  {
   "quote" : "If you believe in yourself and with a tiny pinch of magic, all your dreams can come true", 
   "author" : "Spongebob"
  },
  {
   "quote" : "Sometimes we have to go deep inside ourselves to solve our problems", 
   "author" : "Patrick Star"
  },
  {
   "quote" : "I’ll have you know that I stubbed by toe last week and only cried for 20 minutes", 
   "author" : "Spongebob"
  },
  {
   "quote" : "It’s not always what you say that matters, sometimes it’s what you don’t say", 
   "author" : "Krabs"
  },
  {
  "quote" : "I know of a place where you never get harmed. A magical place with magical charm. Indoors. Indoors. Indoors", 
  "author" : "Spongebob"
  },
  {
   "quote" : "Good people don’t rip other people’s arms off", 
   "author" : "Spongebob"
  },
  {
   "quote" : "Dumb people are always blissfully unaware of how dumb they really are…", 
   "author" : "Patrick Star"
  },
  {
   "quote" : "You’re a man now, SpongeBob, and it’s time you started acting like one", 
   "author" : "Patrick Star"
  },
  {
   "quote" : "I’m ugly and I’m proud", 
   "author" : "SpongeBob"
  },
  {
   "quote" : "That’s it mister! You just lost your brain privileges!", 
   "author" : "Plankton"
  },
  {
   "quote" : "Excuse me, sir, but you’re sitting on my body, which is also my face", 
   "author" : "Spongebob"
  },
  {
   "quote" : "This is not your average, everyday darkness. This is…ADVANCED darkness. Hey, if I close my eyes it doesn’t seem so dark", 
   "author" : "SpongeBob"
  },
  {
   "quote" : "Too bad SpongeBob’s not here to enjoy Spongebob not being here", 
   "author" : "Squidward"
  },
  {
    "quote" : "With imagination, you can be anything you want", 
    "author" : "Spongebob"
   },
   {
    "quote" : "Well, it’s no secret that the best thing about a secret is secretly telling someone your secret, thereby adding another secret to their secret collection of secrets, secretly", 
    "author" : "SpongeBob"
   },
   {
    "quote" : "You’ll never get what you want if you always let people step on you", 
    "author" : "Plankton"
   },
   {
    "quote" : "Run Mr. Krabs! Run like you’re not in a coma!", 
    "author" : "Spongebob"
   }
]

const spongebobImgs = [
  { 
   "image" : "assets/img/1.png"
  },
  { 
   "image" : "assets/img/2.png"
  },
  { 
   "image" : "assets/img/3.png"
  },
  { 
   "image" : "assets/img/4.png"
  },
  { 
   "image" : "assets/img/5.png"
  },
  { 
   "image" : "assets/img/6.png"
  },
  { 
   "image" : "assets/img/7.png"
  },
  { 
   "image" : "assets/img/8.png"
  },
  { 
   "image" : "assets/img/9.png"
  },
  { 
   "image" : "assets/img/10.png"
  },
  { 
   "image" : "assets/img/11.png"
  },
  { 
   "image" : "assets/img/12.png"
  },
  { 
   "image" : "assets/img/13.png"
  },
  { 
   "image" : "assets/img/14.png"
  },
  { 
   "image" : "assets/img/15.png"
  },
  { 
   "image" : "assets/img/16.png"
  },
  { 
   "image" : "assets/img/17.png"
  },
  { 
   "image" : "assets/img/18.png"
  }
]

const img = document.querySelector(".img");
const btn = document.querySelector(".btn");
const content = document.querySelector(".content");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

function randomQuote() {
  let random = quotes[Math.floor(Math.random() * quotes.length)];
  quote.innerText = `“${random.quote}.”`;
  author.innerText = random.author;
}

function randomImg() {
  let random = spongebobImgs[Math.floor(Math.random() * spongebobImgs.length)];
  img.src = random.image;
}

document.addEventListener("DOMContentLoaded", randomQuote);
document.addEventListener("DOMContentLoaded", randomImg);

btn.addEventListener("click", randomQuote);
btn.addEventListener("click", randomImg);

console.log('js code complete frontend200tb random-jokes');