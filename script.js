// Show game section
function showGame(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
showGame("dice");

// Dice Roller
function rollDice() {
  const num1 = Math.floor(Math.random() * 6) + 1;
  const num2 = Math.floor(Math.random() * 6) + 1;
  const faces = [
    "<i class='fa-solid fa-dice-one'></i>",
    "<i class='fa-solid fa-dice-two'></i>",
    "<i class='fa-solid fa-dice-three'></i>",
    "<i class='fa-solid fa-dice-four'></i>",
    "<i class='fa-solid fa-dice-five'></i>",
    "<i class='fa-solid fa-dice-six'></i>"
  ];
  document.querySelector(".dice-one").innerHTML = faces[num1 - 1];
  document.querySelector(".dice-two").innerHTML = faces[num2 - 1];

  const title = document.getElementById("diceTitle");
  const winnerDiv = document.getElementById("winnerDiv");
  if (num1 > num2) {
    title.textContent = "Player One Wins!";
    winnerDiv.classList.add("active-flag");
  } else if (num1 < num2) {
    title.textContent = "Player Two Wins!";
    winnerDiv.classList.add("active-flag");
  } else {
    title.textContent = "Draw!";
    winnerDiv.classList.remove("active-flag");
  }
}

// Drum Kit
const drums = document.querySelectorAll(".drum");
drums.forEach(btn => {
  btn.addEventListener("click", function() {
    makeSound(this.innerHTML);
    buttonAnimation(this.innerHTML);
  });
});
document.addEventListener("keydown", function(event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});
function makeSound(key) {
  let sounds = {
    w: "tom-1.mp3",
    a: "tom-2.mp3",
    s: "tom-3.mp3",
    d: "tom-4.mp3",
    j: "snare.mp3",
    k: "crash.mp3",
    l: "kick-bass.mp3"
  };
  if (sounds[key]) {
    new Audio("sounds/" + sounds[key]).play();
  }
}
function buttonAnimation(key) {
  const btn = document.querySelector("." + key);
  if (btn) {
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 100);
  }
}

// Rock Paper Scissors
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let autoPlayInterval;

function playGame(playerMove) {
  const moves = ["rock", "paper", "scissors"];
  const computerMove = moves[Math.floor(Math.random() * 3)];
  let result = "";

  if (playerMove === computerMove) result = "Tie.";
  else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) result = "You win.";
  else result = "You lose.";

  document.querySelector(".moves").innerHTML = `You <img src="${playerMove}-emoji.png" class="score-img"> <img src="${computerMove}-emoji.png" class="score-img"> Computer`;

  if (result === "You win.") {
    document.querySelector(".Result").textContent = "You Win";
    document.querySelector(".Wins").textContent = `Wins: ${++score.wins}`;
  } else if (result === "You lose.") {
    document.querySelector(".Result").textContent = "You Lose";
    document.querySelector(".Losses").textContent = `Losses: ${++score.losses}`;
  } else {
    document.querySelector(".Result").textContent = "Tie";
    document.querySelector(".Ties").textContent = `Ties: ${++score.ties}`;
  }
  localStorage.setItem("score", JSON.stringify(score));
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  document.querySelector(".Wins").textContent = "Wins: 0";
  document.querySelector(".Losses").textContent = "Losses: 0";
  document.querySelector(".Ties").textContent = "Ties: 0";
  localStorage.removeItem("score");
}

function toggleAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  } else {
    autoPlayInterval = setInterval(() => {
      const moves = ["rock", "paper", "scissors"];
      const playerMove = moves[Math.floor(Math.random() * 3)];
      playGame(playerMove);
    }, 1000);
  }
}
