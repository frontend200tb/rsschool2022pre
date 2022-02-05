console.log('start');

const player = document.querySelector('.player');
const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const currentTime = document.querySelector('.current-time');
const playBtn = document.querySelector('.play-btn');
const playTime = document.querySelector('.play-time');
const trackTime = document.querySelector('.track-time');
const speakerBtn = document.querySelector('.speaker-btn');
const volumeNum = document.querySelector('.volume-num');
const volumeRange = document.querySelector('.volume-range');
const speedNum = document.querySelector('.speed-num');
const speedRange = document.querySelector('.speed-range');
const skipBtns = document.querySelectorAll('.skip-btn');


/*******************
Кнопка Play
*******************/
const play = () => video.play();
const pause = () => video.pause();

// Изменение кнопки play
const changePlayBtn = () => {
  video.paused ? playBtn.classList.remove('pause') : playBtn.classList.add('pause');
};

// Клик на кнопке play
const clickPlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

// Клик на кнопке play
playBtn.addEventListener('click', clickPlay);

// Клик по видео
video.addEventListener('click', clickPlay);

video.addEventListener('play', changePlayBtn);
video.addEventListener('pause', changePlayBtn);


/*******************
Время трека
*******************/
const getTrackTime = () => {
  currentTime.max = video.duration;
  let sec_num = video.duration;
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

video.addEventListener('loadeddata', getTrackTime);


/*******************
Текущее время
*******************/
const changeTime = () => {

  var sec_num = video.currentTime;
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
  currentTime.value = video.currentTime; 
};

video.addEventListener('timeupdate', changeTime);


/*******************
Изменение ползунка текущего времени
*******************/
const changeCurrentTime = () => {
  pause(); 
  video.currentTime = currentTime.value; 
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
    video.volume = volumeRange.value / 100;
    volumeNum.innerHTML = volumeRange.value;
  }
  else {
    currentVolume = volumeRange.value;
    volumeRange.value = 0; 
    video.volume = 0;
    volumeNum.innerHTML = volumeRange.value;
  }

  changeSpeakerBtn();
};

// Клик на кнопке вкл/выкл громкости
speakerBtn.addEventListener('click', clickVolume);


/*******************
Изменение регулятора громкости
*******************/
const changeVolume = () => { 
  video.volume = volumeRange.value / 100;
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
Progress Bar время
*******************/
function changeProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  currentTime.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


let isMousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isMousedown && scrub(e));
progress.addEventListener('mousedown', () => isMousedown = true);
progress.addEventListener('mouseup', () => isMousedown = false);


video.addEventListener('timeupdate', changeProgress);


/*******************
Изменение скорости
*******************/
const changeSpeed = () => { 
  video.playbackRate = speedRange.value;
  speedNum.textContent = speedRange.value;
};

//Изменение регулятора громкости
speedRange.addEventListener('click', changeSpeed);
speedRange.addEventListener('mousemove', changeSpeed);


/*******************
Кнопки 25с вперед, 10с назад
*******************/
function skip () {
  video.currentTime += parseFloat(this.dataset.skip);
};

skipBtns.forEach(button => button.addEventListener('click', skip));