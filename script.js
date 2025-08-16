//Game constant & variables
let inputDirrection = { x: 0, y: 0 }
const foodSound = new Audio("food.mp3")//install from google
const gameOverSound = new Audio("gameover.mp3")
const moveSound = new Audio("move.mp3")
const musicSound = new Audio("music.mp3")
let speed = 5;
let lastPaintTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };
let score = 0;


//Game Functions
musicSound.play();
function main(currentTime) {
    window.requestAnimationFrame(main);//use this method for looping the game
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function isCollide(snake) {
    // if you bump into yourself

    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            score = 0;
            return true;
        }
    }
    // if you bump into the wall(diwal)
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        score = 0;
        return true;
    }
};

function gameEngine() {
    // part 1: updading the snake array
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDirrection = { x: 0, y: 0 };
        alert("game over please press any key to play again!");
        snakeArray = [{ x: 13, y: 15 }]
        musicSound.play();
        score = 0;
    }
    // if you have eaten the food, increment the score and regenerate the food
    if (snakeArray[0].y == food.y && snakeArray[0].x == food.x) {
        foodSound.play();
        score += 1;

        if (score == 20) {
            speed = 10;
        }
        else if (score == 40) {
            speed = 15;
        }


        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem('highscore', JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score :" + highscoreval;
        }

        scoreBox.innerHTML = "Score:" + score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDirrection.x, y: snakeArray[0].y + inputDirrection.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    // moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };

    }
    snakeArray[0].x += inputDirrection.x;
    snakeArray[0].y += inputDirrection.y;

    // part 2: display the snake and food
    //display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //Dispaly the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);


}


let highscore = localStorage.getItem('highscore');
if (highscore == null) {
    highscoreval = 0;
    localStorage.setItem('highscore', JSON.stringify(highscoreval))
}
else {
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score :" + highscoreval;

}


//main logic start
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDirrection = { x: 0, y: 1 }//start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDirrection.x = 0;
            inputDirrection.y = -1;
            break;
        case "ArrowDown":
            inputDirrection.x = 0;
            inputDirrection.y = 1;

            break;
        case "ArrowLeft":
            inputDirrection.x = -1;
            inputDirrection.y = 0;

            break;
        case "ArrowRight":
            inputDirrection.x = 1;
            inputDirrection.y = 0;
            break;

        default:
            break;
    }
});

