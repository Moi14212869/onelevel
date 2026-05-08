class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.add.text(250, 120, "INVISIBLE WORLD", {
      fontSize: "32px",
      fill: "#ffffff"
    });

    this.add.text(240, 180, "Clique pour choisir un niveau", {
      fontSize: "18px",
      fill: "#aaaaaa"
    });

    // --- Bouton Niveau 1 ---
    const level1Btn = this.add.rectangle(400, 280, 200, 50, 0x3333ff)
      .setInteractive({ useHandCursor: true });

    const level1Text = this.add.text(355, 268, "Niveau 1", {
      fontSize: "20px",
      fill: "#ffffff"
    });

    level1Btn.on("pointerdown", () => {
      this.scene.start("Level1");
    });

    // hover effect
    level1Btn.on("pointerover", () => level1Btn.setFillStyle(0x5555ff));
    level1Btn.on("pointerout", () => level1Btn.setFillStyle(0x3333ff));
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

    // --- Bouton retour menu ---
    const backBtn = this.add.text(10, 10, "← Menu", {
      fontSize: "18px",
      fill: "#ffffff",
      backgroundColor: "#444"
    }).setInteractive({ useHandCursor: true });

    backBtn.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });

    // --- Camera ---
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

    // --- mécanique centrale ---
    this.setWorldVisible(!moving);
  }

  setWorldVisible(state) {
    this.platforms.getChildren().forEach(p => {
      p.visible = state;
    });
  }
}

// ---------------- CONFIG ----------------

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
