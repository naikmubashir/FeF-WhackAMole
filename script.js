const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const startBtn = document.querySelector('.start-btn');
const moles = document.querySelectorAll('.mole');
const timerDisplay = document.querySelector('.timer'); // Timer display
let lastHole;
let timeUp = false;
let flag = false;
let score = 0;
let countdown; // Variable to store countdown interval
let timeLeft = 10; // Starting time in seconds

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Ah nah, that\'s the same one bud');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  startBtn.disabled = true;
  scoreBoard.textContent = 0;
  timeLeft = 10; // Reset the time left
  timeUp = false;
  score = 0;
  timerDisplay.textContent = timeLeft; // Reset timer display
  peep();
  countdown = setInterval(countDownTimer, 1000); // Start the countdown
  setTimeout(() => {
    startBtn.disabled = false;
    timeUp = true;
    clearInterval(countdown); // Stop the countdown when the game ends
  }, 10000); // Game duration: 10 seconds
}

function bonk(e) {
  if (!e.isTrusted) return; // Prevent cheating
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

function countDownTimer() {
  timeLeft--; // Decrease the time left
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(countdown); // Stop countdown at 0
  }
}

moles.forEach(mole => mole.addEventListener('click', bonk));
