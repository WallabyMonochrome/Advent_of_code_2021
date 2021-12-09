const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf-8').split('\n').map((l) => l.split('').map((n) => parseInt(n)));

// Part 1
function getLowPoint() {
    const lowPoint = [];
    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[i].length; j++) {
            let foundLower = false;
            // Check Top
           if((i > 0 && input[i-1][j] <= input[i][j])){
            foundLower = true;
           }
           // Check Bottom
           if((i < input.length - 1 && input[i+1][j] <= input[i][j])){
            foundLower = true;
           }
           if((j > 0 && input[i][j-1] <= input[i][j])){
            foundLower = true;

           }
           if((j < input[i].length - 1 && input[i][j+1] <= input[i][j])){
            foundLower = true;
           }
           if(!foundLower) {
               lowPoint.push(input[i][j] + 1);
           }
        }
    }
    const total = lowPoint.reduce((acc, c,) => ( acc + c), 0)
    console.log('Part 1 solution: ', total);
}

// Part 2
function getPoolSize() {
    let poolSize = [];
    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[i].length; j++) {
            let foundLower = false;
            // Check Top
           if((i > 0 && input[i-1][j] <= input[i][j])){
            foundLower = true;
           }
           // Check Bottom
           if((i < input.length - 1 && input[i+1][j] <= input[i][j])){
            foundLower = true;
           }
           if((j > 0 && input[i][j-1] <= input[i][j])){
            foundLower = true;

           }
           if((j < input[i].length - 1 && input[i][j+1] <= input[i][j])){
            foundLower = true;
           }
           if(!foundLower) {
                visitedPosition = {};
               const total = poolComputation(i, j);
               poolSize.push(total);
           }
        }
    }
    poolSize = poolSize.sort((a, b) => b - a);
    console.log('Part 2 solution: ', poolSize[0] * poolSize[1] * poolSize[2]);
}

let visitedPosition = {};

function poolComputation(posX, posY) {
    if(visitedPosition[`${posX}|${posY}`]) {
        return 0;
    } else {
        visitedPosition[`${posX}|${posY}`] = true;
    }
    if(input[posX][posY] === 9) return 0;
    let total = 0;
    if((posX > 0 && input[posX-1][posY] > input[posX][posY])){
        total += poolComputation(posX - 1, posY);
    }

    if((posX < input.length - 1 && input[posX+1][posY] > input[posX][posY])){
        total += poolComputation(posX + 1, posY);
    }

    if((posY > 0 && input[posX][posY-1] > input[posX][posY])){
        total += poolComputation(posX, posY - 1);
    }

    if((posY < input[posX].length - 1 && input[posX][posY+1] > input[posX][posY])){
        total += poolComputation(posX, posY + 1);
    }
    return total + 1;
}

// getLowPoint();
getPoolSize();