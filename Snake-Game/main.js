//html elements
const gameBoard = document.querySelector("#game-board");
const instructionText = document.querySelector("#instruction-text");
const logo = document.querySelector("#logo");
//game variables
let snake = [{ x: 10, y: 10 }]; //coordinates of the snake
//generate random position for the food
const gridSize = 20;
const genRandomFoodPosition = () => {
  const x = Math.floor(Math.random() * gridSize + 1);
  const y = Math.floor(Math.random() * gridSize + 1);
  return { x, y };
};
let food = genRandomFoodPosition(); //coordinates of the food
let direction = "right"; //direction of the snake
let gameInterval; //game interval
let gameSpeedDelay = 200; //game speed
let gameStarted = false;
//GAME FUNCTIONS

//function that draws elements into  map
const createGameElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};
//set position of the snake or food on the map
const setPosition = (element, { x, y }) => {
  element.style.gridRow = y;
  element.style.gridColumn = x;
};
//draw snake
const drawSnake = () => {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    gameBoard.insertAdjacentElement("beforeend", snakeElement);
  });
};
//draw food
const drawFood = () => {
  const foodElement = createGameElement("div");
  foodElement.classList.add("food");
  setPosition(foodElement, food);
  gameBoard.insertAdjacentElement("afterbegin", foodElement);
};
//Draw game map, snake and food
const drawGameMap = () => {
  gameBoard.innerHTML = "";
  drawSnake();
  drawFood();
};
//move snake
const move = () => {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = genRandomFoodPosition();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      // checkCollision();
      drawGameMap();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
};
//start game
const startGame = () => {
  gameStarted = true; //game started tracker
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    // checkCollision();
    drawGameMap();
  }, gameSpeedDelay);
};

//keypress listener
const handleKeyPress = (e) => {
  console.log(e.key);
  if ((!gameStarted && e.key === " ") || (!gameStarted && e.code === "Space")) {
    startGame();
  } else {
    switch (e.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
};

document.addEventListener("keydown", handleKeyPress);
