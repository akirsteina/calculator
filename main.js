// doubleclick on operator???

let activeNumber = '';
let activeOperator = '';
let storedNumber = '';
let result = '';

// if input length > 7, returns false
function checkInputSize(input) {
    return input.length < 7;
}


function digitIsPressed(digit) {
    result = '';
    if (activeNumber === '0') { // if activeNumber = 0, turns it to decimal 0.
        activeNumber = `0.`;
        updateScreen();
    } else if (checkInputSize(activeNumber) === false) { // doesnt allow input size > 7
        activeNumber;
        updateScreen();
        alert('Max input length (7) exceeded')
    } else { // adds next digit to activeNumber
        activeNumber += digit;
        updateScreen();
    }
}

function operatorIsPressed(operator) {
    if (result) { // if there is already a result from previous operation, turns it to activeNumber and clears result value
        activeNumber = result;
        result = '';
    }
    if (activeNumber === '0' && storedNumber && activeOperator === '/') { // does not allow to divide by zero, clears all variable values
        clearScreen();
        alert('This time it is not allowed to divide by zero');
    }
    activeOperator = operator;
    doMath(); // only passes when there is a storedNumber as well
    storedNumber = activeNumber;
    updateScreen();
    activeNumber = '';
}

function dotIsPressed(dot) {
    if (activeNumber === '') { // if activeNumber is empty but a dot button is pressed, turns input to '0.'
        activeNumber = `0${dot}`;
        updateScreen();
    } else if (activeNumber.length >= 6) { // doesn't allow to add dot when input length >=6
        alert('Max input length exceeded');
        return;
    } else if (activeNumber.includes(dot)) { // doesn't allow to add more than a single dot
        return;
    } else { // adds a single dot to input number
        activeNumber += dot;
        updateScreen();
    }
}

function equalsIsPressed() {
    if (activeNumber === '0' && storedNumber && activeOperator === '/') { // doesn't allow to divide by zero
        clearScreen();
        alert('This time it is not allowed to divide by zero');
    } else { // does math and saves result, clears the rest of variable values
        doMath();
        updateScreen();
        result = activeNumber;
        storedNumber = '';
        activeOperator = '';
        activeNumber = '';
    }
}

// clears all variable values
function clearScreen() {
    activeNumber = '';
    activeOperator = '';
    storedNumber = '';
    result = '';
    updateScreen();
}

// clears last input character
function deleteLastDigit() {
    activeNumber = activeNumber.slice(0, -1);
    updateScreen();
}

// updates the activeNumber value on screen
function updateScreen() {
    document.getElementById('screen').innerHTML = activeNumber;
}

function doMath() {
    if (activeNumber && storedNumber && activeOperator) {
        switch (activeOperator) {
            case '+':
                activeNumber = parseFloat(storedNumber) + parseFloat(activeNumber);
                // have to change rounding if result = whole number (unnecessary zeros)
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