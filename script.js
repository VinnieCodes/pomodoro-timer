let timer;
let isRunning = false;
let isPaused = false;
let isBreak = false;
let workTime = 3; // 25 minutes in seconds
let breakTime = 300; // 5 minutes in seconds
let timeLeft = workTime;

const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const colorInput = document.getElementById("color");
const progressBar = document.getElementById("progress");

const dingSound = new Audio("ding.mp3");
const clickSound = new Audio("click.mp3");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  updateProgressBar();
}

function updateProgressBar() {
  const totalTime = isBreak ? breakTime : workTime;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  progressBar.style.width = `${progress}%`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  isPaused = false;
  clickSound.play(); // Play click sound when start button is pressed
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      dingSound.play(); // Play ding sound when timer ends
      if (isBreak) {
        timeLeft = workTime;
        isBreak = false;
      } else {
        timeLeft = breakTime;
        isBreak = true;
        alert("Time for a break!");
      }
      startTimer();
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
  isPaused = true;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  isBreak = false;
  timeLeft = workTime;
  progressBar.style.width = "0%"; // Reset progress bar immediately
  updateDisplay();
}

function updateColors() {
  document.body.style.setProperty("--bg-color", colorInput.value);
  document.body.style.color = colorInput.value;
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
colorInput.addEventListener("input", updateColors);

updateDisplay();
