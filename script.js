import { songsArrays, updateSongs } from "./songs.js";
import { videoLinks } from "./video.js";

document.addEventListener("DOMContentLoaded", () => {
    const cicleButtons = document.querySelectorAll('.cicle');
    const videoLinksContainer = document.querySelector('#videoLinksContainer');

    const cachePlaylist = localStorage.getItem('cachePlaylist');
    if(cachePlaylist) {
        const savedSongs = JSON.parse(cachePlaylist);
        updateSongs(savedSongs);
    }

    const savedPlayList = localStorage.getItem('selectedCicle');
    if (savedPlayList && songsArrays[savedPlayList]) {
        updateSongs(songsArrays[savedPlayList]);

        cicleButtons.forEach(btn => {
            if (btn.dataset.cicle === savedPlayList) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    } else {
        const musicLoad = document.querySelector('.cicle');
        if (musicLoad) {
            musicLoad.click();
        }
    }

    cicleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cicle = e.target.dataset.cicle;
            const selectedSongs = songsArrays[cicle];
            updateSongs(selectedSongs);

            videoLinksContainer.innerHTML = '';

            const links = videoLinks[cicle] || [];
            links.forEach(link => {
                const videoLinkElement = document.createElement('a');
                videoLinkElement.href = link;
                videoLinkElement.target = "_blank";
                videoLinkElement.textContent = "Passos que inspiram!";
                videoLinksContainer.appendChild(videoLinkElement);

                const br = document.createElement('br');
                videoLinksContainer.appendChild(br);
                
            })

            localStorage.setItem('selectedCicle', cicle);

            cicleButtons.forEach(btn => btn.classList.remove('selected'));

            e.target.classList.add('selected');
        });
    });

    
});









