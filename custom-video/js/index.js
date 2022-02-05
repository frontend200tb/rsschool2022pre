console.log('start');

const player = document.querySelector('.player');
const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playBtn = document.querySelector('.play-btn');
const ranges = document.querySelectorAll('.player__range');
const skipBtns = document.querySelectorAll('[data-skip]');
const log = document.querySelector('.log');

let isPlay = false;
let currentVolume = 100;

const play = () => video.play();
const pause = () => video.pause();
const changePlayBtn = () => playBtn.classList.toggle('pause');
const changeSpeakerBtn = () => speakerBtn.classList.toggle('mute');


/***************
Build out functions
***************/
function clickPlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function skip() {
  log.textContent = this.dataset.skip;
  video.currentTime += parseFloat(this.dataset.skip);
}

function changeRange() {
  video[this.name] = this.value;
  log.textContent = this.name;
  log.textContent += this.value;
}

function changeProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  log.textContent += percent;
  progressBar.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  log.textContent = e;
  video.currentTime = scrubTime;
}


/***************
Hook up the event listeners
***************/
video.addEventListener('click', clickPlay);
video.addEventListener('play', changePlayBtn);
video.addEventListener('pause', changePlayBtn);
video.addEventListener('timeupdate', changeProgress);

playBtn.addEventListener('click', clickPlay);

skipBtns.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', changeRange));
ranges.forEach(range => range.addEventListener('mousemove', changeRange));

let isMousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isMousedown && scrub(e));
progress.addEventListener('mousedown', () => isMousedown = true);
progress.addEventListener('mouseup', () => isMousedown = false);