import './style.css'

//* ---------------------- Selecting HTML Elements ----------------------
const roundsOptions = document.querySelectorAll('.roundsCount') as NodeListOf<HTMLInputElement>;
const playerWinsDiv = document.querySelector('#playerWins') as HTMLDivElement;
const playerMove = document.querySelector('#playerMove') as HTMLDivElement;
const computerMove = document.querySelector('#computerMove') as HTMLDivElement;
const computerWinsDiv = document.querySelector('#computerWins') as HTMLDivElement;
const moveButtons = document.querySelectorAll('.move__btn') as NodeListOf<HTMLButtonElement>;
const letsPlayDiv = document.querySelector('#letsPlay') as HTMLDivElement;

let roundsAmount: number = 0;
let roundsCount: number= 0;
let playerWinsCount: number = 0;
let computerWinsCount: number = 0;

//* ---------------------- Computers move ----------------------
function computersMove(): string {
  const randomNum = Math.floor(Math.random() * 9) + 1;
  let result: string = '';
  switch(true) {
    case(randomNum > 0 && randomNum <= 3):
      result = 'rockChoice';
      break;
    case(randomNum > 3 && randomNum <= 6):
      result = 'paperChoice';
      break;
    case(randomNum > 6 && randomNum <= 9):
      result = 'scissorsChoice';
      break;
  }

  return result;
}

//* ---------------------- Comparing moves ----------------------
function runningGame(playerMove: string, computerMove: string): void {
  switch(true) {
    case(playerMove === computerMove):
      console.log('draw game!');
    break;
    case(playerMove === 'rockChoice' && computerMove === 'paperChoice'):
    case(playerMove === 'paperChoice' && computerMove === 'scissorsChoice'):
    case(playerMove === 'scissorsChoice' && computerMove === 'rockChoice'):
      computerWinsCount++;
    break;
    case(playerMove === 'rockChoice' && computerMove === 'scissorsChoice'):
    case(playerMove === 'paperChoice' && computerMove === 'rockChoice'):
    case(playerMove === 'scissorsChoice' && computerMove === 'paperChoice'):
      playerWinsCount++;
    break;
  }

  playerWinsDiv.textContent = `${playerWinsCount}`;
  computerWinsDiv.textContent = `${computerWinsCount}`;
  displayMove(computerMove, 'computer');
  displayMove(playerMove, 'player');
  
  if(roundsCount === roundsAmount) {
    if(playerWinsCount > computerWinsCount) {
      letsPlayDiv.innerHTML = `
      <div class="finally__img"><img src="./images/you-win.png"></div>
    `;
    } else if(computerWinsCount > playerWinsCount) {
      letsPlayDiv.innerHTML = `
      <div class="finally__img"><img src="./images/game-over-2.png"></div>
      <div class="finally__img"><img src="./images/game-over.png"></div>
    `;
    } else if(computerWinsCount === playerWinsCount) {
      letsPlayDiv.innerHTML = `
        <p>Draw game!</p>
      `;
    }
  }
}

function displayMove(move: string, player: string): void {
  const moveImg = document.createElement('img') as HTMLImageElement;
  moveImg.classList.add('move__img');
  moveImg.src = `./src/images/${move}.png`;

  if(player === 'player') {
    playerMove.innerHTML = '';
    playerMove.appendChild(moveImg);
  } else if(player === 'computer') {
    computerMove.innerHTML = '';
    computerMove.appendChild(moveImg);
  }
}

moveButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if(roundsAmount === 0) {
      roundsAmount = 5;
      roundsCount++;
      runningGame(button.id, computersMove());
    } else {
      roundsCount++;
      runningGame(button.id, computersMove());
    }
  });
});

roundsOptions.forEach((inputRadio) => {
  inputRadio.addEventListener('click', () => {
    //* ---------------------- How many rounds ? ----------------------
    switch(true) {
      case (roundsOptions[0].checked):
        roundsAmount = Number(roundsOptions[0].value);
        break;
      case (roundsOptions[1].checked):
        roundsAmount = Number(roundsOptions[1].value);
        break;
      case (roundsOptions[2].checked):
        roundsAmount = Number(roundsOptions[2].value);
        break;
      case (roundsOptions[3].checked):
        roundsAmount = Number(roundsOptions[3].value);
        break;
    }
  })
})