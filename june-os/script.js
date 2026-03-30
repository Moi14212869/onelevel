let juneos = parseInt(localStorage.getItem("juneos")) || 0;
let score = parseInt(localStorage.getItem("score")) || 0;
function pts() {
    if (juneos === 0) {
        juneos = 1;
        score += 1000;
        localStorage.setItem("score", String(score));
        localStorage.setItem("juneos", String(juneos));
    }
}
