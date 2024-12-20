const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const pointBtn = document.querySelector(".point");
const lastScreen = document.querySelector(".last");
const currentScreen = document.querySelector(".current");
let operator = "";
let previousValue = "";
let currentValue = "";

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleNumber(btn.textContent);
    currentScreen.textContent = currentValue;
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleOperator(btn.textContent);
    lastScreen.textContent = previousValue + " " + operator;
    currentScreen.textContent = currentValue;
  });
});

equalBtn.addEventListener("click", () => {
  if (currentValue != "" && previousValue != "") {
    calculate();
    lastScreen.textContent = "";
    currentScreen.textContent = previousValue;
  }
});

clearBtn.addEventListener("click", clearScreen);

pointBtn.addEventListener("click", addPoint);

deleteBtn.addEventListener("click", deleteNumber);

function handleNumber(num) {
  if (currentValue.length <= 9) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function clearScreen() {
  previousValue = "";
  currentValue = "";
  operator = "";
  lastScreen.textContent = "";
  currentScreen.textContent = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);
  switch (operator) {
    case "+":
      previousValue += currentValue;
      break;
    case "−":
      previousValue -= currentValue;
      break;
    case "×":
      previousValue *= currentValue;
      break;
    case "÷":
      previousValue /= currentValue;
      break;
    default:
      break;
  }
  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function addPoint() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentScreen.textContent = currentValue;
  }
}

function deleteNumber() {
  currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
}
