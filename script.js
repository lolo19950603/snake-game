const $body = $("body");
const $game = $("#game-section");
let $snake = $(".snake");
const $apple = $("#apple");
const $score = $("#score");
const $bestScore = $("#best");
const $popUp = $("#pop-up");
const $buttons = $(".button");
const $restartButton = $("#restart");
const $startButtons = $(".start");
let $snakeBody = $(".snake.body");
const $popUpMsg = $("#pop-up-msg");
const $instruction = $("#instruction");
const gameOverSound = document.querySelector("#gameover-sound");
const eatSound = document.querySelector("#eat-sound");
const clickSound = document.querySelector("#click-sound");

let gameOver = false;
let scoreCount = 0;
let bestScore = 0;
let gameSpeed = 1000;
let gameObjectSize = 30;
let gameSize = 630 / gameObjectSize;
let currentApplePosition = { x: 0, y: 0 };
const snakeLocation = [];
let pendingDirection = [];
let intervalId;

function appleRespawnPos() {
  currentApplePosition.x = Math.floor(Math.random() * gameSize) + 1;
  currentApplePosition.y = Math.floor(Math.random() * gameSize) + 1;
  while (
    snakeLocation.filter((snakeblock) =>
      compareLocation(currentApplePosition, snakeblock)
    ).length !== 0
  ) {
    currentApplePosition.x = Math.floor(Math.random() * gameSize) + 1;
    currentApplePosition.y = Math.floor(Math.random() * gameSize) + 1;
  }
}

function initializePosition() {
  $popUpMsg.html("SELECT LEVEL");
  $restartButton.toggle();
  // initialize scoreboard
  scoreCount = 0;
  $score.html(scoreCount.toString());
  // initialize apple's position
  appleRespawnPos();
  renderPosition($apple);
  // initialize snake's position
  $snakeBody = $(".snake.body");
  $snakeBody.remove();
  snakeLocation.splice(0, snakeLocation.length + 1);
  pendingDirection = [];
  snakeLocation.push({
    x: Math.ceil(gameSize / 2),
    y: Math.ceil(gameSize / 2),
  });
  renderPosition($snake);
}

