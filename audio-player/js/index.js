console.log('start');

const audio = document.querySelector('.audio');
const playBtn = document.querySelector('.play-btn');
const playTime = document.querySelector('.play-time');
const currentTime = document.querySelector('.current-time');
const trackTime = document.querySelector('.track-time');
const speakerBtn = document.querySelector('.speaker-btn');
const volumeNum = document.querySelector('.volume-num');
const volumeRange = document.querySelector('.volume-range');
const leftBtn = document.querySelector('.left-btn');
const title = document.querySelector('.title');
const rightBtn = document.querySelector('.right-btn');

console.log ('audio', audio);
console.log ('playBtn', playBtn);
console.log ('playTime', playTime);
console.log ('currentTime', currentTime);
console.log ('speakerBtn', speakerBtn);
console.log ('volumeNum', volumeNum);
console.log ('volumeRange', volumeRange);
console.log ('leftBtn', leftBtn);
console.log ('title', title);
console.log ('rightBtn', rightBtn);

let isPlay = false;
let currentVolume = 100;

const play = () => audio.play();
const pause = () => audio.pause();
const changePlayBtn = () => playBtn.classList.toggle('pause');
const changeSpeakerBtn = () => speakerBtn.classList.toggle('mute');


/*******************
Кнопка Play и время
*******************/
// Клик на кнопке play
const clickPlay = (e) => {
  if (isPlay === false) {
    isPlay = true;
    play();
  } else {
    isPlay = false;
    pause();
  };
  
  changePlayBtn();
}

// Клик на кнопке play
playBtn.addEventListener('click', clickPlay);


//Время равно времени трека
audio.onloadedmetadata = function () {
  currentTime.max = audio.duration;
  let sec_num = audio.duration;
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (hours < 10) {
    hours   = "0"+hours;
  }
  if (minutes < 10) {
    minutes = "0"+minutes;
  }
  if (seconds < 10) { seconds = "0"+seconds; } 

  trackTime.innerHTML = minutes + ':' + Math.floor(seconds); 
};

//функция вывода текущего времени воспроизведения
audio.ontimeupdate = function () {

    var sec_num = audio.currentTime;
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    seconds=Math.round(seconds);

    if (hours < 10) {
      hours   = "0"+hours;
    }
    if (minutes < 10) {
      minutes = "0"+minutes;
    }
    if (seconds < 10) { seconds = "0"+seconds; } playTime.innerHTML = minutes+':'+seconds; 
    if(audio.classList.contains("isPlay")) currentTime.value = audio.currentTime; 
};

//функция для установки начала воспроизведения
currentTime.onchange=function() { 

  audio.pause(); audio.currentTime = currentTime.value; audio.play(); 
};

console.log(audio);


/*******************
Кнопка и регулятор громкости
*******************/
// Клик на кнопке вкл/выкл громкости
const clickVolume = () => {

  if (volumeRange.value == 0) {
    volumeRange.value = currentVolume; 
    audio.volume = 1;
    volumeNum.innerHTML = volumeRange.value;
  }
  else {
    currentVolume = volumeRange.value;
    volumeRange.value = 0; 
    audio.volume = 0;
    volumeNum.innerHTML = volumeRange.value;
  }

  changeSpeakerBtn();
}

// Изменение регулятора громкости
const changeVolume = () => { 
  audio.volume = volumeRange.value/100;
  volumeNum.innerHTML = volumeRange.value;
  if(volumeRange.value == 0 && !speakerBtn.classList.contains('mute')) { 
    speakerBtn.classList.add('mute');
  }
  if(volumeRange.value != 0 && speakerBtn.classList.contains('mute')) { 
    speakerBtn.classList.remove('mute');
  }
};


// Клик на кнопке вкл/выкл громкости
speakerBtn.addEventListener('click', clickVolume);
// Изменение регулятора громкости
volumeRange.addEventListener('change', changeVolume);


/*******************
Смена песни
*******************/
import tracks from './tracklist.js';

console.log(tracks);