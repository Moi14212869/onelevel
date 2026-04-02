    let score = parseInt(localStorage.getItem("score")) || 0;
    document.getElementById("Fenyx").addEventListener("click", function() {
        pts();
    });
    function pts() {
        score = score + 1;
        localStorage.setItem("score", String(score));
    }
