export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' })
  }

  preload() {
    this.load.image('sky', 'assets/img/sky.png')
    this.load.image('bomb', 'assets/img/bomb.png')
    this.load.image('ground', 'assets/img/platform.png')
    this.load.image('star', 'assets/img/star.png')

    this.load.spritesheet('character', 'assets/img/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
  }

  create() {
      this.scene.start("LevelOneScene")
  }
}
