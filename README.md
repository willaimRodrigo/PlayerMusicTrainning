# Player Music Training

Bem vindo ao player de música dinâmico.

<p>player-music-trainning.vercel.app</p>

Este projeto permite carregar e reproduzir músicas de diferentes playlists. Ele inclui funcionalidades como reprodução aleatória, ajuste de volume e timers para alertas sonoros.

Essa aplicação foi pensada para uso especifíco de treino de dança e exame de nível de dança (especifico para forró).

Há um timer que funciona independente da música que está tocando, seu tempo é ajustável.

O segundo é uma simulação do exame de nivelamento, já contendo a configuração de tempo e a troca de música após 1:20 da primeira música, acompanhado com a redução da música e um delay antes da próxima que tocará por 2:30, contendo um aviso sonoro e ao término do tempo, encerrando a música! 

Aplicação pensada para mobile!

## Funcionalidades

- Carregar playlists dinamicamente ao clicar em botões.
- Reproduzir músicas aleatoriamente a partir de várias playlists.
- Ajustar o volume do player.
- Funções de temporizador para alertas sonoros.
- Destacar a playlist selecionada.

## Estrutura do Projeto

### `songs.js`

Este arquivo contém arrays de músicas e uma função para atualizar as músicas no player.

```javascript
export const songsArrays = {
    playlist1: [...], // Array de músicas do primeiro array
    playlist2: [...], // Array de músicas do segundo array
    playlist3: [...], // Array de músicas do terceiro array
    playlist4: [...]  // Array de músicas do quarto array
};

export function updateSongs(songs) {
    // Atualiza as músicas no player
}

main.js
Este arquivo contém a lógica principal para carregar e reproduzir músicas, além de configurar os timers e ajustar o volume.

player.js
Este arquivo contém a função initiPlayers, que inicializa o player de música, ajusta o volume e configura os timers.

Contribuição
Sinta-se à vontade para contribuir com este projeto. Se encontrar algum bug ou tiver sugestões para melhorias, abra uma issue ou envie um pull request.