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

const toggleTimerButton = document.querySelector('.toggle-timer');

const textButtonPlay = "<i class='ph ph-play'></i>";
const textButtonPause = "<i class='ph ph-pause'></i>";

const alertSoundUrl = 'src/agradeceu e trocou-girl.mp3';

let index = 0;
let timeInterval;
let isPlaying = false;
let isTimerActive = false;

function playPauseMusic(){
    if(player.paused){
        player.play();
        playPause.innerHTML = textButtonPause;
        if (isTimerActive) {
            startTimer();
        }
    } else {
        player.pause();
        playPause.innerHTML = textButtonPlay;
        if (isTimerActive) {
            stopTimer();
        }
    }
}

function updateTime(){
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = `${currentMinutes}:${formatZero(currentSeconds)}`;

    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = `${durationMinutes}:${formatZero(durationSeconds)}`;

    const progressWidth = durationFormatted ? 
    (player.currentTime / durationFormatted) * 100: 0;
    progress.style.width = progressWidth + "%";
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

function startTimer() {
    if(isPlaying) return;
    isPlaying = true;

    const alertSound = new Audio(alertSoundUrl);
    const timeInput = document.getElementById('timeInput').value;
    const countdounwTime = parseInt(timeInput) * 1000;

    timeInterval = setInterval(() => {
        if (!isPlaying) return;

        alertSound.play();

    }, countdounwTime);
};

function stopTimer() {
    isPlaying = false;
    clearInterval(timeInterval);
}

function toggleTimer() {
    isTimerActive = !isTimerActive;
    toggleTimerButton.textContent = isTimerActive ? 'Stop' : 'Go';
}

function handleModal() {
    const buttonConfigModal = document.querySelector('.config__modal');
    const modalContainer = document.querySelector('modalContainer');

    buttonConfigModal.addEventListener("click", () => {
        modalContainer.showModal();
    }); 
}

function closeModal() {
    const button = document.querySelector('modalButtonClose');
    const modalContainer = document.querySelector('modalContainer');

    button.addEventListener("click", () => {
        modalContainer.close();
    });
}

handleModal();
closeModal();

playPause.onclick = () => playPauseMusic();
prev.onclick = () => prevNextMusic('prev');
next.onclick = () => prevNextMusic();
volumeSlider.onchange = () => setVolume();
random.onclick = () => randomMusic();
toggleTimerButton.onclick = () => toggleTimer();
player.ontimeupdate = () => updateTime();
player.onended = () => prevNextMusic('next');

prevNextMusic("init");