import 'phaser'
import LevelOneScene from './scenes/LevelOneScene'
import LevelTwoScene from './scenes/LevelTwoScene'
import PreloaderScene from './scenes/PreloaderScene'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300, x: 0 },
      debug: true,
    },
  },
  scene: [PreloaderScene, LevelOneScene, LevelTwoScene],
}

const game = new Phaser.Game(config)
