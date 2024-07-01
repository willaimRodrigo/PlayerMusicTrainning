
export function initiPlayers(playerId, sectionId, songs) {
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
            index = (index + 1 ) % songs.length;
        } else if (type == 'prev' && index === 0){
            index = (index - 1 + songs.length) % songs.length;
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

    function populateMusicSelector() {

        musicSelect.innerHTML = '';
        
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

    playPause.onclick = () => playPauseMusic();
    prev.onclick = () => prevNextMusic('prev');
    next.onclick = () => prevNextMusic();
    volumeSlider.oninput = () => setVolume();
    random.onclick = () => randomMusic();
    player.ontimeupdate = () => updateTime();
    player.onended = () => prevNextMusic('next');

    populateMusicSelector();
    prevNextMusic("init");

}
