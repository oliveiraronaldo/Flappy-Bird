# Flappy-Bird

Trabalho Programação de Jogos Digitais - ADS - IFTM

Trabalho consiste em recriar o jogo Flappy Bird utilizando o Phaser game framework

comandos para iniciar o jogo

no terminal:

npm install phaser

npm run dev

BIRD
  - precisa ganhar altitude
  - ter, pelo menos, uma textura para a subida e uma para a descida
  - se colidir com o chão, o "teto" ou os canos o jogo acaba
  - a opção de colocar uma skin masculina e feminina (numa tela inicial)

CANOS
  - devem ter sempre a mesma distância vertical e horizontal entre eles
  - a posição do espaço vertical entre eles deve ser aleatório (dentro de um intervalo)
  - eles devem ser reposicionados sempre que saírem da tela (não criar canos infinitos para sobrecarregar a memória)
  - ao passar pelos canos, aumente a pontuação (exibir a pontuação na tela)

TELA DE GAME OVER
  - deve mostrar a pontuação
  - opção de jogar novamente
