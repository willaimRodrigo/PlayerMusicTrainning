
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

    function setVolume(volume){
        player.volume = volume/ 100;
    }
    
    volumeSlider.addEventListener('input', () => {
        setVolume(volumeSlider.value);
    });

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

    // function populateMusicOptions() {
    //     const music1Select = document.getElementById('music1');
    //     const music2select = document.getElementById('music2');

    //     music1Select.innerHTML = '';
    //     music2select.innerHTML = '';

    //     songs.forEach((song, index) => {
    //         const option1 = document.createElement('option');
    //         option1.value = index;
    //         option1.textContent = `${song.name}`;
    //         music1Select.appendChild(option1);

    //         const option2 = document.createElement('option');
    //         option2.value = index;
    //         option2.textContent = `${song.name}`;
    //         music2select.appendChild(option2);
    //     });
    // }

    // document.getElementById('startPlayback').addEventListener('click', function() {
    //     const music1Index = document.getElementById('music1').valeu;
    //     const music2Index = document.getElementById('music2').value;

    //     const music1Time = 75 * 1000;
    //     const music2Time = 150 * 1000;

    //     playPauseMusic(songs[music1Index].src, music1Time);
    //     setTimeout(() => {
    //         playPauseMusic(songs[music2Index].src, music2Time);
    //     }, music1Time);
    // });

    // function playMusic(songSrc, duration) {
    //     console.log(`Reproduzindo ${songSrc} por ${duration / 1000} segundos.`);
    // }

    // playMusic();
    // populateMusicOptions();


    playPause.onclick = () => playPauseMusic();
    prev.onclick = () => prevNextMusic('prev');
    next.onclick = () => prevNextMusic();
    setVolume(30);
    random.onclick = () => randomMusic();
    player.ontimeupdate = () => updateTime();
    player.onended = () => prevNextMusic('next');

    populateMusicSelector();
    prevNextMusic("init");

}
