let previousScreen = '';
let currentScreen = ''
let operator = '';

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.decimal');
const previousScreenEl = document.querySelector('.previous-screen');
const currentScreenEl = document.querySelector('.current-screen');


deleteButton.addEventListener('click', deleteNumber);

clearButton.addEventListener('click', clear);

decimalButton.addEventListener('click', addDecimal)

equalButton.addEventListener('click', () => {
    if (currentScreen == '0') {
        currentScreen = '';
        currentScreenEl.textContent = 'Divide by 0 not allowed';
        previousScreenEl.textContent = '';
    } else {
        calculate();
    }
})

numberButtons.forEach( button => {
    button.addEventListener('click', () => handleNumber(button.textContent))
})

operatorButtons.forEach( button => {
    button.addEventListener('click', () => handleOperator(button.textContent))
})



function deleteNumber() {
    if (currentScreenEl.textContent !== 'Divide by 0 not allowed') {
        currentScreen = currentScreen.slice(0, -1);
        currentScreenEl.textContent = currentScreenEl.textContent.slice(0, -1)
    }
}

function clear() {
    previousScreenEl.textContent = '';
    currentScreenEl.textContent = '';
    previousScreen = '';
    currentScreen = ''
    operator = '';
}

function handleNumber(num) {
    if (currentScreen.length <= 18) {
        currentScreen += num;
        currentScreenEl.textContent = currentScreen;
    }
}

function handleOperator(op) {
    operator = op;
    previousScreen = currentScreen;
    previousScreenEl.textContent = currentScreen + ' ' + op
    currentScreen = '';
    currentScreenEl.textContent = currentScreen;
}

function calculate() {
    previousScreen = Number(previousScreen);
    currentScreen = Number(currentScreen);

    switch (operator) {
        case '÷':
            previousScreen /= currentScreen;
            break;
        case '×':
            previousScreen *= currentScreen;
            break;
        case '-':
            previousScreen -= currentScreen;
            break;
        case '+':
            previousScreen += currentScreen;
            break;
    }
    previousScreen = roundNumber(previousScreen)
    currentScreen = previousScreen.toString();
    currentScreenEl.textContent = previousScreen.toString();
    previousScreenEl.textContent = '';

}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal() {
    if (!currentScreen.includes('.')) {
        currentScreen += '.';
        currentScreenEl.textContent = currentScreen;
    }
}