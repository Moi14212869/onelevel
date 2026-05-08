class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    // --- Player ---
    this.player = this.add.rectangle(100, 300, 30, 30, 0x00ff00);
    this.physics.add.existing(this.player);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.setGravityY(600); // ✅ GRAVITÉ AJOUTÉE

    // --- Platforms ---
    this.platforms = this.physics.add.staticGroup();

    this.platforms.add(this.add.rectangle(200, 500, 150, 20, 0xffffff));
    this.platforms.add(this.add.rectangle(400, 400, 150, 20, 0xffffff));
    this.platforms.add(this.add.rectangle(600, 300, 150, 20, 0xffffff));

    this.platforms.children.iterate(p => {
      this.physics.add.existing(p, true);
    });

    // --- Collisions ---
    this.physics.add.collider(this.player, this.platforms);

    // --- Controls ---
    this.cursors = this.input.keyboard.createCursorKeys();

    // --- Camera ---
    this.cameras.main.startFollow(this.player);
  }

  update() {
    const speed = 180;
    const body = this.player.body;

    // Reset horizontal velocity
    body.setVelocityX(0);

    // Movement left/right
    if (this.cursors.left.isDown) {
      body.setVelocityX(-speed);
    }
    if (this.cursors.right.isDown) {
      body.setVelocityX(speed);
    }

    // Jump (simple platformer)
    if (this.cursors.up.isDown && body.blocked.down) {
      body.setVelocityY(-400);
    }

    // Detect movement (important: include vertical velocity)
    const moving =
      body.velocity.x !== 0 ||
      Math.abs(body.velocity.y) > 1;

    // --- Core mechanic ---
    this.setWorldVisible(!moving);
  }

  setWorldVisible(state) {
    this.platforms.getChildren().forEach(p => {
      p.visible = state;
    });
  }
}

// --- Config ---
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 }, // ✅ GRAVITÉ MONDE
      debug: false
    }
  },
  scene: MainScene
};

new Phaser.Game(config);
