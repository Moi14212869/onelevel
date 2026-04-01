const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const fish = {
    x: 100,
    y: 300,
    width: 50,
    height: 30,
    speed: 5
};

const keys = {};

// Écoute des touches du clavier
window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

function update() {
    // Déplacement du poisson
    if (keys['ArrowUp'] && fish.y > 0) fish.y -= fish.speed;
    if (keys['ArrowDown'] && fish.y < canvas.height - fish.height) fish.y += fish.speed;
    if (keys['ArrowLeft'] && fish.x > 0) fish.x -= fish.speed;
    if (keys['ArrowRight'] && fish.x < canvas.width - fish.width) fish.x += fish.speed;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner le poisson (triangle simple)
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(fish.x, fish.y);
    ctx.lineTo(fish.x + fish.width, fish.y + fish.height / 2);
    ctx.lineTo(fish.x, fish.y + fish.height);
    ctx.closePath();
    ctx.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
