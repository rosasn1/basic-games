const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

let snake, direction, food, gameInterval, gameActive = false;

// Start the game when button is clicked
startButton.addEventListener("click", startGame);

function startGame() {
    gameActive = true;
    startButton.classList.add("hidden"); // Hide button
    initializeGame();
}

function initializeGame() {
    snake = [{ x: 10, y: 10 }];
    direction = "RIGHT";
    food = generateFood();

    document.addEventListener("keydown", changeDirection);
    gameInterval = setInterval(updateGame, 120);
}

function updateGame() {
    if (!gameActive) return;

    const head = { ...snake[0] };

    // Move the snake
    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;
    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;

    // Check for collisions
    if (checkCollision(head)) {
        endGame();
        return;
    }

    snake.unshift(head); // Add new head

    if (head.x === food.x && head.y === food.y) {
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove the last part of the snake
    }

    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });
}

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function checkCollision(head) {
    return (
        head.x < 0 || head.x >= canvas.width / 20 ||
        head.y < 0 || head.y >= canvas.height / 20 ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / 20)),
        y: Math.floor(Math.random() * (canvas.height / 20))
    };
}

function endGame() {
    clearInterval(gameInterval);
    gameActive = false;
    alert("Game Over!");
    startButton.classList.remove("hidden"); // Show start button again
}
