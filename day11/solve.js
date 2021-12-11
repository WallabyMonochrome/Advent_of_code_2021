const fs = require('fs');
let jellyArray = fs.readFileSync('input.txt', 'utf-8').split('\n');
jellyArray = jellyArray.map((n) => n.split('').map((v) => parseInt(v, 10)));

function jellyProceed(nbStep) {
    let totalFlashes = 0;
    for(let i = 0; i < nbStep; i++) {
        energyIncrease();
        let flashed = true;
        while(flashed) {
            let countFlash = checkForFlash();
            if(countFlash) {
                totalFlashes += countFlash;
            } else {
                flashed = false
            }
        }
        const allFlash = checkIfTheyAllFlash();
        if(allFlash) {
            console.log('They all flashed !' , i);
            return;
        }
    }
    visualizeArray();
    console.log('Total flash: ', totalFlashes);
}

function checkIfTheyAllFlash() {
    let haveFlashed = true;
    for(let row = 0; row < jellyArray.length; row++) {
        for(let col = 0; col < jellyArray[0].length; col++) {
            if(jellyArray[row][col]) {
                haveFlashed = false;
            }
        }
    }
    return haveFlashed;
}

function energyIncrease() {
    for(let row = 0; row < jellyArray.length; row++) {
        for(let col = 0; col < jellyArray[0].length; col++) {
            jellyArray[row][col]++;
        }
    }
}

function checkForFlash() {
    let flashed = 0;
    for(let row = 0; row < jellyArray.length; row++) {
        for(let col = 0; col < jellyArray[0].length; col++) {
            if(jellyArray[row][col] > 9) {
                proceedToFlash(row, col);
                flashed ++;
            }
        }
    }
    return flashed;
}

function visualizeArray() {
    jellyArray.forEach((row) => {
        console.log(row.join('-'));
    });
}

function proceedToFlash(row, col) {
    jellyArray[row][col] = 0;
    if(jellyArray[row -1]) {
        jellyArray[row -1][col] !== 0 ?  jellyArray[row -1][col]++ : '';
        jellyArray[row -1][col - 1] && jellyArray[row -1][col - 1] !== 0? jellyArray[row -1][col -1]++ : '';
        jellyArray[row -1][col + 1] &&  jellyArray[row -1][col + 1] !== 0 ? jellyArray[row -1][col + 1]++ : '';
    }
    if(jellyArray[row]) {
        jellyArray[row][col - 1] && jellyArray[row][col - 1] !== 0 ? jellyArray[row][col -1]++ : '';
        jellyArray[row][col + 1] && jellyArray[row][col + 1] !== 0 ? jellyArray[row][col + 1]++ : '';
    }
    if(jellyArray[row + 1]) {
        jellyArray[row + 1][col] &&  jellyArray[row + 1][col] !== 0 ? jellyArray[row + 1][col]++ : '';
        jellyArray[row + 1][col - 1] && jellyArray[row + 1][col - 1] !== 0 ? jellyArray[row + 1][col -1]++ : '';
        jellyArray[row + 1][col + 1] &&   jellyArray[row + 1][col + 1] !== 0 ? jellyArray[row + 1][col + 1]++ : '';
    }
}

jellyProceed(1000);