function renderPosition(jQueryObject) {
  if (jQueryObject === $apple) {
    const actualPosX = (currentApplePosition.x - 1) * gameObjectSize;
    const actualPosY = (currentApplePosition.y - 1) * gameObjectSize;
    jQueryObject.css({
      "background-color": "black",
      top: actualPosY.toString() + "px",
      left: actualPosX.toString() + "px",
    });
  } else if (jQueryObject === $snake) {
    snakeLocation.forEach((snakeBlock, pos) => {
      let actualPosX = (snakeBlock.x - 1) * gameObjectSize;
      let actualPosY = (snakeBlock.y - 1) * gameObjectSize;
      let $currentBlock = $(jQueryObject[pos]);
      $currentBlock.css({
        "background-color": "black",
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
  eatSound.play();
  const $new_div = $('<div class="snake body"></div>');
  let newBodyPositionX;
  let newBodyPositionY;
  snakeLocation.push({ x: newBodyPositionX, y: newBodyPositionY });
  $game.append($new_div);
  $snake = $(".snake");
}

function updateSnakePosition(direction) {
  for (let i = snakeLocation.length - 1; i > 0; i--) {
    snakeLocation[i].x = snakeLocation[i - 1].x;
    snakeLocation[i].y = snakeLocation[i - 1].y;
  }
  if (pendingDirection[0] === "right" && snakeLocation[0].x !== gameSize) {
    snakeLocation[0].x++;
  } else if (pendingDirection[0] === "left" && snakeLocation[0].x !== 1) {
    snakeLocation[0].x--;
  } else if (
    pendingDirection[0] === "down" &&
    snakeLocation[0].y !== gameSize
  ) {
    snakeLocation[0].y++;
  } else if (pendingDirection[0] === "up" && snakeLocation[0].y !== 1) {
    snakeLocation[0].y--;
  }
}

function compareLocation(snakeBlock1, snakeBlock2) {
  if (snakeBlock1.x === snakeBlock2.x) {
    if (snakeBlock1.y === snakeBlock2.y) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function snakeTouchesItself() {
  duplicatePos = snakeLocation.filter((snakeBlock) =>
    compareLocation(snakeBlock, snakeLocation[0])
  ).length;
  if (duplicatePos > 1) {
    return true;
  } else {
    return false;
  }
}

function gameOverPage() {
  gameOverSound.play();
  clearInterval(intervalId);
  $popUpMsg.html("GAME OVER");
  $restartButton.toggle();
  $startButtons.toggle();
  $popUp.fadeIn();
}

function updateCurrentLocation() {
  if (pendingDirection.length > 1) {
    pendingDirection = [pendingDirection[1]];
  }
}

function startGame() {
  intervalId = setInterval(() => {
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
      gameOverPage();
    } else {
      if (pendingDirection[0] === "right") {
        if (snakeLocation[0].x === gameSize) {
          gameOver = true;
          if (scoreCount > bestScore) {
            bestScore = scoreCount;
            $bestScore.html(bestScore.toString());
          }
          gameOverPage();
        } else {
          updateSnakePosition();
        }
        renderPosition($snake);
      } else if (pendingDirection[0] === "left") {
        if (snakeLocation[0].x === 1) {
          gameOver = true;
          if (scoreCount > bestScore) {
            bestScore = scoreCount;
            $bestScore.html(bestScore.toString());
          }
          gameOverPage();
        } else {
          updateSnakePosition();
        }
        renderPosition($snake);
      } else if (pendingDirection[0] === "down") {
        if (snakeLocation[0].y === gameSize) {
          gameOver = true;
          if (scoreCount > bestScore) {
            bestScore = scoreCount;
            $bestScore.html(bestScore.toString());
          }
          gameOverPage();
        } else {
          updateSnakePosition();
        }
        renderPosition($snake);
      } else if (pendingDirection[0] === "up") {
        if (snakeLocation[0].y === 1) {
          gameOver = true;
          if (scoreCount > bestScore) {
            bestScore = scoreCount;
            $bestScore.html(bestScore.toString());
          }
          gameOverPage();
        } else {
          updateSnakePosition();
        }
        renderPosition($snake);
      }
    }
    updateCurrentLocation();
  }, gameSpeed);
}

function handleMove(e) {
  clickSound.play();
  if (pendingDirection.length === 0) {
    $instruction.fadeOut();
    if (e.keyCode === 38) {
      pendingDirection.push("up");
    } else if (e.keyCode === 40) {
      pendingDirection.push("down");
    } else if (e.keyCode === 37) {
      pendingDirection.push("left");
    } else if (e.keyCode === 39) {
      pendingDirection.push("right");
    }
  } else {
    if (e.keyCode === 38) {
      if (pendingDirection[0] !== "down") {
        pendingDirection.push("up");
      }
    } else if (e.keyCode === 40) {
      if (pendingDirection[0] !== "up") {
        pendingDirection.push("down");
      }
    } else if (e.keyCode === 37) {
      if (pendingDirection[0] !== "right") {
        pendingDirection.push("left");
      }
    } else if (e.keyCode === 39) {
      if (pendingDirection[0] !== "left") {
        pendingDirection.push("right");
      }
    }
  }
}

function handleButtonsClick(e) {
  if (gameOver === true) {
    $popUpMsg.html("SELECT LEVEL");
    gameOver = false;
    initializePosition();
    $popUp.toggle();
    $popUp.toggle();
    $startButtons.toggle();
  } else if (gameOver === false) {
    $instruction.fadeIn();
    if ($(this).html() === "EASY") {
      gameSpeed = 150;
      $popUp.fadeOut();
      startGame();
    } else if ($(this).html() === "NORMAL") {
      gameSpeed = 100;
      $popUp.fadeOut();
      startGame();
    } else if ($(this).html() === "HARD") {
      gameSpeed = 75;
      $popUp.fadeOut();
      startGame();
    }
  }
}

// start by initializing the game.
initializePosition();
$instruction.fadeOut();
$body.keydown(handleMove);
$buttons.click(handleButtonsClick);