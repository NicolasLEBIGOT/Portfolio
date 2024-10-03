// script.js
let score = 0;
const scoreDisplay = document.getElementById('score');
const luffy = document.getElementById('luffy');

function moveLuffy() {
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);
    luffy.style.left = `${randomX}px`;
    luffy.style.top = `${randomY}px`;
}

luffy.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score : ${score}`;
    moveLuffy();
});

// Déplace Luffy toutes les 1 seconde
setInterval(moveLuffy, 1000);

// Démarre le mouvement de Luffy au chargement de la page
moveLuffy();
