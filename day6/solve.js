const fs = require('fs');

let allFish = fs.readFileSync('input.txt', 'utf-8').split(',').map((r) => parseInt(r, 10));

// Part 1
function computeFish(period) {
    for(let day = period; day > 0; day --) {
        let child = 0;
        allFish = allFish.map((f,i) => {
            if(f === 0) {
                child++;
                return 6;
            } else {
                return f - 1;
            }
        });
        for(let x = 0; x < child; x++) {
            allFish.push(8);
        }
    }
    console.log('Part 1 solution: ', allFish.length);
}

// Part 2
function computeFishSmartly(period) {
    const stockFish = {};
    for (let y = 0; y <= 8; y++) {
        stockFish[y] = 0;
    }
    allFish.forEach((f) => {
        stockFish[f] = stockFish[f] += 1;
    });
    for(let day = period; day > 0; day --) {
        let child = 0;
        for(let ges = 0; ges <= 8 ; ges ++){
            if(ges === 0) {
               child = stockFish[ges];
            } else {
                stockFish[ges - 1] = stockFish[ges];
            }
        } 
        stockFish[8] = 0;
        stockFish[8] = child;
        stockFish[6] = stockFish[6] + child;
    }
    const total = computeTotal(stockFish);
    console.log('Part 2 solution: ', total);

}

function computeTotal(fishs) {
    let total = 0;
    Object.keys(fishs).forEach((f) => {
        total += fishs[f];
    });
    return total;
}


computeFishSmartly(256);