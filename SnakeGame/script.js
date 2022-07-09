const $body = $('body');
const $snake = $('#snake');
const $apple = $('#apple');

let gameObjectSize = 25;
let snakeCurrentSize = gameObjectSize;
let gameSize = 700 - gameObjectSize;
let currentSnakePosition = { x: 0, y: 0 };
let currentApplePosition = { x: 0, y: 0 };
initializePosition();
let currentDirection = "right";

let browserDimensions = { width: gameSize, height: gameSize };

function appleRespawnPos() {
  currentApplePosition.x = Math.floor(Math.random() * 671);
  currentApplePosition.y = Math.floor(Math.random() * 671);
}

function initializePosition() {
  // initialize apple's position
  appleRespawnPos()
  renderPosition($apple);
  // initialize snake's position
  currentSnakePosition.x = Math.floor(gameSize/2);
  currentSnakePosition.y = Math.floor(gameSize/2);
  renderPosition($snake);
}

function renderPosition(jQueryObject) {
  if (jQueryObject === $apple) {
    $apple.css({'background-color': 'red',
                'top': (currentApplePosition.y - gameObjectSize).toString() + 'px',
                'left': currentApplePosition.x.toString() + 'px'
              });
  }
  else if (jQueryObject === $snake) {
    $snake.css({'background-color': 'aqua',
                'top': currentSnakePosition.y.toString() + 'px',
                'left': currentSnakePosition.x.toString() + 'px'
  });
  }
}

function snakeEatsApple() {
  const snakeRightPos = currentSnakePosition.x + gameObjectSize;
  const snakeLeftPos = currentSnakePosition.x;
  const snakeTopPos = currentSnakePosition.y;
  const snakeBottomPos = currentSnakePosition.y + gameObjectSize;
  const appleRightPos = currentApplePosition.x + gameObjectSize;
  const appleLeftPos = currentApplePosition.x;
  const appleTopPos = currentApplePosition.y;
  const appleBottomPos = currentApplePosition.y + gameObjectSize;
  if (appleLeftPos > snakeLeftPos && appleLeftPos < snakeRightPos) {
    if (appleTopPos < snakeBottomPos && appleTopPos > snakeTopPos) {
      return true;
    } else if (appleBottomPos < snakeBottomPos && appleBottomPos > snakeTopPos) {
      return true;
    } else {
      return false;
    }
  } else if (appleRightPos > snakeLeftPos && appleRightPos < snakeRightPos) {
    if (appleTopPos < snakeBottomPos && appleTopPos > snakeTopPos) {
      return true;
    } else if (appleBottomPos < snakeBottomPos && appleBottomPos > snakeTopPos) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function snakeGrowUp() {
  if (currentDirection === "right") {
    currentSnakePosition.x = currentSnakePosition.x - gameObjectSize;
    snakeCurrentSize = snakeCurrentSize + gameObjectSize
    $snake.css({'width': snakeCurrentSize.toString() + 'px'});
  } else if (currentDirection === "left") {

  } else if (currentDirection === "down") {

  } else if (currentDirection === "up") {

  }
}


// function updateGameDimension() {
//   browserDimensions.width = window.innerWidth;
//   browserDimensions.height = window.innerHeight;
// }

// actual game
setInterval(() => {
  if (snakeEatsApple()) {
    appleRespawnPos();
    snakeGrowUp();
    renderPosition($apple);
  } else {
    if (currentDirection === "right") {
      if (currentSnakePosition.x === browserDimensions.width) {
        currentSnakePosition.x = 0;
      } else {
        currentSnakePosition.x++;
      }
      renderPosition($snake);
    } else if (currentDirection === "left") {
      if (currentSnakePosition.x === 0) {
        currentSnakePosition.x = browserDimensions.width;
      } else {
        currentSnakePosition.x--;
      }
      renderPosition($snake);
    } else if (currentDirection === "down") {
      if (currentSnakePosition.y === browserDimensions.height) {
        currentSnakePosition.y = 0;
      } else {
        currentSnakePosition.y++;
      }
      renderPosition($snake);
    } else if (currentDirection === "up") {
      if (currentSnakePosition.y === 0) {
        currentSnakePosition.y = browserDimensions.height;
      } else {
        currentSnakePosition.y--;
      }
      renderPosition($snake);
    }
  }
}, 5);

function handleMove(e) {
  if (e.keyCode === 38) {
    currentDirection = "up";
  } else if (e.keyCode === 40) {
    currentDirection = "down";
  } else if (e.keyCode === 37) {
    currentDirection = "left";
  } else if (e.keyCode === 39) {
    currentDirection = "right";
  }
}

$body.keydown(handleMove);