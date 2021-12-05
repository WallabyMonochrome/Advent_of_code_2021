const fs = require('fs');

let ventsVector = fs.readFileSync('input.txt', 'utf-8').split('\n').map((v) => {
    const [origin, end] = v.split(' -> ');
    const [x1, y1] = origin.split(',').map((n) => parseInt(n, 10));
    const [x2, y2] = end.split(',').map((n) => parseInt(n, 10));
    return {
        x1,
        y1,
        x2,
        y2
    }
});

// Only vertical and horizontal
const hvVector = ventsVector.filter((v) => {
    if(v.x1 === v.x2 || v.y1 === v.y2) return true;
    return false;
});

function getCrossingPoint(vectorList) {
    const map = [[]];
    let intersect = 0;
    vectorList.forEach((v) => {
        const crossed = getAllCrossedCoordinate(v.x1, v.x2, v.y1, v.y2);
        crossed.forEach((cord) => {
            if(!map[cord.x]) map[cord.x] = [];
            if(map[cord.x][cord.y]) {
                if(map[cord.x][cord.y] === 1) {
                    intersect ++;
                }
                map[cord.x][cord.y] =  map[cord.x][cord.y] + 1;
            }
            if(!map[cord.x][cord.y]) map[cord.x][cord.y] = 1;
        });
    });
    console.log('Solution part 1 or 2: ', intersect);
}

function getAllCrossedCoordinate(x1, x2, y1, y2) {
    const cross = []
    const lowX = x1 < x2 ? x1 : x2;
    const highX = x1 < x2 ? x2 : x1;
    const lowY = y1 < y2 ? y1 : y2;
    const highY = y1 < y2 ? y2 : y1;
    if(lowY === highY) {
        for(let i = lowX; i <= highX; i++) {
            cross.push({x: i, y:y1});
        }
        return cross
    } if(lowX === highX) {
        for(let i = lowY; i <= highY; i++) {
            cross.push({x: x1, y:i});
        }
        return cross
    }
    for(let i = 0; i <= highX - lowX; i++) {
        let x = x1 < x2 ? x1 + i : x1 - i;
        let y = y1 < y2 ? y1 + i : y1 - i;
        cross.push({x, y});
    }
    return cross;
}

// part 1
getCrossingPoint(hvVector);

// part 2
getCrossingPoint(ventsVector);