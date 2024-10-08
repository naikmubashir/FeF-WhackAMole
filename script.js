
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const startBtn = document.querySelector('.start-btn');
  const moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
  let flag=false;
  let score = 0;
  let countdown = 10
  let gameDuration = countdown * 1000
  
  function updateTimer(time) {
    if(time === 10) console.log('start timer')
    const value = time < 10 ? "0" + time : time;
    document.querySelector('.timer').textContent = `00:${value}`
  }
    
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
      if (!timeUp && countdown !== 0) peep();
    }, time);
  }

  function startGame() {
    startBtn.disabled=true;
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    updateTimer(countdown);
    peep();
    const tick = setInterval(() => {
      countdown--
      updateTimer(countdown)
    }, 1000);
    
    setTimeout(() => {
      startBtn.disabled=false;
      timeUp = true
      clearInterval(tick)
      countdown = 10;
    }, gameDuration)
  }

  function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

 


  moles.forEach(mole => mole.addEventListener('click', bonk));

