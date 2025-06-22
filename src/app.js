import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const cardContainer = document.getElementById("cardContainer");
const logContainer = document.getElementById("logContainer");

let cards = [];
let steps = [];

const suits = ["♦", "♥", "♠", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function getRandomCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { value, suit };
}

function generateCards(count) {
  cards = [];
  steps = [];
  for (let i = 0; i < count; i++) {
    cards.push(getRandomCard());
  }
  renderCards();
}


function renderCards() {
  const list = document.getElementById("cardContainer");
  list.innerHTML = "";

  for (let card of cards) {
    const cardDiv = document.createElement("div");
    const suitClass = (card.suit === "♥") ? "heart" :
      (card.suit === "♦") ? "diamond" :
        (card.suit === "♠") ? "spade" : "club";

    cardDiv.className = `card ${suitClass}`;
    cardDiv.innerHTML = `
      <div class="corner top-left">${card.value} ${card.suit}</div>
      <div class="card-value">${card.suit}</div>
      <div class="corner bottom-right">${card.value} ${card.suit}</div>
    `;
    cardContainer.appendChild(cardDiv);
  }
}

function getValueIndex(value) {
  return values.indexOf(value);
}

function renderStepsLog() {
  const logContainer = document.getElementById("logContainer");
  logContainer.innerHTML = "";

  steps.forEach((step, index) => {
    const stepTitle = document.createElement("div");
    stepTitle.innerHTML = `<strong>Paso ${index + 1}:</strong>`;
    logContainer.appendChild(stepTitle);

    const stepRow = document.createElement("div");
    stepRow.classList.add("card-step-row");

    step.forEach(card => {
      const cardDiv = document.createElement("div");
      const suitClass = (card.suit === "♥") ? "heart" :
        (card.suit === "♦") ? "diamond" :
          (card.suit === "♠") ? "spade" : "club";
      cardDiv.className = `card ${suitClass}`;
      cardDiv.innerHTML = `
        <div class="corner top-left">${card.value} ${card.suit}</div>
        <div class="card-value">${card.suit}</div>
        <div class="corner bottom-right">${card.value} ${card.suit}</div>
      `;

      stepRow.appendChild(cardDiv);

    });

    logContainer.appendChild(stepRow);
  });
}



function bubbleSortCards() {

  steps = [];

  let sortedCards = cards.map(card => ({ ...card }));
  let wall = sortedCards.length - 1;

  while (wall > 0) {
    for (let i = 0; i < wall; i++) {
      if (getValueIndex(sortedCards[i].value) > getValueIndex(sortedCards[i + 1].value)) {
        const temp = sortedCards[i];
        sortedCards[i] = sortedCards[i + 1];
        sortedCards[i + 1] = temp;

        steps.push(sortedCards.map(card => ({ ...card })));
      }
    }
    wall--;
  }

  renderStepsLog();
  console.log("Pasos de ordenamiento:", steps);
}


document.getElementById("drawBtn").addEventListener("click", () => {
  const count = parseInt(document.getElementById("cardCount").value);
  if (!isNaN(count) && count > 0) {
    generateCards(count);
  } else {
    alert("Por favor ingresa un número válido de cartas.");
  }
});

document.getElementById("sortBtn").addEventListener("click", () => {
  if (cards.length > 0) {
    bubbleSortCards();
  }
});





