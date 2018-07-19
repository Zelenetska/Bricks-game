var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d'),
    x = canvas.width / 2,
    y = canvas.height - 30,
    dx = 2,
    dy = -2,
    ballRadius = 10,
    paddleHeight = 10,
    paddleWidth = 75,
    paddleX = (canvas.width - paddleWidth) / 2,
    paddleY = canvas.height - paddleHeight,
    rightPressed = false,
    leftPressed = false,
    brickRowCount = 3,
    brickColumnCount = 6,
    brickHeight = 20,
    brickWidth = 75,
    brickPadding = 10,
    brickOffsetTop = 10,
    brickOffsetLeft = 10,
    score = 0,
    lives = 3;



document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var bricks = [];
for (var i = 0; i < brickColumnCount; i += 1) {
    bricks[i] = [];
    for (var j = 0; j < brickRowCount; j += 1) {
        var brickX = (i * (brickWidth + brickPadding) + brickOffsetLeft),
            brickY = (j * (brickHeight + brickPadding) + brickOffsetTop);
        bricks[i][j] = {x: brickX, y: brickY, status: 1};
    }
}

function drawScore() {
    ctx.font = '12px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score ' + score, 8, 150);
}

function drawLives() {
    ctx.font = '12px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Lives ' + lives, 470, 150);
}


function detectCollisions() {
    for (var i = 0; i < brickColumnCount; i += 1) {
        for (var j = 0; j < brickRowCount; j += 1) {
            var brick = bricks[i][j];
            if (brick.status === 1) {
                if (x >= (brick.x - brickOffsetLeft / 2) && x <= (brick.x + brickWidth + brickOffsetLeft / 2) && y >= brick.y && y <= brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert('WooHoo');
                        document.location.reload();
                    }
                }
            }
        }
    }
}


function drawBricks() {
    var i, j, brickX, brickX = (i * (brickWidth + brickPadding) + brickOffsetLeft),
        brickY;
    for (i = 0; i < brickColumnCount; i += 1) {
        for (j = 0; j < brickRowCount; j += 1) {
            if (bricks[i][j].status === 1) {
                brickX = (i * (brickWidth + brickPadding) + brickOffsetLeft);
                brickY = (j * (brickHeight + brickPadding) + brickOffsetTop);

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#ff4b66';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function keyDownHandler(event) {
    if (event.keyCode === 39) {
        rightPressed = true;
    } else if (event.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode === 39) {
        rightPressed = false;
    } else if (event.keyCode === 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    detectCollisions();
    drawScore();
    drawLives();

    if ((ballRadius === y) || (canvas.height - ballRadius === y)) {
        dy = -dy;
    }

    if ((ballRadius === x) || (canvas.width - ballRadius === x)) {
        dx = -dx;
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 3;
    }

    if (leftPressed && paddleX > 0) {
        paddleX -= 3;
    }

    if((canvas.height - ballRadius - paddleHeight) === y) {
        if (x > (paddleX - ballRadius) && x < paddleX + paddleWidth + ballRadius) {
            dy = -dy;
        } else {
            console.log(x);
            console.log(paddleX);
            lives--;
            if(!lives) {
                alert('Ha-ha!');
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }


    x += dx;
    y += dy;
}


setInterval(draw, 10);