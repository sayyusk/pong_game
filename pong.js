const container = document.getElementById("container");
const ball = document.getElementById("ball");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

const userScore = document.getElementById("user-score");
const aiScore = document.getElementById("ai-score");

let ballX = 50;
let ballY = 50;

let ballSpeedX = 0.6;
let ballSpeedY = 0.6;

let player1Y = 50;
let player2Y = 50;

let score1 = 0;
let score2 = 0;

const paddleSpeed = 1;

let keys = {
    w: false,
    s: false
};

// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "w") {
        keys.w = true;
    }

    if (event.key.toLowerCase() === "s") {
        keys.s = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key.toLowerCase() === "w") {
        keys.w = false;
    }

    if (event.key.toLowerCase() === "s") {
        keys.s = false;
    }
});

function update() {

    // Move player
    if (keys.w) {
        player1Y -= paddleSpeed;
    }

    if (keys.s) {
        player1Y += paddleSpeed;
    }

    // Keep player inside the game
    player1Y = Math.max(8, Math.min(92, player1Y));

    // AI follows the ball
    if (player2Y < ballY) {
        player2Y += paddleSpeed * 0.7;
    }

    if (player2Y > ballY) {
        player2Y -= paddleSpeed * 0.7;
    }

    player2Y = Math.max(8, Math.min(92, player2Y));

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce from top and bottom
    if (ballY <= 2 || ballY >= 98) {
        ballSpeedY *= -1;
    }

    // Player paddle collision
    if (
        ballX <= 7 &&
        ballX >= 5 &&
        Math.abs(ballY - player1Y) < 12
    ) {
        ballSpeedX = Math.abs(ballSpeedX);
    }

    // AI paddle collision
    if (
        ballX >= 93 &&
        ballX <= 95 &&
        Math.abs(ballY - player2Y) < 12
    ) {
        ballSpeedX = -Math.abs(ballSpeedX);
    }

    // AI scores
    if (ballX < 0) {
        score2++;
        aiScore.textContent = score2;
        resetBall();
    }

    // Player scores
    if (ballX > 100) {
        score1++;
        userScore.textContent = score1;
        resetBall();
    }

    // Update positions
    ball.style.left = ballX + "%";
    ball.style.top = ballY + "%";

    player1.style.top = player1Y + "%";
    player2.style.top = player2Y + "%";

    requestAnimationFrame(update);
}

function resetBall() {
    ballX = 50;
    ballY = 50;

    // Change direction randomly
    ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 0.5;
    ballSpeedY = (Math.random() * 0.8 - 0.4);
}

// Start game
update();