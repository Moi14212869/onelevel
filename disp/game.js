class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {}

  create() {
    // --- Player ---
    this.player = this.add.rectangle(100, 300, 30, 30, 0x00ff00);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // --- Platforms group ---
    this.platforms = this.physics.add.staticGroup();

    this.platforms.add(this.add.rectangle(200, 400, 150, 20, 0xffffff));
    this.platforms.add(this.add.rectangle(400, 300, 150, 20, 0xffffff));
    this.platforms.add(this.add.rectangle(600, 200, 150, 20, 0xffffff));

    this.platforms.children.iterate(p => {
      this.physics.add.existing(p, true);
    });

    // --- Collisions ---
    this.physics.add.collider(this.player, this.platforms);

    // --- Controls ---
    this.cursors = this.input.keyboard.createCursorKeys();

    // --- State ---
    this.isMoving = false;

    // Camera smoothing optional feel
    this.cameras.main.startFollow(this.player);
  }

  update() {
    const speed = 160;
    const body = this.player.body;

    body.setVelocity(0);

    // Movement
    if (this.cursors.left.isDown) {
      body.setVelocityX(-speed);
    }
    if (this.cursors.right.isDown) {
      body.setVelocityX(speed);
    }
    if (this.cursors.up.isDown) {
      body.setVelocityY(-speed);
    }
    if (this.cursors.down.isDown) {
      body.setVelocityY(speed);
    }

    // Detect movement
    const moving =
      body.velocity.x !== 0 || body.velocity.y !== 0;

    // --- Core mechanic ---
    if (moving) {
      // WORLD INVISIBLE
      this.setWorldVisible(false);
    } else {
      // WORLD VISIBLE
      this.setWorldVisible(true);
    }
  }

  setWorldVisible(state) {
    this.platforms.getChildren().forEach(p => {
      p.visible = state;
    });
  }
}

// --- Game config ---
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: MainScene
};

const game = new Phaser.Game(config);
