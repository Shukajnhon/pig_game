'use strict'

// Selecting Element
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// console.log(dice);

// start conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// const scores = [0, 0]
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

let scores, currentScore, activePlayer, playing;

// function

//
const init = function () {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    //switch to the next player
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
};



// ------- HANDLE EVENT--------
// Rolling dice functionality 
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);



        // 2. display dice 
        diceEl.classList.remove('hidden')

        diceEl.src = `./img/dice-${dice}.png`

        // 3. check for rolled 1: if true
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore


        } else {
            //switch to the next player
            switchPlayer()
        }

    }

});

// hold
btnHold.addEventListener('click', function () {
    if (playing) {
        // console.log(scores[activePlayer])
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // finish game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {

            // 3. switch to the next player
            switchPlayer()

        }
    }
});

// reset game
btnNew.addEventListener('click', init);