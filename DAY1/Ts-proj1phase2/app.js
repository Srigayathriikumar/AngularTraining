var currentInput = "";
var operator = "";
var previousInput = "";
function appendToDisplay(value) {
    var display = document.getElementById("display");
    if (['+', '-', '*', '/'].indexOf(value) !== -1) {
        if (currentInput !== "") {
            if (previousInput !== "" && operator !== "") {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            currentInput = "";
        }
    }
    else {
        currentInput += value;
    }
    display.value = currentInput || previousInput || "0";
}
function calculate() {
    var display = document.getElementById("display");
    if (previousInput === "" || currentInput === "" || operator === "") {
        return;
    }
    var num1 = parseFloat(previousInput);
    var num2 = parseFloat(currentInput);
    var result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                display.value = "Error";
                clearDisplay();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }
    display.value = result.toString();
    currentInput = result.toString();
    previousInput = "";
    operator = "";
}
function clearDisplay() {
    var display = document.getElementById("display");
    display.value = "0";
    currentInput = "";
    previousInput = "";
    operator = "";
}
function deleteLast() {
    var display = document.getElementById("display");
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || "0";
    }
}
