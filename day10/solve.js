const fs = require('fs');

let syntax = fs.readFileSync('input.txt', 'utf-8').split('\n');

console.log('Sntax: ', syntax);

function findSyntaxError() {
    let errorSymbol = [];
    let autocompleteScore = [];
    syntax.forEach((s) => {
        const dictCheck = {
            ')': '(',
            ']': '[',
            '>': '<',
            '}': '{',
        }
        const dictCheckReverse = {
            '(' : ')',
            '[' : ']',
            '<' : '>',
            '{' : '}',
        }
        let encouteredSymbol = [];
        let foundError = false;
        for (let i = 0; i < s.split('').length; i++) {
            const c = s[i];
            if (!dictCheck[c]) {
                encouteredSymbol.push(c);
            } else {
                let closingSymbol = c;
                let openingSymbol = encouteredSymbol.pop();
                if (dictCheck[closingSymbol] != openingSymbol) {
                    // console.log(`Exppected: ${openingSymbol} but found ${dictCheck[closingSymbol]}`);
                    foundError = true;
                    errorSymbol.push(c);
                    break;
                }
            }
        }
        if(encouteredSymbol.length != 0 && ! foundError) {
            encouteredSymbol = encouteredSymbol.reverse();
            let score = 0;
            encouteredSymbol.forEach((s) => {
                score *= 5;
                switch(dictCheckReverse[s]) {
                    case ')':
                        score += 1;
                        break;
                    case ']':
                        score += 2;
                        break;
                    case '>':
                        score += 4;
                        break;
                    case '}':
                        score += 3;
                        break;
                    default:
                        break;
                }
                // console.log('Complete by ', dictCheckReverse[s]);
            });
            autocompleteScore.push(score);
        }
    });
    let total = errorSymbol.reduce((acc, c) => {
        switch(c) {
            case ')':
                return acc += 3;
            case ']':
                return acc += 57;
            case '>':
                return acc += 25137;
            case '}':
                return acc += 1197;
            default:
                break;
        }
    }, 0);
    console.log('Part 1 solution: ', total);
    autocompleteScore = autocompleteScore.sort((a,b) => (a - b));
    console.log('What: ', autocompleteScore);
    let totalPart2 = autocompleteScore[Math.floor(autocompleteScore.length/2)];
    console.log('Part 2 solution: ', totalPart2);
}

findSyntaxError();