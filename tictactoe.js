const board = document.getElementById('board');
const winnerMessage = document.getElementById('winnerMessage');
const afterGame = document.querySelector('.after-game');
const popup = document.getElementById('popup');
let gameMode = localStorage.getItem("gameMode");
let playerName = localStorage.getItem("playerName");
let turn = "X";
let gameOver = false;
let boardLocked = false;
let cells = [];
let scores = {
  X: { win: 0, draw: 0, lose: 0 },
  O: { win: 0, draw: 0, lose: 0 },
};
let compLoseStreak = 0;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleMove(i));
    board.appendChild(cell);
    cells.push("");
  }
  updateScore();
  afterGame.style.display = "none";
}

function handleMove(index) {
  if (boardLocked || cells[index] || gameOver) return;

  cells[index] = turn;
  board.children[index].textContent = turn;

  if (checkWin(turn)) {
    endGame(turn);
    return;
  }

  if (!cells.includes("")) {
    endGame("draw");
    return;
  }

  if (gameMode === "computer" && turn === "X") {
    boardLocked = true;
    turn = "O";
    setTimeout(() => {
      computerMove();
      boardLocked = false;
    }, 800);
  } else {
    turn = turn === "X" ? "O" : "X";
  }
}

// AI komputer lebih susah (menang dulu, blok dulu, baru acak)
function computerMove() {
  let winMove = findWinningMove("O");
  if (winMove !== null) {
    makeMove(winMove);
    return;
  }

  let blockMove = findWinningMove("X");
  if (blockMove !== null) {
    makeMove(blockMove);
    return;
  }

  let empty = cells.map((v, i) => v === "" ? i : null).filter(i => i !== null);
  let choice = empty[Math.floor(Math.random() * empty.length)];
  makeMove(choice);
}

function makeMove(index) {
  cells[index] = turn;
  board.children[index].textContent = turn;

  if (checkWin(turn)) {
    endGame(turn);
    return;
  }

  if (!cells.includes("")) {
    endGame("draw");
    return;
  }

  turn = "X";
}

function findWinningMove(symbol) {
  const lines = [];

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c <= 5; c++) {
      let start = r * 10 + c;
      lines.push([0,1,2,3,4].map(i => start + i));
    }
  }
  for (let c = 0; c < 10; c++) {
    for (let r = 0; r <= 5; r++) {
      let start = r * 10 + c;
      lines.push([0,1,2,3,4].map(i => start + i*10));
    }
  }
  for (let r = 0; r <= 5; r++) {
    for (let c = 0; c <= 5; c++) {
      let start = r * 10 + c;
      lines.push([0,11,22,33,44].map(i => start + i));
    }
  }
  for (let r = 0; r <= 5; r++) {
    for (let c = 4; c < 10; c++) {
      let start = r * 10 + c;
      lines.push([0,9,18,27,36].map(i => start + i));
    }
  }

  for (const line of lines) {
    const res = checkLineForMove(line, symbol);
    if (res !== null) return res;
  }
  return null;
}

function checkLineForMove(line, symbol) {
  let countSymbol = 0;
  let countEmpty = 0;
  let emptyIndex = null;

  for (const idx of line) {
    if (cells[idx] === symbol) countSymbol++;
    else if (cells[idx] === "") {
      countEmpty++;
      emptyIndex = idx;
    } else {
      return null;
    }
  }

  if (countSymbol === 4 && countEmpty === 1) return emptyIndex;
  return null;
}

function checkWin(symbol) {
  const lines = [];

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c <= 5; c++) {
      let start = r * 10 + c;
      lines.push([0, 1, 2, 3, 4].map(i => start + i));
    }
  }

  for (let c = 0; c < 10; c++) {
    for (let r = 0; r <= 5; r++) {
      let start = r * 10 + c;
      lines.push([0, 1, 2, 3, 4].map(i => start + i * 10));
    }
  }

  for (let r = 0; r <= 5; r++) {
    for (let c = 0; c <= 5; c++) {
      let start = r * 10 + c;
      lines.push([0, 11, 22, 33, 44].map(i => start + i));
    }
  }

  for (let r = 0; r <= 5; r++) {
    for (let c = 4; c < 10; c++) {
      let start = r * 10 + c;
      lines.push([0, 9, 18, 27, 36].map(i => start + i));
    }
  }

  return lines.some(line => line.every(i => cells[i] === symbol));
}

function endGame(result) {
  gameOver = true;
  if (result === "draw") {
    scores.X.draw++;
    scores.O.draw++;
    winnerMessage.textContent = "Permainan Seri!";
  } else {
    scores[result].win++;
    let loser = result === "X" ? "O" : "X";
    scores[loser].lose++;
    winnerMessage.textContent = `SELAMAT ${result === "X" ? "Player 1" : gameMode === "friend" ? "Player 2" : "KAMU"} MENANG!`;

    if (gameMode === "computer" && result === "O") {
      compLoseStreak++;
      if (compLoseStreak >= 3) {
        showPopup();
        compLoseStreak = 0;
      }
    } else if (gameMode === "computer") {
      compLoseStreak = 0;
    }
  }

  updateScore();
  afterGame.style.display = "block";
}

function updateScore() {
  document.getElementById("scorePlayer1").innerHTML = `
    Player 1 (X)<br>Menang: ${scores.X.win} | Seri: ${scores.X.draw} | Kalah: ${scores.X.lose}
  `;
  document.getElementById("scorePlayer2").innerHTML =
    gameMode === "friend"
      ? `Player 2 (O)<br>Menang: ${scores.O.win} | Seri: ${scores.O.draw} | Kalah: ${scores.O.lose}`
      : `Komputer (O)<br>Menang: ${scores.O.win} | Seri: ${scores.O.draw} | Kalah: ${scores.O.lose}`;
}

function playAgain() {
  gameOver = false;
  turn = "X";
  createBoard();
}

function goBack() {
  localStorage.removeItem("gameMode");
  scores = {
    X: { win: 0, draw: 0, lose: 0 },
    O: { win: 0, draw: 0, lose: 0 },
  };
  window.location.href = "menu.html";
}

function showPopup() {
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

createBoard();

function goToHome() {
  window.location.href = "index.html";
}

function generateRandomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function displayPlayerInfo() {
  const playerName = localStorage.getItem("playerName") || "Player";
  const code = generateRandomCode();
  const infoDiv = document.getElementById('playerInfo');

  function update() {
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    infoDiv.textContent = `Nama: ${playerName} | Code: ${code} | ${dateStr} ${timeStr}`;
  }

  update();
  setInterval(update, 1000);
}

displayPlayerInfo();