export default class LevelOneScene extends Phaser.Scene {
  platforms!: Phaser.Physics.Arcade.StaticGroup
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  stars!: Phaser.Physics.Arcade.Group
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  score: number = 0
  scoreUI!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'LevelOneScene' })
  }

  preload() {}

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0)
    // this.add.image(400, 300, 'star')

    // Platforms
    this.platforms = this.physics.add.staticGroup()

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()
    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    // Player
    this.player = this.physics.add.sprite(100, 250, 'character')

    this.player.setBounce(0.5)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'character', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('character', {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.player.anims.play('turn', true)

    // Multiple Stars
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {
        x: 12,
        y: 0,
        stepX: 70,
      },
    })

    this.stars.children.iterate(function (child) {
      const randY = Phaser.Math.FloatBetween(0.4, 0.8)
      child.setBounceY(randY)
      // child.setCollideWorldBounds(true)
    })

    this.scoreUI = this.add.text(16, 16, 'SCORE: 0', {
      fontSize: '32px',
      color: '#FFF',
    })

    // Collision
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.stars, this.platforms)
    // this.physics.add.collider(star, platforms)
    // this.physics.add.collider(star, player)

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this,
    )

    // Keyboard
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    // Check if user presses arrow keys
    // Then move, and play animation
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn', true)
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }

  collectStar(
    _player: Phaser.GameObjects.GameObject,
    star: Phaser.GameObjects.GameObject,
  ) {
    // Delete the star the player overlaps
    star.destroy()

    // Add one to the score
    this.score += 1

    // Update the score UI
    this.scoreUI.setText(`SCORE: ${this.score}`)
  }
}
