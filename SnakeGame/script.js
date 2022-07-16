const $body = $('body');
const $game = $('#game-section');
let $snake = $('.snake');
const $apple = $('#apple');
const $score = $('#score');
const $bestScore = $('#best');
const $popUp = $('#pop-up');
const $buttons = $('.button');
const $restartButton = $('#restart');
const $startButtons = $('.start');
let $snakeBody = $('.snake.body');
const $popUpMsg = $('#pop-up-msg');


let gameOver = false;
let scoreCount = 0;
let bestScore = 0;
let gameSpeed = 100;
let gameObjectSize = 30;
let gameSize = 630 / gameObjectSize;
let currentApplePosition = { x: 0, y: 0 };
const snakeLocation = [];
let currentDirection = "";

function appleRespawnPos() {
  currentApplePosition.x = Math.floor(Math.random() * gameSize) + 1;
  currentApplePosition.y = Math.floor(Math.random() * gameSize) + 1;
  while (snakeLocation.filter(snakeblock => compareLocation(currentApplePosition, snakeblock)).length !== 0) {
    currentApplePosition.x = Math.floor(Math.random() * gameSize) + 1;
    currentApplePosition.y = Math.floor(Math.random() * gameSize) + 1;
  }
}

function initializePosition() {
  // initialize scoreboard
  scoreCount = 0;
  $score.html(scoreCount.toString());
  // initialize apple's position
  appleRespawnPos();
  renderPosition($apple);
  // initialize snake's position
  $snakeBody = $('.snake.body');
  $snakeBody.remove();
  snakeLocation.splice(0, snakeLocation.length+1);
  currentDirection = '';
  snakeLocation.push({x: Math.ceil(gameSize / 2), y: Math.ceil(gameSize / 2)});
  renderPosition($snake);
}

function renderPosition(jQueryObject) {
  if (jQueryObject === $apple) {
    const actualPosX = (currentApplePosition.x - 1) * gameObjectSize;
    const actualPosY = (currentApplePosition.y - 1) * gameObjectSize;
    jQueryObject.css({
      "background-color": "red",
      top: actualPosY.toString() + "px",
      left: actualPosX.toString() + "px",
    });
  } else if (jQueryObject === $snake) {
    snakeLocation.forEach((snakeBlock, pos) => {
      let actualPosX = (snakeBlock.x - 1) * gameObjectSize;
      let actualPosY = (snakeBlock.y - 1) * gameObjectSize;
      let $currentBlock = $(jQueryObject[pos]);
      $currentBlock.css({
        "background-color": "aqua",
        top: actualPosY.toString() + "px",
        left: actualPosX.toString() + "px",
      });
    });
  }
}

