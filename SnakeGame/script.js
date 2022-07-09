const snake = document.querySelector("#snake");
const $snake = $('#snake');
const $apple = $('#apple');

let gameSize = 670;
let currentSnakePosition = { x: 0, y: 0 };
let currentApplePosition = { x: 0, y: 0 };
initializePosition();
let currentDirection = "right";

let browerDimensions = { width: gameSize, height: gameSize };

function appleRespawnPos() {
  currentApplePosition.x = Math.floor(Math.random() * 671);
  currentApplePosition.y = Math.floor(Math.random() * 671) - 30;
}

function initializePosition() {
  // initialize apple's position
  currentApplePosition.x = Math.floor(Math.random() * 671);
  currentApplePosition.y = Math.floor(Math.random() * 671) - 30;
  renderPosition($apple);
  // initialize snake's position
  currentSnakePosition.x = Math.floor(gameSize/2);
  currentSnakePosition.y = Math.floor(gameSize/2);
  renderPosition($snake);
}

function renderPosition(jQueryObject) {
  if (jQueryObject === $apple) {
    $apple.css({'background-color': 'red',
                'top': currentApplePosition.y.toString() + 'px',
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


// function updateGameDimension() {
//   browerDimensions.width = window.innerWidth;
//   browerDimensions.height = window.innerHeight;
// }


setInterval(() => {
  appleRespawnPos();
  renderPosition($apple);
}, 1000)

setInterval(() => {
  if (currentDirection === "right") {
    if (currentSnakePosition.x === browerDimensions.width) {
      currentSnakePosition.x = 0;
    } else {
      currentSnakePosition.x++;
    }
    renderPosition($snake);
  } else if (currentDirection === "left") {
    if (currentSnakePosition.x === 0) {
      currentSnakePosition.x = browerDimensions.width;
    } else {
      currentSnakePosition.x--;
    }
    renderPosition($snake);
  } else if (currentDirection === "down") {
    if (currentSnakePosition.y === browerDimensions.height) {
      currentSnakePosition.y = 0;
    } else {
      currentSnakePosition.y++;
    }
    renderPosition($snake);
  } else if (currentDirection === "up") {
    if (currentSnakePosition.y === 0) {
      currentSnakePosition.y = browerDimensions.height;
    } else {
      currentSnakePosition.y--;
    }
    renderPosition($snake);
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

document.addEventListener("keydown", handleMove);
