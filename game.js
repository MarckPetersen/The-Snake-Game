// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game constants (scaled up)
const scale = 20;  // keep the scale the same to maintain the same block size
const rows = canvas.height / scale;  // will now be 60
const columns = canvas.width / scale;  // will now be 60

// Initial Snake and Food state
let snake = [
    {x: 30 * scale, y: 30 * scale},
    {x: 29 * scale, y: 30 * scale},
    {x: 28 * scale, y: 30 * scale}
];
let food = {x: 40 * scale, y: 40 * scale};
let direction = "RIGHT";
let score = 0;

// Load the image (replace 'me.png' with the actual image filename and path)
const foodImage = new Image();
foodImage.src = 'me.png';  // Adjust the path if needed

// Update the snake's position based on direction
function updateSnakePosition() {
    const head = {x: snake[0].x, y: snake[0].y};

    if (direction === "LEFT") head.x -= scale;
    if (direction === "RIGHT") head.x += scale;
    if (direction === "UP") head.y -= scale;
    if (direction === "DOWN") head.y += scale;

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = randomPosition();
        score++;
    } else {
        snake.pop();
    }
}

// Draw the snake
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "black";
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

// Draw the food as an image (me)
function drawFood() {
    ctx.drawImage(foodImage, food.x, food.y, scale, scale);  // Use the image for food
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnakePosition();
    drawSnake();
    drawFood();
    checkGameOver();
}

// Check if the snake hits the wall or itself
function checkGameOver() {
    const head = snake[0];
    if (
        head.x < 0 || head.x >= canvas.width || 
        head.y < 0 || head.y >= canvas.height || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert("Game Over! Score: " + score);
        snake = [
            {x: 30 * scale, y: 30 * scale},
            {x: 29 * scale, y: 30 * scale},
            {x: 28 * scale, y: 30 * scale}
        ];
        score = 0;
    }
}

// Start the game loop
setInterval(gameLoop, 100);
