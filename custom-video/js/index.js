console.log('start');

const player = document.querySelector('.player');
const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const currentTime = document.querySelector('.current-time');
const playBtn = document.querySelector('.play-btn');
const playTime = document.querySelector('.play-time');
const trackTime = document.querySelector('.track-time');
const ranges = document.querySelectorAll('.player__range');
const skipBtns = document.querySelectorAll('[data-skip]');
const log = document.querySelector('.log');


/*******************
Кнопка Play и время
*******************/
let isPlay = false;
let currentVolume = 100;

// Play / Pause
const play = () => video.play();
const pause = () => video.pause();

// Изменение кнопки play
const changePlayBtn = () => playBtn.classList.toggle('pause');
const changeSpeakerBtn = () => speakerBtn.classList.toggle('mute');

// Клик на кнопке play
const clickPlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Клик на кнопке play
playBtn.addEventListener('click', clickPlay);

// Клик по видео
video.addEventListener('click', clickPlay);

video.addEventListener('play', changePlayBtn);
video.addEventListener('pause', changePlayBtn);


//Время равно времени трека
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


//функция вывода текущего времени воспроизведения
video.ontimeupdate = function () {

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
  if(video.classList.contains("isPlay")) currentTime.value = video.currentTime; 
};


//функция для установки начала воспроизведения
currentTime.onchange=function() { 

video.pause(); video.currentTime = currentTime.value; video.play(); 
};


/*******************
Progress Bar время
*******************/
function changeProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  log.textContent += percent;
  currentTime.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  log.textContent = e;
  video.currentTime = scrubTime;
}


let isMousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isMousedown && scrub(e));
progress.addEventListener('mousedown', () => isMousedown = true);
progress.addEventListener('mouseup', () => isMousedown = false);


video.addEventListener('timeupdate', changeProgress);



/*******************
Кнопки 25с вперед, 10с назад
*******************/
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function changeRange() {
  video[this.name] = this.value;
}

skipBtns.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', changeRange));
ranges.forEach(range => range.addEventListener('mousemove', changeRange));


