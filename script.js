import { songsArrays, updateSongs } from "./songs.js";

document.addEventListener("DOMContentLoaded", () => {
    const cicleButtons = document.querySelectorAll('.cicle');


    cicleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cicle = e.target.dataset.cicle;
            const selectedSongs = songsArrays[cicle];
            updateSongs(selectedSongs);

            cicleButtons.forEach(btn => btn.classList.remove('selected'));

            e.target.classList.add('selected');
        });
    });

    const musicLoad = document.querySelector('.cicle');
        if(musicLoad) {
        musicLoad.click();
}
});