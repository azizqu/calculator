console.log("welcome to my calculator")
//create object to keep track of values

const calculator = {
    displayVal: '0',
    firstOperand: null, 
    secondOperand: false,
    operator: null,
};

function inputNum(number){
    const {displayVal, secondOperand} = calculator;
    //takes displayVal in calculator object and checks if it is 0, appends number if it is not
    if(secondOperand === true){
        calculator.displayVal = number;
        calculator.secondOperand = false;
    } else {
        calculator.displayVal = displayVal === '0' ? number: displayVal + number;
    }
    
    console.log(calculator);

}

function inputDecimal(decimal){
    if(calculator.secondOperand === true){
        calculator.displayVal = '0.'
        calculator.secondOperand = false;
        return
    }

    //if displayVal doesnt contain a decimal point
    if(!calculator.displayVal.includes(decimal)){
        calculator.displayVal += decimal;
    }
}

function handleOperator(nextOperator){

    const{firstOperand, displayVal, operator} = calculator
    //parseFloat to turn string into number
    const inputValue = parseFloat(displayVal);
    
    if(operator && calculator.secondOperand){
        calculator.operator = nextOperator;
        console.log(calculator);
        return
    }

    if(firstOperand === null && !isNaN(inputValue)){
        //updates firstOperand prop
        calculator.firstOperand = inputValue;
    } else if(operator){
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayVal = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand = result;
    }
    calculator.secondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function clearCalculator(target){
    calculator.displayVal = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator){
    if (operator === '+') {
        return firstOperand + secondOperand;
      } else if (operator === '-') {
        return firstOperand - secondOperand;
      } else if (operator === '*') {
        return firstOperand * secondOperand;
      } else if (operator === '/') {
        return firstOperand / secondOperand;
      }
    
      return secondOperand;
}

//update display
function updateDisplay() {
    const screen = document.querySelector('.calculator-screen');
    //update value of element with whats stored in displayVal
    screen.value = calculator.displayVal;
}
updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event)=>{
    //to access clicked element
    const {target} = event;
    const{value} = target;

    if(!target.matches('button')){
        return;
    }

    switch(value) {
        case '+':
        case '-':
        case '=':
        case '/':
        case '*':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            clearCalculator()
            break;
          default:
              //check if the key is a integer
              if(Number.isInteger(parseFloat(value))){
                  inputNum(value);
              }
    }

    updateDisplay();

})

