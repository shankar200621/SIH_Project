let score = 0;
let gameInterval;
let tapCount = 0;
const maxTaps = 5; // After 5 taps, quiz starts

// Quiz Data
const quizData = [
  {
    question: "How much water can a leaking tap waste in a year?",
    options: ["50 liters", "500 liters", "5000 liters"],
    answer: "5000 liters"
  },
  {
    question: "What is the best way to save water at home?",
    options: ["Keep taps open", "Fix leaks quickly", "Use more buckets"],
    answer: "Fix leaks quickly"
  }
];

let currentQuestion = 0;

function startGame() {
  score = 0;
  tapCount = 0;
  document.getElementById("score").innerText = score;
  clearInterval(gameInterval);

  document.getElementById("quiz-section").classList.add("hidden");
  document.getElementById("feedback").innerText = "";

  gameInterval = setInterval(spawnTap, 1500);
}

function spawnTap() {
  const gameArea = document.getElementById("game-area");
  if (tapCount >= maxTaps) {
    clearInterval(gameInterval);
    setTimeout(startQuiz, 1000);
    return;
  }

  const tap = document.createElement("div");
  tap.classList.add("tap");

  // Add dripping water
  const drop = document.createElement("div");
  drop.classList.add("drop");
  tap.appendChild(drop);

  // Random position
  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 60;
  tap.style.left = Math.floor(Math.random() * maxX) + "px";
  tap.style.top = Math.floor(Math.random() * maxY) + "px";

  // On click → fix leak
  tap.addEventListener("click", () => {
    score++;
    tapCount++;
    document.getElementById("score").innerText = score;
    gameArea.removeChild(tap);
  });

  gameArea.appendChild(tap);

  // Auto remove after few seconds if not clicked
  setTimeout(() => {
    if (gameArea.contains(tap)) {
      gameArea.removeChild(tap);
      tapCount++;
    }
  }, 3000);
}

// QUIZ FUNCTIONS
function startQuiz() {
  document.getElementById("game-area").innerHTML = "";
  document.getElementById("quiz-section").classList.remove("hidden");
  currentQuestion = 0;
  showQuestion();
}

function showQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("feedback").innerText = "";
  document.getElementById("next-btn").classList.add("hidden");
}

function checkAnswer(selected) {
  const q = quizData[currentQuestion];
  if (selected === q.answer) {
    document.getElementById("feedback").innerText = "✅ Correct!";
  } else {
    document.getElementById("feedback").innerText = "❌ Wrong! Correct answer: " + q.answer;
  }
  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    document.getElementById("question").innerText = "🎉 Quiz Completed!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").innerText = "Great job saving water!";
    document.getElementById("next-btn").classList.add("hidden");
  }
}
