import { initiPlayers } from './player.js';
import { branca } from './white.js';
import { azul } from './blue.js';
import { azulAv } from './blueav.js';
import { preta } from './black.js';

export const songsArrays = {
    branca,
    azul,
    azulAv,
    preta,
};

export function updateSongs(songs) {
    initiPlayers('player1', 'playerSection1', songs);
}