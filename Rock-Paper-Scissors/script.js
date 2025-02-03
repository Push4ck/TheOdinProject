const choices = document.querySelectorAll(".choice");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("winner");
const userScoreDisplay = document.getElementById("user-score");
const computerScoreDisplay = document.getElementById("computer-score");

let userScore = 0;
let computerScore = 0;

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    userChoiceDisplay.textContent = `You: ${userChoice}`;

    const computerChoice = getComputerChoice();
    computerChoiceDisplay.textContent = `Computer: ${computerChoice}`;

    const winner = getWinner(userChoice, computerChoice);
    resultDisplay.textContent = winner;

    updateScore(winner);
  });
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function getWinner(user, computer) {
  if (user === computer) return "It's a Draw!";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    userScore++;
    return "You Win!";
  } else {
    computerScore++;
    return "Computer Wins!";
  }
}

function updateScore(winner) {
  userScoreDisplay.textContent = userScore;
  computerScoreDisplay.textContent = computerScore;
}
