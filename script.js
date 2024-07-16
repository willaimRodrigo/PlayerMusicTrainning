import { songsArrays, updateSongs } from "./songs.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.cicle').forEach(button => {
        button.addEventListener('click', (e) => {
            const cicle = e.target.dataset.cicle;
            const selectedSongs = songsArrays[cicle];
            updateSongs(selectedSongs);
        });
    });

    const musicLoad = document.querySelector('.cicle');
        if(musicLoad) {
        musicLoad.click();
}
});