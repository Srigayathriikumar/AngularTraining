// filepath: c:\Users\Srigayat\OneDrive - EPS US, LLC\Documents\Angular Training\day1\Ts-proj1\app.ts
function calculate(operator) {
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var resultText = document.getElementById("resultText");
    var res;
    if (num1 === "" || num2 === "") {
        resultText.innerText = "Result: Please enter valid numbers";
        return;
    }
    switch (operator) {
        case '+':
            res = Number(num1) + Number(num2);
            break;
        case '-':
            res = Number(num1) - Number(num2);
            break;
        case '*':
            res = Number(num1) * Number(num2);
            break;
        case '/':
            if (Number(num2) === 0) {
                res = "Cannot divide by zero";
            }
            else {
                res = Number(num1) / Number(num2);
            }
            break;
        default:
            res = "Invalid operator";
            break;
    }
    resultText.innerText = "Result: ".concat(res);
}
