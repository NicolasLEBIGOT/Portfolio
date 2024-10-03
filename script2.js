let luffy = document.getElementById('luffy');
let treasure = document.getElementById('treasure');
let enemy = document.getElementById('enemy');
let scoreDisplay = document.getElementById('score');
let startButton = document.getElementById('startButton');
let gameOverText = document.getElementById('gameOverText');

let score = 0;
let gameInterval;
let gameRunning = false;

// Fonction pour commencer le jeu
startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    scoreDisplay.innerText = score;
    gameOverText.style.display = 'none';
    startButton.style.display = 'none';
    luffy.style.left = '50%';
    treasure.style.top = '0px';
    enemy.style.top = '-100px';
    gameRunning = true;

    // Démarre le jeu
    gameInterval = setInterval(gameLoop, 20);
}

// Fonction pour gérer le jeu
function gameLoop() {
    moveTreasure();
    moveEnemy();
    checkCollisions();
}

// Déplacement de Luffy avec les touches fléchées
document.addEventListener('keydown', function(event) {
    if (gameRunning) {
        let left = parseInt(window.getComputedStyle(luffy).getPropertyValue("left"));

        if (event.key === 'ArrowLeft' && left > 0) {
            luffy.style.left = (left - 10) + "px";
        } else if (event.key === 'ArrowRight' && left < 750) { // Limite du terrain de jeu (800px - taille Luffy)
            luffy.style.left = (left + 10) + "px";
        }
    }
});

// Mouvement du trésor vers le bas
function moveTreasure() {
    let top = parseInt(window.getComputedStyle(treasure).getPropertyValue("top"));

    // Si le trésor atteint le bas, on le remet en haut
    if (top >= 600) {
        treasure.style.top = "0px";
        treasure.style.left = Math.floor(Math.random() * 770) + "px"; // Nouvelle position horizontale aléatoire
    } else {
        treasure.style.top = (top + 5) + "px";
    }
}

// Mouvement des ennemis
function moveEnemy() {
    let top = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));

    // Si l'ennemi atteint le bas, on le remet en haut avec une nouvelle position
    if (top >= 600) {
        enemy.style.top = "-100px";
        enemy.style.left = Math.floor(Math.random() * 750) + "px"; // Nouvelle position aléatoire
    } else {
        enemy.style.top = (top + 7) + "px"; // Ennemis se déplacent plus vite que les trésors
    }
}

// Vérification des collisions
function checkCollisions() {
    let luffyRect = luffy.getBoundingClientRect();
    let treasureRect = treasure.getBoundingClientRect();
    let enemyRect = enemy.getBoundingClientRect();

    // Collision avec le trésor
    if (!(luffyRect.right < treasureRect.left || 
          luffyRect.left > treasureRect.right || 
          luffyRect.bottom < treasureRect.top || 
          luffyRect.top > treasureRect.bottom)) {
        score++;
        scoreDisplay.innerText = score;
        treasure.style.top = "0px";
        treasure.style.left = Math.floor(Math.random() * 770) + "px"; // Remet le trésor en haut
    }

    // Collision avec l'ennemi
    if (!(luffyRect.right < enemyRect.left || 
          luffyRect.left > enemyRect.right || 
          luffyRect.bottom < enemyRect.top || 
          luffyRect.top > enemyRect.bottom)) {
        endGame();
    }
}

// Fin du jeu
function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    startButton.style.display = 'block';
    gameOverText.style.display = 'block';
}
