const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 400;
canvas.height = 500;

// Bird properties
let bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 15,
    velocity: 0,
    gravity: 0.5,
    lift: -10
};

// Pipes
let pipes = [];
const pipeWidth = 50;
const pipeGap = 120;
const pipeSpeed = 2;

// Score
let score = 0;
let gameRunning = true;

// Listen for spacebar to make the bird jump
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && gameRunning) {
        bird.velocity = bird.lift;
    }
});

// Game loop (runs 60 times per second)
function gameLoop() {
    if (!gameRunning) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the bird
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Draw the bird
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fill();

    // Generate pipes
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        let pipeHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
        pipes.push({ x: canvas.width, top: pipeHeight, bottom: pipeHeight + pipeGap });
    }

    // Move and draw pipes
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= pipeSpeed;

        // Draw top pipe
        ctx.fillStyle = "green";
        ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].top);

        // Draw bottom pipe
        ctx.fillRect(pipes[i].x, pipes[i].bottom, pipeWidth, canvas.height - pipes[i].bottom);

        // Check collision
        if (
            bird.x + bird.radius > pipes[i].x &&
            bird.x - bird.radius < pipes[i].x + pipeWidth &&
            (bird.y - bird.radius < pipes[i].top || bird.y + bird.radius > pipes[i].bottom)
        ) {
            endGame();
        }

        // Check if pipe has moved off screen
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++; // Increase score
        }
    }

    // Check if bird hits the ground or flies too high
    if (bird.y + bird.radius >= canvas.height || bird.y - bird.radius <= 0) {
        endGame();
    }

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

// End the game
function endGame() {
    gameRunning = false;
    alert(`Game Over! Score: ${score}`);
}

// Start the game
gameLoop();
