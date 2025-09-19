let score = 0;
let itemCount = 0;
const maxItems = 5; // After 5 items sorted → quiz starts

// Waste items
const wasteItems = [
  { name: "Plastic Bottle", type: "recyclable" },
  { name: "Banana Peel", type: "organic" },
  { name: "Battery", type: "hazardous" },
  { name: "Newspaper", type: "recyclable" },
  { name: "Food Scraps", type: "organic" },
  { name: "Broken Glass", type: "hazardous" }
];

// Quiz Data
const quizData = [
  {
    question: "Which of these is recyclable?",
    options: ["Plastic Bottle", "Banana Peel", "Battery"],
    answer: "Plastic Bottle"
  },
  {
    question: "Where should you throw food waste?",
    options: ["Recyclable Bin", "Organic Bin", "Hazardous Bin"],
    answer: "Organic Bin"
  }
];

let currentQuestion = 0;

function startGame() {
  score = 0;
  itemCount = 0;
  document.getElementById("score").innerText = score;
  document.getElementById("quiz-section").classList.add("hidden");

  const itemsDiv = document.getElementById("items");
  itemsDiv.innerHTML = "";

  spawnItem();
}

function spawnItem() {
  if (itemCount >= maxItems) {
    startQuiz();
    return;
  }

  const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];

  const item = document.createElement("div");
  item.classList.add("item");
  item.innerText = randomItem.name;
  item.draggable = true;
  item.dataset.type = randomItem.type;

  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", item.dataset.type);
    e.dataTransfer.setData("elementId", Date.now().toString());
    item.id = e.dataTransfer.getData("elementId");
  });

  document.getElementById("items").appendChild(item);
  itemCount++;
}

// Allow drop in bins
document.querySelectorAll(".bin").forEach(bin => {
  bin.addEventListener("dragover", e => e.preventDefault());

  bin.addEventListener("drop", e => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const itemId = e.dataTransfer.getData("elementId");
    const item = document.getElementById(itemId);

    if (!item) return;

    if (bin.id === type) {
      score++;
      document.getElementById("score").innerText = score;
      item.remove();
    } else {
      item.remove();
    }

    setTimeout(spawnItem, 500);
  });
});

// QUIZ FUNCTIONS
function startQuiz() {
  document.getElementById("items").innerHTML = "";
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
    document.getElementById("feedback").innerText =
      "❌ Wrong! Correct answer: " + q.answer;
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
    document.getElementById("feedback").innerText = "Great job sorting waste!";
    document.getElementById("next-btn").classList.add("hidden");
  }
}
