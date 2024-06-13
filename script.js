import songs from "./songs.js";

const player = document.querySelector('#player');
const nameMusic = document.querySelector('.musicName');
const bandName = document.querySelector('.bandName');
const volumeSlider = document.querySelector('.volumeSlider');

const random = document.querySelector('.random');
const prev = document.querySelector('.prev');
const playPause = document.querySelector('.play');
const next = document.querySelector('.next');

const progress = document.querySelector('.progress');
const currentTime = document.querySelector('.currentTime');
const duration = document.querySelector('.duration');

const textButtonPlay = "<i class='ph ph-play'></i>";
const textButtonPause = "<i class='ph ph-pause'></i>";

let index = 0;

function playPauseMusic(){
    if(player.paused){
        player.play();
    playPause.innerHTML = textButtonPause;
    } else {
        player.pause();
        playPause.innerHTML = textButtonPlay;
    }
}

function updateTime(){
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidht = durationFormatted ? 
    (playPauseMusic.currentTime / durationFormatted) * 100: 0;
    progress.computedStyleMap.width = progressWidht + "%";
}

const formatZero = (n) => (n < 10 ? "0" + n : n);

function prevNextMusic(type ='next') {
    if((type == "next" && index + 1 === songs.length) || type === 'init'){
        index = 0;
    } else if (type == 'prev' && index == 0){
        index = songs.length;
    } else {
        index = type === "prev" && index ? index - 1 : index + 1;
    }

    player.src = songs[index].src;
    nameMusic.innerHTML = songs[index].name;
    bandName.innerHTML = songs[index].band;

    if (type !== "init") playPauseMusic();

    updateTime();
}

function setVolume(){
    player.volume = volumeSlider.value / 100;
}

function randomMusic() {
    let randomIndex = Number.parseInt(Math.random() * songs.length);
    index = randomIndex;

    player.src = songs[index].src;
    nameMusic.innerHTML = songs[index].name;
    bandName.innerHTML = songs[index].band;

    playPauseMusic();
}

playPause.onclick = () => playPauseMusic();
prev.onclick = () => prevNextMusic('prev');
next.onclick = () => prevNextMusic();
volumeSlider.onchange = () => setVolume();
random.onclick = () => randomMusic();
player.ontimeupdate = () => updateTime();

prevNextMusic("init");