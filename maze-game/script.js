const mazeContainer = document.getElementById('maze');

const levels = [
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
];

const start = { x: 1, y: 1 };
const end = { x: 8, y: 8 };
let currentPos = { ...start };
// let currentLevel = levels[Math.floor(Math.random() * levels.length)];
let currentLevel = levels[Math.floor(Math.random() * (3 - 0) + 0)];

function drawMaze(level) {
  mazeContainer.innerHTML = '';
  mazeContainer.style.gridTemplateColumns = `repeat(${level[0].length}, 30px)`;
  mazeContainer.style.gridTemplateRows = `repeat(${level.length}, 30px)`;

  for (let y = 0; y < level.length; y++) {
    for (let x = 0; x < level[y].length; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (level[y][x] === 1) {
        cell.classList.add('wall');
      } else {
        cell.classList.add('path');
      }
      if (x === start.x && y === start.y) {
        cell.classList.add('start');
      }
      if (x === end.x && y === end.y) {
        cell.classList.add('end');
      }
      if (x === currentPos.x && y === currentPos.y) {
        cell.classList.add('current');
      }
      mazeContainer.appendChild(cell);
    }
  }
}

function movePlayer(event) {
  const directions = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };

  const direction = directions[event.key];
  if (direction) {
    const newX = currentPos.x + direction.x;
    const newY = currentPos.y + direction.y;
    if (isValidMove(newX, newY)) {
      currentPos = { x: newX, y: newY };
      drawMaze(currentLevel);
      checkWin();
    }
  }
}

function isValidMove(x, y) {
  return currentLevel[y] && currentLevel[y][x] === 0;
}

function checkWin() {
  if (currentPos.x === end.x && currentPos.y === end.y) {
    alert('¡Has llegado al final del laberinto!');
    loadNewMaze();
  }
}

function solveMaze() {
  const level = currentLevel;
  const solution = findPath(level, start, end);

  if (solution) {
    for (const step of solution) {
      const index = step.y * level[0].length + step.x;
      mazeContainer.children[index].classList.add('solution');
    }
  } else {
    alert('No se encontró una solución');
  }
}

function findPath(maze, start, end) {
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  const path = [];
  const visited = new Set();
  const queue = [{ ...start, path: [] }];

  while (queue.length) {
    const { x, y, path } = queue.shift();

    if (x === end.x && y === end.y) {
      return path;
    }

    for (const direction of directions) {
      const nx = x + direction.x;
      const ny = y + direction.y;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < maze[0].length &&
        ny < maze.length &&
        maze[ny][nx] === 0 &&
        !visited.has(`${nx},${ny}`)
      ) {
        visited.add(`${nx},${ny}`);
        queue.push({ x: nx, y: ny, path: [...path, { x: nx, y: ny }] });
      }
    }
  }

  return null;
}

function loadNewMaze() {
  currentLevel = levels[Math.floor(Math.random() * (3 - 0) + 0)];
  currentPos = { ...start };
  drawMaze(currentLevel);
}

drawMaze(currentLevel);

document.addEventListener('keydown', movePlayer);
