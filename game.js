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
let score = 0;

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
        score++; // Increase score
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
    ctx.fil
