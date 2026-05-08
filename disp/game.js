class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.add.text(250, 150, "INVISIBLE WORLD", {
      fontSize: "32px",
      fill: "#ffffff"
    });

    this.add.text(280, 250, "Appuie sur 1 : Niveau 1", {
      fontSize: "20px",
      fill: "#aaaaaa"
    });

    this.add.text(280, 300, "Appuie sur 2 : (à venir)", {
      fontSize: "20px",
      fill: "#555555"
    });

    this.input.keyboard.on("keydown-ONE", () => {
      this.scene.start("Level1");
    });
  }
}

// ---------------- LEVEL 1 ----------------

class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }

  create() {
    // --- Player ---
    this.player = this.add.rectangle(100, 300, 30, 30, 0x00ff00);
    this.physics.add.existing(this.player);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.setGravityY(800);

    // --- Platforms ---
    this.platforms = this.physics.add.staticGroup();

    this.addPlatform(200, 500);
    this.addPlatform(400, 400);
    this.addPlatform(600, 300);

    this.physics.add.collider(this.player, this.platforms);

    // --- Controls ---
    this.cursors = this.input.keyboard.createCursorKeys();

    // --- Escape to menu ---
    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.start("MenuScene");
    });

    this.cameras.main.startFollow(this.player);
  }

  addPlatform(x, y) {
    const p = this.add.rectangle(x, y, 150, 20, 0xffffff);
    this.platforms.add(p);
    this.physics.add.existing(p, true);
  }

  update() {
    const speed = 180;
    const body = this.player.body;

    body.setVelocityX(0);

    if (this.cursors.left.isDown) {
      body.setVelocityX(-speed);
    }
    if (this.cursors.right.isDown) {
      body.setVelocityX(speed);
    }

    if (this.cursors.up.isDown && body.blocked.down) {
      body.setVelocityY(-420);
    }

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

// ---------------- GAME CONFIG ----------------

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: [MenuScene, Level1]
};

new Phaser.Game(config);
