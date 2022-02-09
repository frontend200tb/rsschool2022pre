console.log('start');

const page = document.querySelector('.page');
const cardPhoto = document.querySelector('.card-photo');
const audio = document.querySelector('.audio');
const playBtn = document.querySelector('.play-btn');
const playTime = document.querySelector('.play-time');
const currentTime = document.querySelector('.current-time');
const trackTime = document.querySelector('.track-time');
const speakerBtn = document.querySelector('.speaker-btn');
const volumeNum = document.querySelector('.volume-num');
const volumeRange = document.querySelector('.volume-range');
const leftBtn = document.querySelector('.left-btn');
const artist = document.querySelector('.artist');
const name = document.querySelector('.name');
const rightBtn = document.querySelector('.right-btn');


/*******************
Кнопка Play
*******************/
const play = () => audio.play();
const pause = () => audio.pause();

// Клик на кнопке play
const clickPlay = () => {
  const method = audio.paused ? 'play' : 'pause';
  audio[method]();
  changePlayBtn();
}

// Клик на кнопке play
playBtn.addEventListener('click', clickPlay);

// Изменение кнопки play
const changePlayBtn = () => {
  audio.paused ? playBtn.classList.remove('pause') : playBtn.classList.add('pause');
}


/*******************
Время трека
*******************/
const getTrackTime = () => {
  currentTime.max = audio.duration;
  let sec_num = audio.duration;
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) {
    hours   = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds; 
  } 

  trackTime.innerHTML = minutes + ':' + Math.floor(seconds);
};

audio.addEventListener('loadeddata', getTrackTime);


/*******************
Текущее время
*******************/
const changeTime = () => {

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
    currentTime.value = audio.currentTime; 
};

audio.addEventListener('timeupdate', changeTime);


/*******************
Изменение ползунка текущего времени
*******************/
const changeCurrentTime = () => {
  pause(); 
  audio.currentTime = currentTime.value; 
  play(); 
};

currentTime.addEventListener('change', changeCurrentTime);


/*******************
Кнопка вкл/выкл громкости
*******************/
let currentVolume = 100;

// Изменение кнопки вкл/выкл громкости
const changeSpeakerBtn = () => speakerBtn.classList.toggle('mute');

// Клик на кнопке вкл/выкл громкости
const clickVolume = () => {

  if (volumeRange.value == 0) {
    volumeRange.value = currentVolume; 
    audio.volume = volumeRange.value / 100;
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

// Клик на кнопке вкл/выкл громкости
speakerBtn.addEventListener('click', clickVolume);


/*******************
Кнопка и регулятор громкости
*******************/
// Изменение регулятора громкости
const changeVolume = () => { 
  audio.volume = volumeRange.value / 100;
  volumeNum.innerHTML = volumeRange.value;
  if(volumeRange.value == 0 && !speakerBtn.classList.contains('mute')) { 
    speakerBtn.classList.add('mute');
  }
  if(volumeRange.value != 0 && speakerBtn.classList.contains('mute')) { 
    speakerBtn.classList.remove('mute');
  }
};

// Изменение регулятора громкости
volumeRange.addEventListener('change', changeVolume);


/*******************
Смена песни
*******************/
import tracks from './tracklist.js';
let currentTrack = 0;

const setTrack = (num) => {
  pause();
  page.style.backgroundImage = `url(${tracks[num].img})`;
  cardPhoto.src = tracks[num].img;
  audio.src = tracks[num].src;
  artist.innerHTML = tracks[num].artist;
  name.innerHTML = tracks[num].name;
  getTrackTime();
  clickPlay();
}

const forward = () => {
  if (currentTrack === tracks.length - 1) {
    currentTrack = 0;
  } else {
    currentTrack++;
  }

  setTrack(currentTrack);
}

const backward = () => {
  if (currentTrack === 0) {
    currentTrack = tracks.length - 1;
  } else {
    currentTrack--;
  }
  
  setTrack(currentTrack);
}

rightBtn.addEventListener('click', forward);
leftBtn.addEventListener('click', backward);


// По окончанию песни перейти на следующую
audio.addEventListener('ended', forward);