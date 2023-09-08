(function init() {
    'use strict';
    class Calculator {
        constructor(previousOperandText, currentOperandText) {
            this.previousOperandText = previousOperandText;
            this.currentOperandText = currentOperandText;
            this.clear();
        }

        clear() {
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
        }
         
        delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }

        appendNumber(number) {
            if (number === '.' && this.currentOperand.includes('.')) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }

        chooseOperation(operation) {
            if (this.currentOperand === '') return;
            if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }

        compute() {
            let computation
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
                case '+': 
                    computation = prev + current
                break
                case '-': 
                    computation = prev - current
                break
                case '÷': 
                    computation = prev / current
                break
                case '*': 
                    computation = prev * current
                break
                default: 
                    return
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }
        
        getDisplayNum(number) {
            const stringNum = number.toString();
            const integerDigits = parseFloat(stringNum.split('.')[0]);
            const decimalDigits = stringNum.split('.')[1];
            let integerDisplay
            if (isNaN(integerDigits)) {
                integerDisplay = '';
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {maxiumFractionDigits: 0});
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
        }

        update() {
            this.currentOperandText.innerText = this.getDisplayNum(this.currentOperand);
            if (this.operation != null) {
                this.previousOperandText.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`;
            } else {
                this.previousOperandText.innerText = '';
            }
        }
    }

    const numButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('delete');
    const previousOperandText = document.querySelector('[data-previous-operand]');
    const currentOperandText = document.querySelector('[data-current-operand]');

    const calculator = new Calculator(previousOperandText, currentOperandText);
    numButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
            calculator.update();
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText);
            calculator.update();
        });
    });

    equalsButton.addEventListener('click', button => {
        calculator.compute();
        calculator.update();
    });

    clearButton.addEventListener('click', button => {
        calculator.clear();
        calculator.update();
    });

    deleteButton.addEventListener('click', button => {
        calculator.delete();
        calculator.update();
    });
})();