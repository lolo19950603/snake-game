const snake = document.querySelector("#snake");

let current_position = { x: 0, y: 0 };
let current_direction = "right";

let brower_dimension = { width: window.innerWidth, height: window.innerHeight };



function updateGameDimension() {
  brower_dimension.width = window.innerWidth;
  brower_dimension.height = window.innerHeight;
}

setInterval(() => {
  if (current_direction === "right") {
    if (current_position.x === brower_dimension.width) {
      current_position.x = 0;
    } else {
      current_position.x++;
    }
    snake.style =
      "top: " + current_position.y.toString() + "px; " +
      "left: " + current_position.x.toString() + "px;";
  } else if (current_direction === "left") {
    if (current_position.x === 0) {
      current_position.x = brower_dimension.width;
    } else {
      current_position.x--;
    }
    snake.style =
      "top: " + current_position.y.toString() + "px; " +
      "left: " + current_position.x.toString() + "px;";
  } else if (current_direction === "down") {
    if (current_position.y === brower_dimension.height) {
      current_position.y = 0;
    } else {
      current_position.y++;
    }
    snake.style =
      "top: " + current_position.y.toString() + "px; " +
      "left: " + current_position.x.toString() + "px;";
  } else if (current_direction === "up") {
    if (current_position.y === 0) {
      current_position.y = brower_dimension.height;
    } else {
      current_position.y--;
    }
    snake.style =
      "top: " + current_position.y.toString() + "px; " +
      "left: " + current_position.x.toString() + "px;";
  }
  updateGameDimension()
}, 5);

function handleMove(e) {
  if (e.keyCode === 38) {
    console.log("up arrow pressed");
    current_direction = "up";
  } else if (e.keyCode === 40) {
    console.log("down arrow pressed");
    current_direction = "down";
  } else if (e.keyCode === 37) {
    console.log("left arrow pressed");
    current_direction = "left";
  } else if (e.keyCode === 39) {
    console.log("right arrow pressed");
    current_direction = "right";
  }
}

document.addEventListener("keydown", handleMove);