function snakeEatsApple() {
  if (snakeLocation[0].x === currentApplePosition.x) {
    if (snakeLocation[0].y === currentApplePosition.y) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function snakeGrowUp() {
  const $new_div = $('<div class="snake body"></div>');
  let  newBodyPositionX;
  let  newBodyPositionY;
  snakeLocation.push({ x: newBodyPositionX, y: newBodyPositionY});
  $game.append($new_div);
  $snake = $(".snake");
}

function updateSnakePosition(direction) {
  for (let i = (snakeLocation.length - 1); i > 0; i--) {
    snakeLocation[i].x = snakeLocation[i-1].x;
    snakeLocation[i].y = snakeLocation[i-1].y;
  }
  if (currentDirection === "right" && snakeLocation[0].x !== gameSize) {
    snakeLocation[0].x++;
  } else if (currentDirection === "left" && snakeLocation[0].x !== 1) {
    snakeLocation[0].x--;
  } else if (currentDirection === "down" && snakeLocation[0].y !== gameSize) {
    snakeLocation[0].y++;
  } else if (currentDirection === "up" && snakeLocation[0].y !== 1) {
    snakeLocation[0].y--;
  }
}

function compareLocation(snakeBlock1, snakeBlock2) {
  if (snakeBlock1.x === snakeBlock2.x) {
    if (snakeBlock1.y === snakeBlock2.y) {
      return true
    } else {
      return false
    } 
  } else {
    return false
  }
}

function snakeTouchesItself() {
  duplicatePos = snakeLocation.filter(snakeBlock => compareLocation(snakeBlock, snakeLocation[0])).length;
  if (duplicatePos > 1) {
    return true
  } else {
    return false
  }
}

function gameOverPage() {
  $popUpMsg.html('GAME OVER');
  $restartButton.toggle();
  $startButtons.toggle();
  $popUp.fadeIn()
}


function startGame() {
  setInterval(() => {
    if (gameOver === true) {
      // wait for restart button
    } else if (snakeEatsApple()) {
      scoreCount++;
      appleRespawnPos();
      snakeGrowUp();
      updateSnakePosition();
      renderPosition($snake);
      renderPosition($apple);
      $score.html(scoreCount.toString());
    } else if (snakeTouchesItself()) {
      gameOver = true;
      if (scoreCount > bestScore) {
        bestScore = scoreCount;
        $bestScore.html(bestScore.toString());
      }
      gameOverPage()
    } else {
      if (currentDirection === "right") {
        if (snakeLocation[0].x === gameSize) {
          gameOver = true;
          if (scoreCount > bestScore) {
            bestScore = scoreCount;
            $bestScore.html(bestScore.toString());
          }
          gameOverPage()
        } else {
          updateSnakePosition();
        }
        renderPosition($snake);
      } else if (currentDirection === "left") {
        if (snakeLocation[0].x === 1) {
          gameOver = true;
          if (scoreCount > bestScore) {
            bestScore = scoreCount;
            $bestScore.html(bestScore.toString());
          }
          gameOverPage()
        } else {
          updateSnakePosition();
        }
        renderPosition($snake);
      } else if (currentDirection === "down") {
        if (snakeLocation[0].y === gameSize) {
          gameOver = true;
          if (scoreCount > bestScore) {
            bestScore = scoreCount;
            $bestScore.html(bestScore.toString());
          }
          gameOverPage()
        } else {
          updateSnakePosition();
        }
        renderPosition($snake);
      } else if (currentDirection === "up") {
        if (snakeLocation[0].y === 1) {
          gameOver = true;
          if (scoreCount > bestScore) {
            bestScore = scoreCount;
            $bestScore.html(bestScore.toString());
          }
          gameOverPage()
        } else {
          updateSnakePosition();
        }
        renderPosition($snake);
      }
    }
  }, gameSpeed);
}

function handleMove(e) {
  if (e.keyCode === 38) {
    if (currentDirection !== "down") {
      currentDirection = "up";
    }
  } else if (e.keyCode === 40) {
    if (currentDirection !== "up") {
      currentDirection = "down";
    }
  } else if (e.keyCode === 37) {
    if (currentDirection !== "right") {
      currentDirection = "left";
    }
  } else if (e.keyCode === 39) {
    if (currentDirection !== "left") {
      currentDirection = "right";
    }
  }
}

function handleGameOverClick(e) {
  if (gameOver === true) {
    $popUpMsg.html('SELECT LEVEL');
    initializePosition();
    gameOver = false;
    $popUp.toggle();
    $restartButton.toggle();
    $popUp.toggle();
    $startButtons.toggle();
  } else if (gameOver === false) {
    if ($(this).html() === "EASY") {
      initializePosition();
      gameSpeed = 200;
      $popUp.fadeOut()
      startGame()
    } else if ($(this).html() === "NORMAL") {
      initializePosition();
      gameSpeed = 150;
      $popUp.fadeOut()
      startGame()
    } else if ($(this).html() === "HARD") {
      initializePosition();
      gameSpeed = 100;
      $popUp.fadeOut()
      startGame()
    }
  }
}

$popUpMsg.html('SELECT LEVEL');
$restartButton.toggle();

$body.keydown(handleMove);
$buttons.click(handleGameOverClick);