const gameArea = document.getElementById('gameArea');
const gameSize = 20; // 每个格子的大小
const snakeSpeed = 150; // 蛇的移动速度（毫秒）

let snake = [{ x: 8, y: 8 }];
let snakeDirection = 'RIGHT';
let food = { x: 5, y: 5 };
let isGameOver = false;

// 画蛇和食物
function draw() {
    gameArea.innerHTML = ''; // 清空画布

    snake.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.style.width = `${gameSize}px`;
        snakeSegment.style.height = `${gameSize}px`;
        snakeSegment.style.backgroundColor = 'green';
        snakeSegment.style.position = 'absolute';
        snakeSegment.style.left = `${segment.x * gameSize}px`;
        snakeSegment.style.top = `${segment.y * gameSize}px`;
        gameArea.appendChild(snakeSegment);
    });

    const foodElement = document.createElement('div');
    foodElement.style.width = `${gameSize}px`;
    foodElement.style.height = `${gameSize}px`;
    foodElement.style.backgroundColor = 'red';
    foodElement.style.position = 'absolute';
    foodElement.style.left = `${food.x * gameSize}px`;
    foodElement.style.top = `${food.y * gameSize}px`;
    gameArea.appendChild(foodElement);
}

// 更新蛇的位置
function update() {
    if (isGameOver) return;

    let head = { ...snake[0] };

    switch (snakeDirection) {
        case 'UP':
            head.y -= 1;
            break;
        case 'DOWN':
            head.y += 1;
            break;
        case 'LEFT':
            head.x -= 1;
            break;
        case 'RIGHT':
            head.x += 1;
            break;
    }

    snake.unshift(head);

    // 检查蛇是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        // 生成新的食物位置
        food = {
            x: Math.floor(Math.random() * (gameArea.offsetWidth / gameSize)),
            y: Math.floor(Math.random() * (gameArea.offsetHeight / gameSize))
        };
    } else {
        snake.pop(); // 移除蛇尾
    }

    // 检查蛇是否碰到自己或墙壁
    if (head.x < 0 || head.x >= gameArea.offsetWidth / gameSize || head.y < 0 || head.y >= gameArea.offsetHeight / gameSize || snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
        isGameOver = true;
        alert('游戏结束');
        return;
    }

    draw();
}

// 控制蛇的移动
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection !== 'DOWN') snakeDirection = 'UP';
            break;
        case 'ArrowDown':
            if (snakeDirection !== 'UP') snakeDirection = 'DOWN';
            break;
        case 'ArrowLeft':
            if (snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
            break;
        case 'ArrowRight':
            if (snakeDirection !== 'LEFT') snakeDirection = 'RIGHT';
            break;
    }
});

// 游戏循环
setInterval(update, snakeSpeed);
