const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const startBtn = document.querySelector('.start-btn');
const moles = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left'); // New line
let lastHole;
let timeUp = false;
let score = 0;
let countdown; // New line

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
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
  timeUp = false;
  score = 0;
  peep();
  countdown = 10; // New line
  timeLeft.textContent = countdown; // New line
  countdownTimer(); // New line
  setTimeout(() => {
    startBtn.disabled = false;
    timeUp = true;
  }, 10000);
}

// New function
function countdownTimer() {
  const timer = setInterval(() => {
    countdown--;
    timeLeft.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(timer);
      timeUp = true;
    }
  }, 1000);
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));