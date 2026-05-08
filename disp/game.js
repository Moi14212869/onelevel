class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.add.text(400, 120, "INVISIBLE WORLD", {
      fontSize: "32px",
      fill: "#ffffff"
    }).setOrigin(0.5);

    this.add.text(400, 180, "Clique pour choisir un niveau", {
      fontSize: "18px",
      fill: "#aaaaaa"
    }).setOrigin(0.5);

    // --- Bouton Niveau 1 ---
    const level1Btn = this.add.rectangle(400, 360, 220, 60, 0x3333ff)
      .setInteractive({ useHandCursor: true });

    const level1Text = this.add.text(0, 0, "Niveau 1", {
      fontSize: "22px",
      fill: "#ffffff"
    });

    Phaser.Display.Align.In.Center(level1Text, level1Btn);

    level1Btn.on("pointerdown", () => {
      this.scene.start("Level1");
    });

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

    // --- Bouton retour menu (bas gauche) ---
    const backBtn = this.add.text(10, 580, "← Menu", {
      fontSize: "18px",
      fill: "#ffffff",
      backgroundColor: "#222",
      padding: { left: 10, right: 10, top: 5, bottom: 5 }
    })
    .setInteractive({ useHandCursor: true })
    .setOrigin(0, 1);

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
