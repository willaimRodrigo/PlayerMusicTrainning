import songs from "./songs.js";

function initiPlayers(playerId, sectionId) {
    const player = document.querySelector(`#${playerId}`);
    const section = document.querySelector(`#${sectionId}`);
    const nameMusic = section.querySelector('.musicName');
    const bandName = section.querySelector('.bandName');
    const volumeSlider = section.querySelector('.volumeSlider');

    const random = section.querySelector('.random');
    const prev = section.querySelector('.prev');
    const playPause = section.querySelector('.play');
    const next = section.querySelector('.next');

    const progress = section.querySelector('.progress');
    const currentTime = section.querySelector('.currentTime');
    const duration = section.querySelector('.duration');
    const musicSelect = section.querySelector('.musicSelect');

    const toggleTimerButton = section.querySelector('.toggle-timer');

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
        if((type === 'next' && index++ === songs.length) || type === 'init'){
            index = 0;
        } else if (type == 'prev' && index == 0){
            index = songs.length;
        } else {
            index = type === 'next' ? index++ : index - 1;
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
        let randomIndex = Math.floor(Math.random() * songs.length);
        index = randomIndex;

        player.src = songs[index].src;
        nameMusic.innerHTML = songs[index].name;
        bandName.innerHTML = songs[index].band;

        playPauseMusic();
    }

    function startTimer() {
        if(!isPlaying) {
                console.log("start timer...");
                const originalVolume = player.volume;
                player.volume = 0.5;

                const alertSound = new Audio(alertSoundUrl);
                const timeInput = section.querySelector('.timeInput').value;
                const countdounwTime = parseInt(timeInput) * 1000;

                alertSound.addEventListener('ended', () => {
                    console.log("alert ended")
                    player.volume = originalVolume;
                });

                timeInterval = setInterval(() => {
                    if (!isPlaying) return;

                    alertSound.currentTime = 0;
                    alertSound.play();
                    console.log("alert init");

        }, countdounwTime);

        console.log("init");
        }
        // isPlaying = false; 
    };

    function stopTimer() {
        // isPlaying = false;
        clearInterval(timeInterval);
        console.log("stop");
    }

    function toggleTimer() {
        isTimerActive = !isTimerActive;
        toggleTimerButton.textContent = isTimerActive ? 'Stop' : 'Go';
        if (!isTimerActive) {
            stopTimer();
        } else if (isPlaying) {
            startTimer();
        }
    }

    function populateMusicSelector() {
        songs.forEach((song, i) => {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = song.name;
            musicSelect.appendChild(option);

            return musicSelect;
        });

        musicSelect.addEventListener('change', (e) => {
            index = e.target.value;
            player.src = songs[index].src;
            nameMusic.innerHTML = songs[index].name;
            bandName.innerHTML = songs[index].band;
            
            playPauseMusic();
        });
    }

    playPause.onclick = () => {
        
        if (player.play) {
            startTimer();
        } else if (player.paused){
            stopTimer();
        }
        playPauseMusic();
    };

    playPause.onclick = () => playPauseMusic();
    prev.onclick = () => prevNextMusic('prev');
    next.onclick = () => prevNextMusic();
    volumeSlider.oninput = () => setVolume();
    random.onclick = () => randomMusic();
    toggleTimerButton.onclick = () => toggleTimer();
    player.ontimeupdate = () => updateTime();
    player.onended = () => prevNextMusic('next');

    populateMusicSelector();
    prevNextMusic("init");

}

initiPlayers('player1', 'playerSection1');