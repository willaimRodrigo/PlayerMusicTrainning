import { songsArrays, updateSongs } from "./songs.js";
import { alertTimer } from "./timerAlert.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.cicle').forEach(button => {
        button.addEventListener('click', (e) => {
            const cicle = e.target.dataset.cicle;
            const selectedSongs = songsArrays[cicle];
            updateSongs(selectedSongs);
        });
    });
});

alertTimer();