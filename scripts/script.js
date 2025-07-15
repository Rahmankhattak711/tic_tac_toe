import { ResetBoard, showFinalResult } from "./game.js";

const playerOneInput = document.getElementById("playerOne");
const playerTwoInput = document.getElementById("playerTwo");
const roundInput = document.getElementById("round");
const roundInfo = document.getElementById("roundInfo");
const showUserName = document.getElementById("showUserName");
const winnerDisplay = document.getElementById("winner");
const boxes = document.querySelectorAll(".box");

let playerOneName = "Player 1";
let playerTwoName = "Player 2";
let totalRounds = 0;
let currentRound = 0;
let playerOneScore = 0;
let playerTwoScore = 0;

export function CheckWin(boxes, currentPlayer) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of winLines) {
    const [a, b, c] = line;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      const winnerName = currentPlayer === "X" ? playerOneName : playerTwoName;
      if (currentPlayer === "X") {
        playerOneScore++;
      } else {
        playerTwoScore++;
      }

      winnerDisplay.textContent = `🎉 ${winnerName} wins Round ${currentRound}!`;
      disableBoxes();

      setTimeout(() => {
        HandleNextRound(currentPlayer, (newPlayer) => {
          currentPlayer = newPlayer;
        });
      }, 2000);
      return true;
    }
  }
  return false;
}

export function HandleNextRound(currentPlayer, updateCurrentPlayer) {
  currentRound++;

  if (currentRound > totalRounds) {
    showFinalResult(
      playerOneScore,
      playerTwoScore,
      playerOneName,
      playerTwoName
    );
    return;
  }

  updateCurrentPlayer(currentPlayer);
  ResetBoard();
  UpdateRoundDisplay();
  UpdateTurnDisplay(currentPlayer);
}

function disableBoxes() {
  boxes.forEach((box) => (box.style.pointerEvents = "none"));
}

export function TotalRoundAndNames(e) {
  e.preventDefault();

  playerOneName = playerOneInput.value || "Player 1";
  playerTwoName = playerTwoInput.value || "Player 2";
  totalRounds = parseInt(roundInput.value) || 1;
  currentRound = 1;
  playerOneScore = 0;
  playerTwoScore = 0;
}

export function OnTurnChange(name, currentPlayer) {
  showUserName.textContent = `${name}'s Turn (${currentPlayer})`;
}

export function UpdateRoundDisplay() {
  roundInfo.textContent = `Round ${currentRound} of ${totalRounds}`;
}

export function UpdateTurnDisplay(currentPlayer) {
  const name = currentPlayer === "X" ? playerOneName : playerTwoName;
  OnTurnChange(name, currentPlayer);
}
