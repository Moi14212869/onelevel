const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Poisson
const fish = {
    x: 100,
    y: 300,
    radius: 20,
    speed: 5,
    direction: 'right'
};

// Une seule touche active
let activeKey = null;

// Score
let score = 0;

// Bulles
const bubbles = [];
const maxBubbles = 5;

// Générer une bulle aléatoire
function createBubble() {
    const radius = 10;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    bubbles.push({ x, y, radius });
}

// Gestion clavier
window.addEventListener('keydown', e => { if (activeKey !== e.key) activeKey = e.key; });
window.addEventListener('keyup', e => { if (activeKey === e.key) activeKey = null; });

// Mise à jour du poisson
function update() {
    switch(activeKey) {
        case 'ArrowUp':
            if (fish.y - fish.radius > 0) { fish.y -= fish.speed; fish.direction = 'up'; }
            break;
        case 'ArrowDown':
            if (fish.y + fish.radius < canvas.height) { fish.y += fish.speed; fish.direction = 'down'; }
            break;
        case 'ArrowLeft':
            if (fish.x - fish.radius > 0) { fish.x -= fish.speed; fish.direction = 'left'; }
            break;
        case 'ArrowRight':
            if (fish.x + fish.radius < canvas.width) { fish.x += fish.speed; fish.direction = 'right'; }
            break;
    }

    // Collision avec bulles
    for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        const dx = fish.x - b.x;
        const dy = fish.y - b.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < fish.radius + b.radius) {
            bubbles.splice(i, 1);
            score += 1;
        }
    }

    // Générer des bulles si nécessaire
    if (bubbles.length < maxBubbles && Math.random() < 0.01) createBubble();
}

// Dessin du poisson
function drawFish() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = 'darkorange';
    ctx.beginPath();
    switch(fish.direction) {
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

// Dessin des bulles
function drawBubbles() {
    ctx.fillStyle = 'lightblue';
    bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI*2);
        ctx.fill();
    });
}

// Dessin du score
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Dessin texte “Poisson d’avril” si score = 69
function drawAprilFish() {
    if (score === 69) {
        ctx.fillStyle = 'red';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Poisson d\'avril !', canvas.width / 2, canvas.height / 2);
    }
}

// Boucle de jeu
function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    update();
    drawBubbles();
    drawFish();
    drawScore();
    drawAprilFish();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// Poisson
const fish = {
    x: 100,
    y: 300,
    radius: 20,
    speed: 5,
    direction: 'right'
};

// Une seule touche active
let activeKey = null;

// Score
let score = 0;

// Bulles
const bubbles = [];
const maxBubbles = 5;

// Générer une bulle aléatoire
function createBubble() {
    const radius = 10;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    bubbles.push({ x, y, radius });
}

// Gestion clavier
window.addEventListener('keydown', e => { if (activeKey !== e.key) activeKey = e.key; });
window.addEventListener('keyup', e => { if (activeKey === e.key) activeKey = null; });

// Mise à jour du poisson
function update() {
    // Déplacement selon la touche active
    switch(activeKey) {
        case 'ArrowUp':
            if (fish.y - fish.radius > 0) { fish.y -= fish.speed; fish.direction = 'up'; }
            break;
        case 'ArrowDown':
            if (fish.y + fish.radius < canvas.height) { fish.y += fish.speed; fish.direction = 'down'; }
            break;
        case 'ArrowLeft':
            if (fish.x - fish.radius > 0) { fish.x -= fish.speed; fish.direction = 'left'; }
            break;
        case 'ArrowRight':
            if (fish.x + fish.radius < canvas.width) { fish.x += fish.speed; fish.direction = 'right'; }
            break;
    }

    // Vérifier collisions avec bulles
    for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        const dx = fish.x - b.x;
        const dy = fish.y - b.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < fish.radius + b.radius) {
            bubbles.splice(i, 1);
            score += 1;
        }
    }

    // Générer des bulles si nécessaire
    if (bubbles.length < maxBubbles && Math.random() < 0.01) {
        createBubble();
    }
}

// Dessin du poisson
function drawFish() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = 'darkorange';
    ctx.beginPath();
    switch(fish.direction) {
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

// Dessin des bulles
function drawBubbles() {
    ctx.fillStyle = 'lightblue';
    bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI*2);
        ctx.fill();
    });
}

// Dessin du score
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Boucle de jeu
function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    update();
    drawBubbles();
    drawFish();
    drawScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();
