const luffy = document.getElementById('luffy');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('game-over');
let score = 0;
let gameIsOver = false;
let obstacleSpeed = 2000; // Durée initiale de l'animation (2 secondes)
let gameInterval;
let collisionCheckInterval;

// Luffy Jump
document.addEventListener('keydown', function(event) {
    if ((event.key === ' ' || event.key === 'ArrowUp') && !gameIsOver) {
        jump();
    } else if (event.key === 'r' || event.key === 'R') {
        resetGame();
    }
});

function jump() {
    if (!luffy.classList.contains('jump')) {
        luffy.classList.add('jump');
        setTimeout(() => {
            luffy.classList.remove('jump');
        }, 500); // Luffy stays in the air for 500ms
    }
}

// Collision detection and score update loop
function startGame() {
    score = 0;
    gameIsOver = false;
    obstacleSpeed = 2000; // Reset obstacle speed
    gameOverText.style.display = 'none';
    obstacle.style.display = 'block';
    updateObstacleSpeed(); // Apply initial speed

    gameInterval = setInterval(() => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;

        // Augment obstacle speed every 100 points
        if (score % 20 === 0 && obstacleSpeed > 500) { // minimum speed threshold
            obstacleSpeed -= 20; // Decrease animation time (makes obstacle faster)
            updateObstacleSpeed();
        }
    }, 100);

    collisionCheckInterval = setInterval(() => {
        if (gameIsOver) return;

        // Get current positions of Luffy and obstacle
        let luffyBottom = parseInt(window.getComputedStyle(luffy).getPropertyValue('bottom'));
        let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));

        // If Luffy and the obstacle collide
        if (obstacleRight >= 350 && obstacleRight <= 400 && luffyBottom <= 30) {
            gameOver();
        }
    }, 50);
}

// Update obstacle speed by adjusting the animation duration
function updateObstacleSpeed() {
    obstacle.style.animation = `move ${obstacleSpeed / 1000}s infinite linear`;
}

// Game Over
function gameOver() {
    gameIsOver = true;
    obstacle.style.animation = 'none'; // Stop obstacle movement
    obstacle.style.display = 'none';   // Hide the obstacle
    gameOverText.style.display = 'block'; // Show "Game Over" text
    clearInterval(gameInterval);     // Stop the score increment
    clearInterval(collisionCheckInterval); // Stop checking for collision
}

// Reset Game
function resetGame() {
    if (gameIsOver) {
        startGame();
    }
}

// Start the game for the first time
startGame();
