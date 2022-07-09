const snake = document.querySelector("#snake");

let currentPosition = { x: 0, y: 0 };
let currentDirection = "right";

let browerDimensions = { width: 670, height: 670 };

Math.floor(Math.random() * 671);



// function updateGameDimension() {
//   browerDimensions.width = window.innerWidth;
//   browerDimensions.height = window.innerHeight;
// }

setInterval(() => {
  if (currentDirection === "right") {
    if (currentPosition.x === browerDimensions.width) {
      currentPosition.x = 0;
    } else {
      currentPosition.x++;
    }
    snake.style =
      "top: " + currentPosition.y.toString() + "px; " +
      "left: " + currentPosition.x.toString() + "px;";
  } else if (currentDirection === "left") {
    if (currentPosition.x === 0) {
      currentPosition.x = browerDimensions.width;
    } else {
      currentPosition.x--;
    }
    snake.style =
      "top: " + currentPosition.y.toString() + "px; " +
      "left: " + currentPosition.x.toString() + "px;";
  } else if (currentDirection === "down") {
    if (currentPosition.y === browerDimensions.height) {
      currentPosition.y = 0;
    } else {
      currentPosition.y++;
    }
    snake.style =
      "top: " + currentPosition.y.toString() + "px; " +
      "left: " + currentPosition.x.toString() + "px;";
  } else if (currentDirection === "up") {
    if (currentPosition.y === 0) {
      currentPosition.y = browerDimensions.height;
    } else {
      currentPosition.y--;
    }
    snake.style =
      "top: " + currentPosition.y.toString() + "px; " +
      "left: " + currentPosition.x.toString() + "px;";
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
