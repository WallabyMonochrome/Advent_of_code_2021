const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const destinationMap = {};

function populateList(){
    input.forEach((d) => {
        let [from, to] = d.split('-');
        if(!destinationMap[from]) destinationMap[from] = [];
        if(!destinationMap[to]) destinationMap[to] = [];
        
        if(from === 'end' || to === 'start') {
            destinationMap[to].push(from);
            return;
        }
        destinationMap[from].push(to);
        
        if(from !== 'start' && to !== 'end') {
            destinationMap[to].push(from);
        }
    });
}

function isBigCave(c) {
    return c == c.toUpperCase();
}


const pathList = [];

function computeAllPath() {
    const startingPath = destinationMap['start'];
    startingPath.forEach((p) => {
       recursivePath({}, [], p, false);
    });
    console.log('Part 1 (and 2) solution', pathList.length);
}

function copyObject(ori) {
    let copy = {};
    Object.keys(ori).forEach((a) => {
        copy[a] = true;
    });
    return copy;
}

// hasVisitedTwice params for part 2 
function recursivePath(visitedNode, path, current, hasVisitedTwice) {
    const pathcopy = [...path];
    const visitedNodeCopy = copyObject(visitedNode);
    if(current === 'end') {
        pathcopy.push('end');
        pathList.push(path);
        return;
    }
    const potentialPath = destinationMap[current];
    pathcopy.push(current);
    if(!isBigCave(current)) visitedNodeCopy[current] = true;
    potentialPath.forEach((pp) => {
        if(isBigCave(pp)) {
            recursivePath(visitedNodeCopy, pathcopy, pp, hasVisitedTwice);
        } else {
            if(!visitedNodeCopy[pp]){
                recursivePath(visitedNodeCopy, pathcopy, pp, hasVisitedTwice);
            } else {
                if(!hasVisitedTwice) {
                    recursivePath(visitedNodeCopy, pathcopy, pp, true);
                }
            }
        }
    });
}

populateList();
computeAllPath();