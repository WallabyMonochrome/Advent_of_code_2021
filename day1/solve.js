const fs = require('fs');

const depths = fs.readFileSync('input.txt', 'utf-8').split('\n');

function countIncreaseDecrease() {
    let increase = 0;
    let previousDepth = depths[0];
    for(let i = 0; i < depths.length; i++) {
        if(depths[i] > previousDepth) { increase ++ }
        previousDepth = depths[i];
    }
    console.log(`Part 1: Increase ${increase} and decrease ${depths.length - increase}`);
}

function countSlidingWindow() {
    const windows = [];
    let increase = 0;
    for(let i = 0; i < depths.length - 2; i++) {
        windows.push(+depths[i] + +depths[i + 1] + +depths[i + 2]);
    }
    for(let j = 1; j < windows.length; j++) {
        if(windows[j - 1] < windows[j]) increase ++
    }
    console.log(`Part 2: Total window increase ${increase}`);
}

// Part 1
//countIncreaseDecrease();

// Part 2
countSlidingWindow();