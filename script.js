'use strict';

//Начальные значения очков и текущего игрока
let currentScore = 0;
let activePlayer = 0;
let totalScores = [0, 0];
let isPlaying = true;

//Выборка элементов
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Elemet = document.getElementById('current--0');
const current1Elemet = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Установка изначальных значений
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

//Смена игрока и обнуление очков
const swithActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //Отображение игральной кости
    diceElement.classList.remove('hidden');
    diceElement.src = `../Pig-dice-game-/img/dice${diceNumber}.png`;

    // diceElement.classList.add('roll-animation-3d');
    // setTimeout(function () {
    //   diceElement.src = `../Pig-dice-game-/img/dice${diceNumber}.png`;

    //   diceElement.classList.remove('roll-animation-3d');
    // }, 1500);

    if (diceNumber !== 1) {
      //Подсчет очков для активного игрока
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else swithActivePlayer();
  }
});

//Фиксирование очков и проверка пробеды
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swithActivePlayer();
    }
  }
});

//Новая игра
btnNew.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = 0;
  totalScores = [0, 0];
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Elemet.textContent = 0;
  current1Elemet.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
});
