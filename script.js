'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let diceRoll = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    if (diceRoll != 1) {
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

let totalScore = 0;

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to the score of current player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. if score >= 100
    //current player wins the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      console.log(`Player ${activePlayer} is the winner of the game..!!`);

      document.querySelector('.dice').classList.add('hidden');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    player0El.classList.add('player--active');
    playing = true;
  }

  currentScore = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  if (activePlayer === 1) {
    activePlayer = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
});
