function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let expressionWithoutSpaces = expr.split(' ').join('');

    /*function checking errors*/

    const funcCheckErr = function(str) {
        let i = 0;
        let result = '';
        let openBracket = 0;
        let closeBracket = 0;
        for (i = 0; i < str.length; i++) {
            if (str[i] === ')' && openBracket === 0) {
                result = 'BracketErr';
                break;
            } else if (str[i] === '(') {
                openBracket++;
            } else if (str[i] === ')') {
                closeBracket++;
            } else if (str[i] === '/' && str[i + 1] === '0') {
                result = 'ZeroErr';
                break;
            }
        }
        if (openBracket !== closeBracket && result !== 'ZeroErr') {
            result = 'BracketErr';
        } else if (result === 'BracketErr') {
            result = 'BracketErr';
        } else if (result === 'ZeroErr') {
            result = 'ZeroErr';
        } else {
            result = str;
        }
        return result;
    }

    let expressionCheckedErrors = funcCheckErr(expressionWithoutSpaces);
    
    if (expressionCheckedErrors === 'ZeroErr') {
        throw "TypeError: Division by zero.";
    } else if (expressionCheckedErrors === 'BracketErr') {
        throw "ExpressionError: Brackets must be paired";
    }

    let expressionWithoutErrors = expressionCheckedErrors;
    
    /*function does one most priority action*/

    const mostPriorityAction = function(str) {
        let i = 0;
        let result = str;
        let operator = 0;
        let leftChar = 0;
        let rightChar = str.length - 1;
        for (i = 0; i < str.length; i++) {
            if (str[i] === ')') {
                rightChar = i - 1;
                result = str.slice(leftChar, rightChar + 1);
                break;
            }
            if (str[i] === '(' && str[i + 1] !== '(') {
                leftChar = i + 1;
                result = str.slice(leftChar, rightChar + 1);
            }
        }

        /*checking operators between brackets*/

        if (result.includes('*') || result.includes('/') || result.includes('+') || result.slice(1).includes('-')) {
            result = str.slice(leftChar, rightChar + 1);
        } else if (result.includes('(') || result.includes(')')) {
            result = str.slice(leftChar, rightChar + 1);
            str = `${str.slice(0, leftChar - 1)}${result}${str.slice(rightChar + 2)}`;
            result = str;
            leftChar = 0;
            rightChar = str.length - 1;
        } else {
            str = `${str.slice(0, leftChar - 1)}${result}${str.slice(rightChar + 2)}`;
            result = str;
            leftChar = 0;
            rightChar = str.length - 1;
        }

        /*mostPriorityAction function begin operation*/

        if (result.includes('*') || result.includes('/')) {
            i = leftChar;
            if (str[0] === '-') {
                i++;
            }
            while (i < rightChar) {
                if (str[i] === '+' || str[i] === '-') {
                    leftChar = i + 1;
                } else if (str[i] === '*' || str[i] === '/') {
                    operator = i;
                    break;
                }
                i++;
            }

            i++;

            while (str[i] < str.length) {
                if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/') {
                    break;
                }
                rightChar = i;
                i++;
                if (str[i] === '.') {
                    i++;
                }
            }

            let leftOperand = +str.slice(leftChar, operator);
            let rightOperand = +str.slice(operator + 1, rightChar + 1);
            let operationResult = 0;

            if (str[operator] === '*') {
                operationResult = leftOperand * rightOperand;
            } else if (str[operator] === '/') {
                operationResult = leftOperand / rightOperand;
            }
            result = `${str.slice(0, leftChar)}${operationResult}${str.slice(rightChar + 1)}`;
        } else {
            i = leftChar;
            if (str[0] === '-') {
                i++;
            }
            while (i < rightChar) {
                if (str[i] === '+' || str[i] === '-') {
                    operator = i;
                    break;
                }
                i++;
            }
            i = operator + 1;
            while (i < str.length) {
                if (str[i] === '.') {
                    i++;
                    rightChar = i;
                }
                if (str[i + 1] === ')') {
                    rightChar = i;
                    break;
                }
                if (str[i] === '+' || str[i] === '-') {
                    break;
                }
                rightChar = i;
                i++;
            }

            if (str.includes('+') || str.includes('*') || str.includes('/') || str.includes('(') || str.includes(')') || str.slice(1).includes('-')) {
                let leftOperand = +str.slice(leftChar, operator);
                let rightOperand = +str.slice(operator + 1, rightChar + 1);
                let operationResult = 0;

                if (str[operator] === '+') {
                    operationResult = leftOperand + rightOperand;
                } else if (str[operator] === '-') {
                    operationResult = leftOperand - rightOperand;
                }
                result = `${str.slice(0, leftChar)}${operationResult}${str.slice(rightChar + 1)}`;
            }
        }
        return result;
    }

    /*cycle does math actions*/

    let currentAction = expressionWithoutErrors;
    let expressionBeforeAction;
    let expressionAfterAction;
    do {
        expressionBeforeAction = currentAction;
        expressionAfterAction = mostPriorityAction(currentAction);
        if (!expressionAfterAction.includes('+') && !expressionAfterAction.includes('*') && !expressionAfterAction.includes('/') && !expressionAfterAction.slice(1).includes('-')) {
            return Number(Number(expressionAfterAction).toFixed(4));
        }
        currentAction = expressionAfterAction;
    } while (expressionBeforeAction !== expressionAfterAction);

    return Number(Number(expressionAfterAction).toFixed(4));
}

module.exports = {
    expressionCalculator
}