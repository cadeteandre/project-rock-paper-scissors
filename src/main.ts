import './style.css'
import * as winLogo from './images/you-win.png';
import * as gameOver1 from './images/game-over-2.png';
import * as gameOver2 from './images/game-over.png';
import * as rockImg from './images/rockChoice.png';
import * as paperImg from './images/paperChoice.png';
import * as scissorsImg from './images/scissorsChoice.png';

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
      <div class="finally__img"><img src={${winLogo}}></div>
    `;
    } else if(computerWinsCount > playerWinsCount) {
      letsPlayDiv.innerHTML = `
      <div class="finally__img"><img src={${gameOver1}}></div>
      <div class="finally__img"><img src={${gameOver2}}></div>
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

  switch(move) {
    case 'rockChoice':
      moveImg.src = `${rockImg}`;
      break;
    case 'paperChoice':
      moveImg.src = `${paperImg}`;
      break;
    case 'scissorsChoice':
      moveImg.src = `${scissorsImg}`;
      break;
  }

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