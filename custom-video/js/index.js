/***************
Get elements
***************/
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skipBtns = document.querySelectorAll('[data-skip]');
const log = document.querySelector('.log');


/***************
Build out functions
***************/
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function changePlayBtn() {
  const method = video.paused ? 'play' : 'pause';
  toggle.textContent = method;
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
  progressBar.getElementsByClassName.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  log.textContent = e;
  video.currentTime = scrubTime;
}


/***************
Hook up the event listeners
***************/
video.addEventListener('click', togglePlay);
video.addEventListener('play', changePlayBtn);
video.addEventListener('pause', changePlayBtn);
video.addEventListener('timeupdate', changeProgress);

toggle.addEventListener('click', togglePlay);

skipBtns.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', changeRange));
ranges.forEach(range => range.addEventListener('mousemove', changeRange));

let isMousedown = false
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => isMousedown && scrub(e));
progressBar.addEventListener('mousedown', () => isMousedown = true);
progressBar.addEventListener('mouseup', () => isMousedown = false);