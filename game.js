// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game constants
const scale = 20;  // Block size (each block is 20x20)
const rows = canvas.height / scale;  // 400px / 20px = 20 rows
const columns = canvas.width / scale;  // 400px / 20px = 20 columns

// Initial Snake and Food state
let snake = [
    {x: 10 * scale, y: 10 * scale},
    {x: 9 * scale, y: 10 * scale},
    {x: 8 * scale, y: 10 * scale}
];
let food = {x: 15 * scale, y: 15 * scale};
let direction = "RIGHT";
let score = 0; // Initialize score

// Update the snake's position based on direction
function updateSnakePosition() {
    const head = {x: snake[0].x, y: snake[0].y};

    // Move the snake's head in the direction
    if (direction === "LEFT") head.x -= scale;
    if (direction === "RIGHT") head.x += scale;
    if (direction === "UP") head.y -= scale;
    if (direction === "DOWN") head.y += scale;

    // Add the new head to the front of the snake
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        // Generate new food position
        food = randomPosition();
        score++; // Increment score
        updateScore(); // Update score display
    } else {
        // Remove the last segment of the snake (tail)
        snake.pop();
    }
}

// Draw the snake
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "black"; // Green for head, black for body
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

// Draw the food (simple square for food)
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, scale, scale);
}

// Draw the frame
function drawFrame() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Generate a random position for the food
function randomPosition() {
    return {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale
    };
}

// Handle keypresses for direction
document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawFrame(); // Draw the frame
    updateSnakePosition();
    drawSnake();
    drawFood();
    checkGameOver();
}

// Check if the snake hits the wall or itself
function checkGameOver() {
    const head = snake[0];
    // Check if the head goes out of bounds or collides with the body
    if (
        head.x < 0 || head.x >= canvas.width || 
        head.y < 0 || head.y >= canvas.height || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert("Game Over!");
        // Reset the game to initial state
        snake = [
            {x: 10 * scale, y: 10 * scale},
            {x: 9 * scale, y: 10 * scale},
            {x: 8 * scale, y: 10 * scale}
        ];
        score = 0; // Reset score
        updateScore(); // Update score display
    }
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
}

// Start the game loop
setInterval(gameLoop, 100);  // 100ms for game loop