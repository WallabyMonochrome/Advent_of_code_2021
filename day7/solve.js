const fs = require('fs');

let crabs = fs.readFileSync('input.txt', 'utf-8').split(',').map((r) => parseInt(r, 10));

console.log('Crabs: ', crabs);

function computeCheapestRoute() {
    const max = Math.max(...crabs);
    let cheap = null;
    let cheapPosition;
    for(let i = 0; i < max; i++) {
        let currentGas = 0;
        for(let j = 0; j < crabs.length; j++) {
            currentGas += Math.abs(crabs[j] - i);
        }
        if(currentGas < cheap || !cheap) {
            cheap = currentGas;
            cheapPosition = i;
        }
    } 
    console.log('Part 1 solution: ', cheapPosition, cheap);
}

function computeCheapestRouteEngine() {
    const max = Math.max(...crabs);
    let cheap = null;
    let cheapPosition;
    for(let i = 0; i < max; i++) {
        let currentGas = 0;
        for(let j = 0; j < crabs.length; j++) {
            currentGas += factorielle(Math.abs(crabs[j] - i), 0);
        }
        if(currentGas < cheap || !cheap) {
            cheap = currentGas;
            cheapPosition = i;
        }
    } 
    console.log('Part 2 solution: ', cheapPosition, cheap);
}

function factorielle(nb, current) {
    if(nb === current) return current;
    return current + factorielle(nb, current + 1);
}

// computeCheapestRoute();
computeCheapestRouteEngine();