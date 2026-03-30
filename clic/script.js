
        let autoClick = parseInt(localStorage.getItem("autoClick")) || 0;
        const autoClickInterval = 1000;
        const count = document.getElementById("count");
        const pop = document.getElementById("pop");
        const buy = document.getElementById("buy");
        const button = document.getElementById("button");
        const perClick = document.getElementById("perClick");
        
        let clics = localStorage.getItem("clics");
        let number = parseInt(localStorage.getItem("number")) || 1;
        perClick.textContent = number;
        clics = clics ? parseInt(clics) : 0;
        count.textContent = clics;

        function add() {
            clics = clics + number;
            count.textContent = clics;

            // Animation
            button.classList.remove("click-animation");
            void button.offsetWidth;
            button.classList.add("click-animation");

            // Son
            const clickSound = pop.cloneNode();
            clickSound.play();

            localStorage.setItem("clics", clics);
        }
        setInterval(() => {
    if (autoClick > 0) {
        clics += autoClick;
        count.textContent = clics;
        localStorage.setItem("clics", clics);
    }
}, autoClickInterval);

const shop = document.getElementById("shop");
const shopButton = document.querySelector(".shop-button");

function toggleShop() {
    shop.classList.toggle("open");
    shopButton.classList.toggle("open");
}
function addClic(amount, prix) {
    if (clics >= prix) {
        clics -= prix;
        number=number+amount;

        count.textContent = clics;
        perClick.textContent = number;

        const buySound = buy.cloneNode();
        buySound.play();
        
        localStorage.setItem("clics", clics);
        localStorage.setItem("number", number);
    } else {
        alert("Pas assez de clics !");
    }
}
        function upgradeAutoClick(auto, cost) {
    if (clics >= cost) {
        clics -= cost;
        autoClick += auto;

        count.textContent = clics;
        document.getElementById("autoClickDisplay").textContent = autoClick;

        buy.cloneNode().play();

        localStorage.setItem("clics", clics);
        localStorage.setItem("autoClick", autoClick);
    } else {
        alert("Pas assez de clics !");
    }
}

// Mettre à jour l'affichage au chargement
document.getElementById("autoClickDisplay").textContent = autoClick;

    </script>
