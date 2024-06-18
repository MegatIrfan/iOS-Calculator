document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');
    const display = document.querySelector('.result');

    let currentInput = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'AC') {
                resetCalculator();
                updateDisplay();
                return;
            }

            if (value === '+/-') {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay();
                return;
            }

            if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay();
                return;
            }

            if (value === '=') {
                if (operator) {
                    currentInput = performCalculation(firstValue, currentInput, operator);
                    operator = null;
                    waitingForSecondValue = false;
                    updateDisplay();
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (operator && waitingForSecondValue) {
                    firstValue = performCalculation(firstValue, currentInput, operator);
                    currentInput = firstValue;
                } else {
                    firstValue = currentInput;
                }
                operator = value;
                waitingForSecondValue = true;
                updateDisplay(true);  // Display the operator as well
                return;
            }

            handleNumber(value);
            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (waitingForSecondValue) {
            currentInput = value;
            waitingForSecondValue = false;
        } else {
            currentInput = currentInput === '0' ? value : currentInput + value;
        }
    }

    function performCalculation(first, second, operator) {
        first = parseFloat(first);
        second = parseFloat(second);

        if (operator === '+') return (first + second).toString();
        if (operator === '-') return (first - second).toString();
        if (operator === '*') return (first * second).toString();
        if (operator === '/') return (first / second).toString();

        return second;
    }

    function resetCalculator() {
        currentInput = '0';
        firstValue = null;
        operator = null;
        waitingForSecondValue = false;
    }

    function updateDisplay(showOperator = false) {
        display.textContent = showOperator && operator ? `${currentInput} ${operator}` : currentInput;
    }

    updateDisplay();
});
