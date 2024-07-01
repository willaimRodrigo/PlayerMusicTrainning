import { initiPlayers } from './player.js';
import { azulAv } from './blueav.js';
import { preta } from './black.js';

export const songsArrays = {
    azulAv,
    preta,
};

export function updateSongs(songs) {
    initiPlayers('player1', 'playerSection1', songs);
}