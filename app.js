const display = document.querySelector('h1')
const buttons = document.querySelectorAll('button')
const clearBtn = document.querySelector('.clear')

//variables
let firstValue = 0
let operatorValue = ''
let nextInQueue = false
const calculatation = {
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
}

//functions
function displayItem(item) {
  if (nextInQueue) {
    display.textContent = item
    nextInQueue = false
  } else {
    const displayValue = display.textContent
    display.innerText = displayValue == 0 ? item : displayValue + item
  }
}

function useOperator(operator) {
  const currentValue = Number(display.textContent)
  if (!firstValue) {
    firstValue = currentValue
  } else {
    const calculate = calculatation[operatorValue](firstValue, currentValue)
    display.textContent = calculate
    firstValue = calculate
  }
  //console.log(firstValue, operator, currentValue)
  nextInQueue = true
  operatorValue = operator
}

function addDecimal() {
  if (!display.textContent.includes('.')) {
    display.textContent = `${display.textContent}.`
  }
}

function reset() {
  display.textContent = '0'
}
//event listeners
buttons.forEach((inputBtn) => {
  if (inputBtn.classList.length == 0) {
    inputBtn.addEventListener('click', () => displayItem(inputBtn.value))
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal())
  }
})

clearBtn.addEventListener('click', reset)
