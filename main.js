import { AUTO, Game } from 'phaser';
import level from './src/scenes/level';
import GameOver from './src/scenes/GameOver';
import First  from './src/scenes/First'

const config = {
  width: 288,
  height: 512,
  zoom: 1.5,
  type: AUTO,
  scene: [First, GameOver, level],
  physics: {
    default: 'arcade',
    arcade:{
      gravity:{
        y:500, 
      },
      debug: false,
    }
  }
}

new Game(config);