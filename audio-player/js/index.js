console.log('start');

const audio = document.querySelector('.audio');
const playBtn = document.querySelector('.play-btn');
const playTime = document.querySelector('.play-time');
const currentTime = document.querySelector('.current-time');
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

const play = () => audio.play();
const pause = () => audio.pause();
const changePlayBtn = (e) => playBtn.classList.toggle('pause');


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

// Изменение регулятора громкости
const changeVolume = () => { 
  audio.volume = volumeRange.value/100;
  volumeNum.innerHTML = volumeRange.value;
  if(volumeRange.value == 0) { 
     speakerBtn.src="assets/svg/mute.svg"
  }
};

// Клик на кнопке вкл/выкл громкости
const clickVolume = () => {

  if (volumeRange.value == 0) {
    volumeRange.value = 50; audio.volume = 1;
    speakerBtn.src = "assets/svg/speaker.svg";
    volumeNum.innerHTML = volumeRange.value;
  }
  else {
    volumeRange.value = 0; audio.volume = 0;
    speakerBtn.src = "assets/svg/mute.svg";
    volumeNum.innerHTML = volumeRange.value;
  }
}


// Клик на кнопке play
playBtn.addEventListener('click', clickPlay);
// Изменение регулятора громкости
volumeRange.addEventListener('change', changeVolume);
// Клик на кнопке вкл/выкл громкости
speakerBtn.addEventListener('click', clickVolume);