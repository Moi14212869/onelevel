import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAtox4-sYkd_YLYzZzjih0oak9dpHftVv4",
    authDomain: "onelevel-f94a1.firebaseapp.com",
    projectId: "onelevel-f94a1",
    storageBucket: "onelevel-f94a1.firebasestorage.app",
    messagingSenderId: "31193753415",
    appId: "1:31193753415:web:56cd82ea8aeff02bed0e62",
    measurementId: "G-E6K903XDTZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function displayLeaderboard() {
    const querySnapshot = await getDocs(collection(db, "players"));
    let players = [];
    querySnapshot.forEach(doc => players.push(doc.data()));
    players.sort((a,b) => b.score - a.score);

    const tbody = document.querySelector("#leaderboardTable tbody");
    tbody.innerHTML = "";
    players.forEach((player, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${index+1}</td><td>${player.username}</td><td>${player.score}</td>`;
        tbody.appendChild(tr);
    });
}

window.addEventListener("load", displayLeaderboard);
