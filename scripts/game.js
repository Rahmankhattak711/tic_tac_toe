import {
  CheckWin,
  HandleNextRound,
  TotalRoundAndNames,
  UpdateRoundDisplay,
  UpdateTurnDisplay,
} from "./script.js";

const boxes = document.querySelectorAll(".box");
const winnerDisplay = document.getElementById("winner");
const drawDisplay = document.getElementById("draw");
const resetButton = document.getElementById("reset");
const startGamesBtn = document.getElementById("startGames");
const outerContainer = document.getElementById("outerContainer");
const formStyle = document.getElementById("formStyle");
const innerContainer = document.getElementById("innerContainer");
const crossAudio = document.getElementById("audio_cross");
const circleAudio = document.getElementById("audio_circle");
const wowAudio = document.getElementById("wow_audio");

let currentPlayer = "X";

startGamesBtn.addEventListener("click", () => {
  startGamesBtn.style.display = "none";
  outerContainer.style.display = "block";
});

formStyle.addEventListener("submit", (e) => {
  TotalRoundAndNames(e);
  outerContainer.style.display = "none";
  innerContainer.style.display = "block";

  UpdateRoundDisplay();
  UpdateTurnDisplay(currentPlayer);
});

function checkDraw() {
  if (
    [...boxes].every((box) => box.textContent) &&
    !winnerDisplay.textContent
  ) {
    drawDisplay.textContent = "It's a Draw! Next Round";
    setTimeout(() => {
      HandleNextRound(currentPlayer, updateCurrentPlayer);
    }, 1500);
    return true;
  }
  return false;
}

export function ResetBoard() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.style.pointerEvents = "auto";
  });
  winnerDisplay.textContent = "";
  drawDisplay.textContent = "";
  UpdateTurnDisplay(currentPlayer);
}

resetButton.addEventListener("click", ResetBoard);

export function showFinalResult(
  playerOneScore,
  playerTwoScore,
  playerOneName,
  playerTwoName
) {
  confetti({
    particleCount: 1000,
    spread: 360,
    colors: [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#9400D3",
      "#FF00FF",
    ],
  });

  innerContainer.innerHTML = `
    <h2>Game Over!</h2>
    <p>${playerOneName}: ${playerOneScore} wins</p>
    <p>${playerTwoName}: ${playerTwoScore} wins</p>
    <p>${
      playerOneScore > playerTwoScore
        ? `🏆 ${playerOneName} is the Champion!`
        : playerTwoScore > playerOneScore
        ? `🏆 ${playerTwoName} is the Champion!`
        : "It's a Tie!"
    }</p>
    <button class="reset" id="restartGameBtn">Restart Game</button>
  `;

    wowAudio.play();

  document
    .getElementById("restartGameBtn")
    .addEventListener("click", restartGame);
}

function restartGame() {
  location.reload();
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.textContent && !winnerDisplay.textContent) {
      box.textContent = currentPlayer;
      if (!CheckWin(boxes, currentPlayer) && !checkDraw()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentPlayer === "X" ? crossAudio.play() : circleAudio.play();
        UpdateTurnDisplay(currentPlayer);
      }
    }
  });
});

function updateCurrentPlayer(player) {
  currentPlayer = player;
}
