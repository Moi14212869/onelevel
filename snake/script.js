let snake = parseInt(localStorage.getItem("snake")) || 0;
let score = parseInt(localStorage.getItem("score")) || 0;
function pts() {
    if (snake === 0) {
        snake = 1;
        score += 1000;
        localStorage.setItem("score", String(score));
        localStorage.setItem("snake", String(snake));
    }
}
