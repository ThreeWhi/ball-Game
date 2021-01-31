//contesto 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//world 
const width = canvas.width;
const height = canvas.height;
let time = 16;
const scale = 25;
let start = false;

//player
player = {
    x: 262.5,
    y: 560,
    d: 's'
}

//ball
let ball = {
    x: 300,
    y: 549,
    r: 10,
    d: 'u'
}

//block
let blockX = [];
let blockY = [];
blockX[0] = 25;
blockY[0] = 25;

for (i = 1; i < 11; i++) {
    blockX[i] = blockX[0] + (scale * 2 + 2) * i;
}

for (i = 1; i < 11; i++) {
    blockY[i] = blockY[0] + (scale * 2 + 2) * i;
}

//funzioni
function update() {
    clear();
    moveBall();
    movePlayer();
    drawBlock();
    drawBall();
    drawPlayer();
    collisionRules();
    blockRules();
    game();

    setTimeout(update, 1000 / time);
};

function clear() {
    ctx.fillStyle = 'rgba(51, 51, 51, 0.8)';
    ctx.fillRect(0, 0, width, height);
}

function movePlayer() {
    if (start == true) {
        if (player.d == 'r') {
            player.x += scale / 1.5;
        }
        if (player.d == 'l') {
            player.x -= scale / 1.5;
        }
    }
}

function moveBall() {
    if (start == true) {
        if (ball.d == 'lu') {
            ball.x -= scale / 2;
            ball.y -= scale / 2;
        }
        if (ball.d == 'ur') {
            ball.x += scale / 2;
            ball.y -= scale / 2;
        }
        if (ball.d == 'rb') {
            ball.x += scale / 2;
            ball.y += scale / 2;
        }
        if (ball.d == 'bl') {
            ball.x -= scale / 2;
            ball.y += scale / 2;
        }
    }
}

function drawBlock() {
//    for (j = 0; j < 5; j++) {
        for (i = 0; i < 20; i++) {
            ctx.fillStyle = 'aqua';
            ctx.fillRect(blockX[i], blockY[0], scale * 2, scale)
        }
//    }
}

function blockRules() {
    for (i = 0; i < 11; i++)  {
        if (ball.x > blockX[i] - ball.r && ball.y > blockY[0] - ball.r) {
            if (ball.x < blockX[i] + (scale * 2) + ball.r && ball.y < blockY[0] + scale + ball.r) {
                blockX[i] = undefined;
                if (ball.d == 'ur') {
                    ball.d = 'rb'
                }
                if (ball.d == 'lu') {
                    ball.d = 'bl'
                }
                
            }
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, scale * 3, scale);
}

function drawBall() {
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
}

function collisionRules() {
    //player 
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x > width - (scale * 3)) {
        player.x = width - (scale * 3);
    }

    //ball 
    if (ball.d == 'lu' && ball.x <= 0 + ball.r) {
        ball.d = 'ur';
    }
    if (ball.d == 'ur' && ball.y <= 0 + ball.r) {
        ball.d = 'rb';
    }
    if (ball.d == 'rb' && ball.x >= width - ball.r) {
        ball.d = 'bl';
    }
    if (ball.d == 'bl' && ball.y >= height) {
        start = false;
        GameOver()
    }
    ///////////////////////////////////////////////
    if (ball.d == 'ur' && ball.x >= width - scale) {
        ball.d = 'lu'
    }
    if (ball.d == 'lu' && ball.y <= 0 + ball.r) {
        ball.d = 'bl'
    }
    if (ball.d == 'bl' && ball.x <= 0 + ball.r) {
        ball.d = 'rb'
    }
    if (ball.d == 'rb' && ball.y >= height) {
        start = false;
        GameOver()
    }
    //ball && player 
    if (ball.d == 'bl' && ball.x > player.x - ball.r && ball.y > player.y - (ball.r * 2)) {
        if (ball.x < player.x + (scale * 3) + ball.r && ball.y < player.y + scale) {
            ball.d = 'lu';
        }
    }
    if (ball.d == 'rb' && ball.x > player.x - ball.r && ball.y > player.y - (ball.r * 2) + ball.r) {
        if (ball.x < player.x + (scale * 3) + ball.r && ball.y < player.y + scale) {
            ball.d = 'ur';
        }
    }
}

function game() {
    if (start == false) {
        start = false;
        ball.x = 300;
        ball.y = 549;
        player.x = 262.5;
        player.y = 560;
    }
}

function GameOver() {
    for (i = 1; i < 11; i++) {
        blockX[i] = blockX[0] + (scale * 2 + 2) * i;
    }
    drawBlock();
    alert('GameOver');
}

//eventi
window.addEventListener('keydown', key);

function key(e) {
    //right
    if (e.keyCode == 68) {
        player.d = 'r';
        if (start == false) {
            ball.d = 'lu'
            start = true;
        }
    }
    //left
    if (e.keyCode == 65) {
        player.d = 'l';
        if (start == false) {
            ball.d = 'ur'
            start = true;
        }
    }
}

update();