import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture = 'player', frame) {
    super(scene, x, y, texture, frame);

    this.init();
    this.scene.add.existing(this);
  }

  init() {
    // image
    this.setScale(0.1, 0.1);

    // physics
    this.scene.physics.world.enable(this);
    const { body } = this;
    body.setCollideWorldBounds(true);
    body.setBounce(0.8);
    body.setDrag(3);
    body.setAngularDrag(15);
    body.maxAngular = 300;
    body.debugShowBody = false;
    body.debugShowVelocity = false;

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    const { body } = this;

    if (body.onFloor() && body.velocity.y < -120) {
      const camera = this.scene.cameras.main;
      camera.shakeEffect.reset();
      camera.shake(1000, 0.01);
    }

    body.setAcceleration(0, 0);
    body.setAngularAcceleration(0);
    if (this.cursors.up.isDown) {
      body.setAccelerationY(-300);
    } else if (this.cursors.up.isDown) {
      body.setAccelerationY(300);
    }

    if (this.cursors.left.isDown) {
      body.setAccelerationX(-300);
      body.setAngularAcceleration(-300);
    } else if (this.cursors.right.isDown) {
      body.setAccelerationX(300);
      body.setAngularAcceleration(300);
    }
  }
}

export default Player;
