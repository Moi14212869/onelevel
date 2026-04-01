const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const fish = {
    x: 100,
    y: 300,
    radius: 20,
    speed: 5
};

const keys = {};
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const fish = {
    x: 100,
    y: 300,
    radius: 20,
    speed: 5,
    direction: 'right' // direction initiale
};

const keys = {};

window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

function update() {
    // Déplacement
    if (keys['ArrowUp'] && fish.y - fish.radius > 0) {
        fish.y -= fish.speed;
        fish.direction = 'up';
    }
    if (keys['ArrowDown'] && fish.y + fish.radius < canvas.height) {
        fish.y += fish.speed;
        fish.direction = 'down';
    }
    if (keys['ArrowLeft'] && fish.x - fish.radius > 0) {
        fish.x -= fish.speed;
        fish.direction = 'left';
    }
    if (keys['ArrowRight'] && fish.x + fish.radius < canvas.width) {
        fish.x += fish.speed;
        fish.direction = 'right';
    }
}

function drawFish() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Corps (cercle)
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI * 2);
    ctx.fill();

    // Queue (triangle derrière)
    ctx.fillStyle = 'darkorange';
    ctx.beginPath();
    switch (fish.direction) {
        case 'right':
            ctx.moveTo(fish.x - fish.radius, fish.y);
            ctx.lineTo(fish.x - fish.radius - 15, fish.y - 10);
            ctx.lineTo(fish.x - fish.radius - 15, fish.y + 10);
            break;
        case 'left':
            ctx.moveTo(fish.x + fish.radius, fish.y);
            ctx.lineTo(fish.x + fish.radius + 15, fish.y - 10);
            ctx.lineTo(fish.x + fish.radius + 15, fish.y + 10);
            break;
        case 'up':
            ctx.moveTo(fish.x, fish.y + fish.radius);
            ctx.lineTo(fish.x - 10, fish.y + fish.radius + 15);
            ctx.lineTo(fish.x + 10, fish.y + fish.radius + 15);
            break;
        case 'down':
            ctx.moveTo(fish.x, fish.y - fish.radius);
            ctx.lineTo(fish.x - 10, fish.y - fish.radius - 15);
            ctx.lineTo(fish.x + 10, fish.y - fish.radius - 15);
            break;
    }
    ctx.closePath();
    ctx.fill();
}

function gameLoop() {
    update();
    drawFish();
    requestAnimationFrame(gameLoop);
}

gameLoop();
window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

function update() {
    if (keys['ArrowUp'] && fish.y - fish.radius > 0) fish.y -= fish.speed;
    if (keys['ArrowDown'] && fish.y + fish.radius < canvas.height) fish.y += fish.speed;
    if (keys['ArrowLeft'] && fish.x - fish.radius > 0) fish.xconst canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const fish = {
    x: 100,
    y: 300,
    radius: 20,
    speed: 5,
    direction: 'right' // droite par défaut
};

const keys = {};

window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

function update() {
    // Déplacement et mise à jour de la direction
    if (keys['ArrowUp'] && fish.y - fish.radius > 0) {
        fish.y -= fish.speed;
        fish.direction = 'up';
    }
    if (keys['ArrowDown'] && fish.y + fish.radius < canvas.height) {
        fish.y += fish.speed;
        fish.direction = 'down';
    }
    if (keys['ArrowLeft'] && fish.x - fish.radius > 0) {
        fish.x -= fish.speed;
        fish.direction = 'left';
    }
    if (keys['ArrowRight'] && fish.x + fish.radius < canvas.width) {
        fish.x += fish.speed;
        fish.direction = 'right';
    }
}

function drawFish() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI * 2);
    ctx.fill();

    // Dessiner la queue selon la direction
    ctx.fillStyle = 'darkorange';
    ctx.beginPath();
    switch (fish.direction) {
        case 'right':
            ctx.moveTo(fish.x - fish.radius, fish.y);
            ctx.lineTo(fish.x - fish.radius - 15, fish.y - 10);
            ctx.lineTo(fish.x - fish.radius - 15, fish.y + 10);
            break;
        case 'left':
            ctx.moveTo(fish.x + fish.radius, fish.y);
            ctx.lineTo(fish.x + fish.radius + 15, fish.y - 10);
            ctx.lineTo(fish.x + fish.radius + 15, fish.y + 10);
            break;
        case 'up':
            ctx.moveTo(fish.x, fish.y + fish.radius);
            ctx.lineTo(fish.x - 10, fish.y + fish.radius + 15);
            ctx.lineTo(fish.x + 10, fish.y + fish.radius + 15);
            break;
        case 'down':
            ctx.moveTo(fish.x, fish.y - fish.radius);
            ctx.lineTo(fish.x - 10, fish.y - fish.radius - 15);
            ctx.lineTo(fish.x + 10, fish.y - fish.radius - 15);
            break;
    }
    ctx.closePath();
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFish();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop(); -= fish.speed;
    if (keys['ArrowRight'] && fish.x + fish.radius < canvas.width) fish.x += fish.speed;
}

function drawFish() {
    // Corps (cercle)
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI * 2);
    ctx.fill();

    // Queue (triangle derrière)
    ctx.fillStyle = 'darkorange';
    ctx.beginPath();
    ctx.moveTo(fish.x - fish.radius, fish.y);
    ctx.lineTo(fish.x - fish.radius - 15, fish.y - 10);
    ctx.lineTo(fish.x - fish.radius - 15, fish.y + 10);
    ctx.closePath();
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFish();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
