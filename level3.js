let score = 0;
let timeLeft = 30;
let timerInterval;
let lights = [];

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("timer").innerText = "Time: " + timeLeft;

  createGrid();

  // clear old timers if restarting
  clearInterval(timerInterval);

  // countdown timer
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert(
        "⏳ Time’s up! Final Score: " +
          score +
          "\n💡 Remember: Turning off unused lights saves electricity!"
      );
    } else {
      // randomly turn one light back on
      reactivateLight();
    }
  }, 1000);
}

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  lights = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const light = document.createElement("div");
    light.classList.add("light"); // by default ON

    // click to switch off
    light.addEventListener("click", () => {
      if (!light.classList.contains("off")) {
        light.classList.add("off");
        score++;
        document.getElementById("score").innerText = "Score: " + score;
      }
    });

    cell.appendChild(light);
    grid.appendChild(cell);
    lights.push(light);
  }
}

function reactivateLight() {
  if (lights.length === 0) return;

  // choose a random light
  const index = Math.floor(Math.random() * lights.length);
  const light = lights[index];

  // turn it back on if it’s off
  if (light.classList.contains("off")) {
    light.classList.remove("off");
  }
}
