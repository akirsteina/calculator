// doubleclick on operator???

let activeNumber = '';
let activeOperator = '';
let storedNumber = '';
let result = '';

function checkInputSize(input) {
    return input.length < 7;
}

function digitIsPressed(digit) {
    result = '';
    if (activeNumber === '0') {
        activeNumber = `0.`;
        updateScreen();
    } else if (checkInputSize(activeNumber) === false) {
        activeNumber;
        updateScreen();
        alert('Max input length (7) exceeded')
    } else {
        activeNumber += digit;
        updateScreen();
    }
}

function operatorIsPressed(operator) {
    if (result) {
        activeNumber = result;
        result = '';
    }
    if (activeNumber === '0' && storedNumber && activeOperator === '/') {
        clearScreen();
        alert('This time it is not allowed to divide by zero');
    }
    activeOperator = operator;
    doMath();
    storedNumber = activeNumber;
    updateScreen();
    activeNumber = '';
}

function dotIsPressed(dot) {
    if (activeNumber === '') {
        activeNumber = `0${dot}`;
        updateScreen();
    } else if (activeNumber.length >= 6) {
        activeNumber;
        alert('Max input length exceeded');
    } else if (activeNumber.includes(dot)) {
        return;
    } else {
        activeNumber += dot;
        updateScreen();
    }
}

function equalsIsPressed() {
    if (activeNumber === '0' && storedNumber && activeOperator === '/') {
        clearScreen();
        alert('This time it is not allowed to divide by zero');
    } else {
        doMath();
        updateScreen();
        result = activeNumber;
        storedNumber = '';
        activeOperator = '';
        activeNumber = '';
    }
}

function clearScreen() {
    activeNumber = '';
    activeOperator = '';
    storedNumber = '';
    result = '';
    updateScreen();
}

function deleteLastDigit() {
    activeNumber = activeNumber.slice(0, -1);
    updateScreen();
}

function updateScreen() {
    document.getElementById('screen').innerHTML = activeNumber;
}

function doMath() {
    if (activeNumber && storedNumber && activeOperator) {
        switch (activeOperator) {
            case '+':
                activeNumber = parseFloat(storedNumber) + parseFloat(activeNumber);
                activeNumber = activeNumber.toPrecision(5);
                break;
            case '-':
                activeNumber = parseFloat(storedNumber) - parseFloat(activeNumber);
                activeNumber = activeNumber.toPrecision(5);
                break;
            case '/':
                activeNumber = parseFloat(storedNumber) / parseFloat(activeNumber);
                activeNumber = activeNumber.toPrecision(5);
                break;
            case '*':
                activeNumber = parseFloat(storedNumber) * parseFloat(activeNumber);
                activeNumber = activeNumber.toPrecision(5);
                break;
        }
    }
}