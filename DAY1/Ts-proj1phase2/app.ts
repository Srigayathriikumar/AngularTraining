let currentInput: string = "";
let operator: string = "";
let previousInput: string = "";

function appendToDisplay(value: string): void {
    const display = document.getElementById("display") as HTMLInputElement;
    
    if (['+', '-', '*', '/'].indexOf(value) !== -1) {
        if (currentInput !== "") {
            if (previousInput !== "" && operator !== "") {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            currentInput = "";
        }
    } else {
        currentInput += value;
    }
    
    display.value = currentInput || previousInput || "0";
}

function calculate(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    
    if (previousInput === "" || currentInput === "" || operator === "") {
        return;
    }
    
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result: number;
    
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

function clearDisplay(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    display.value = "0";
    currentInput = "";
    previousInput = "";
    operator = "";
}

function deleteLast(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || "0";
    }
}