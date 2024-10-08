const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const startBtn = document.querySelector('.start-btn');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let countdownInterval;

// Create audio element for background music
const music = new Audio('alexander-nakarada-chase(chosic.com).mp3'); // Replace with your actual music file
music.loop = true; // Loop the music

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
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

  // Start the music
  music.currentTime = 3; // Set the music start time
  music.play();

  let countdown = 30; // 30 seconds countdown
  startBtn.textContent = `Time Left: ${countdown}s`;
  startBtn.style.color = ''; // Reset color in case of restart

  peep();

  // Countdown logic
  countdownInterval = setInterval(() => {
    countdown--;

    // Change text color to red for the last 10 seconds
    if (countdown <= 10) {
      startBtn.style.color = 'red';
    } else {
      startBtn.style.color = ''; // Default color
    }

    startBtn.textContent = `Time Left: ${countdown}s`;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      endGame();
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(countdownInterval);
    endGame();
  }, 30000); // Game runs for 30 seconds
}

function endGame() {
  startBtn.disabled = false;
  timeUp = true;

  // Stop the music
  music.pause();

  // Get the current high score from local storage
  let highScore = localStorage.getItem('highScore') || 0;

  // Check if the current score is higher than the high score
  if (score > highScore) {
    localStorage.setItem('highScore', score); // Update the high score
    highScore = score; // Set high score to current score
  }

  // Display the final score and high score in the alert
  alert(`Game ended! Your final score is: ${score}\nYour highest score is: ${highScore}`);
  
  startBtn.textContent = 'Start Game';
  startBtn.style.color = ''; // Reset the button color back to normal
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
