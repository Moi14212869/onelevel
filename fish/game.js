const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Poisson
const fish = {
    x: 100,
    y: 300,
    radius: 20,
    speed: 5,
    direction: 'right'
};

// Une seule touche active à la fois
let activeKey = null;

// Gestion clavier
window.addEventListener('keydown', e => {
    // Ne changer que si ce n'est pas déjà la touche active
    if (activeKey !== e.key) {
        activeKey = e.key;
    }
});

window.addEventListener('keyup', e => {
    // Si on relâche la touche active, plus de touche active
    if (activeKey === e.key) activeKey = null;
});

// Mise à jour du poisson
function update() {
    switch(activeKey) {
        case 'ArrowUp':
            if (fish.y - fish.radius > 0) {
                fish.y -= fish.speed;
                fish.direction = 'up';
            }
            break;
        case 'ArrowDown':
            if (fish.y + fish.radius < canvas.height) {
                fish.y += fish.speed;
                fish.direction = 'down';
            }
            break;
        case 'ArrowLeft':
            if (fish.x - fish.radius > 0) {
                fish.x -= fish.speed;
                fish.direction = 'left';
            }
            break;
        case 'ArrowRight':
            if (fish.x + fish.radius < canvas.width) {
                fish.x += fish.speed;
                fish.direction = 'right';
            }
            break;
    }
}

// Dessin du poisson
function drawFish() {
    // Corps
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI * 2);
    ctx.fill();

    // Queue
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

// Boucle de jeu
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawFish();
    requestAnimationFrame(gameLoop);
}

gameLoop();
