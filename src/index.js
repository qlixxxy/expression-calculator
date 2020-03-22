function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const marks = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    let numberOfOpenBrackets = 0;
    let numberOfCloseBrackets = 0;

    for(let i = 0; i < expr.length; i++) {
        if (expr[i] == '(') {
            numberOfOpenBrackets = numberOfOpenBrackets + 1;
        } else if (expr[i] == ')') {
            numberOfCloseBrackets = numberOfCloseBrackets + 1;
        }
    }

    if (numberOfOpenBrackets !== numberOfCloseBrackets) {
        throw new TypeError("ExpressionError: Brackets must be paired");
    }
    expr = ' ' + expr.match(/([+*-/)(]{1}|[0-9]+)/g).join(' ') + ' ';
    let exprArr = expr.split(' ');
    let outputLine = [];
    let stack = [];

    for (let i = 1; i < exprArr.length - 1; i++) {
        if (exprArr[i] !== '+' && exprArr[i] !== '-' && exprArr[i] !== '/' && exprArr[i] !== '*' && exprArr[i] !== '(' && exprArr[i] !== ')') {
            outputLine.push(+exprArr[i]);
        } else if (stack.length == 0) {
            stack.push(exprArr[i]);
        } else if (exprArr[i] == '(') {
            stack.push(exprArr[i]);
        } else if (exprArr[i] == ')') {
            while(stack[stack.length - 1] !== '(') {
                let lastEl = stack.pop();
                outputLine.push(lastEl);
            }
            stack.pop();
        } else if (stack[stack.length - 1] == '(') {
            stack.push(exprArr[i]);
        } else if (marks[exprArr[i]] <= marks[stack[stack.length - 1]]) {
            while (marks[exprArr[i]] <= marks[stack[stack.length - 1]]) {
                let lastEl = stack.pop();
                outputLine.push(lastEl);
            }
            stack.push(exprArr[i]);
        } else {
            stack.push(exprArr[i]);
        }
    }

    while(stack.length !== 0) {
        outputLine.push(stack.pop());
    }

    let outputLineLength = outputLine.length;
    for (let i = 0; i < outputLineLength; i++) {
        if (outputLine[i] == '-') {
            let result = outputLine[i-2] - outputLine [i-1];
            outputLine.splice(i-2, 3, result);
            i=-1;
        } else if (outputLine[i] == '+') {
            let result = outputLine[i-2] + outputLine [i-1];
            outputLine.splice(i-2, 3, result);
            i=-1;
        } else if (outputLine[i] == '*') {
            let result = outputLine[i-2] * outputLine [i-1];
            outputLine.splice(i-2, 3, result);
            i=-1;
        } else if (outputLine[i] == '/') {
            if (outputLine[i-1] == 0) {
                throw new TypeError("TypeError: Division by zero.");
            }
            let result = outputLine[i-2] / outputLine [i-1];
            outputLine.splice(i-2, 3, result);
            i=-1;
        }
    }
    return outputLine[0];
}


module.exports = {
    expressionCalculator
}