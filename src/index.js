function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let expressionWithoutSpaces = expr.split(' ').join('');

    let bracketsArr = ['(', ')'];//priority 3
    let mulDivArr = ['*', '/'];//priority 2
    let plusMinusArr = ['+', '-'];//priority 1

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
    return expressionWithoutErrors;

}

module.exports = {
    expressionCalculator
}