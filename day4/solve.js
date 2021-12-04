const fs = require('fs');

let bingo = fs.readFileSync('input.txt', 'utf-8').split('\n').filter((r) => r !== '');
let numberToPick = bingo[0].split(',').map((n) => parseInt(n, 10));
bingo.splice(0, 1);
let boards = [];
for(let i = 0; bingo.length >= 5; i += 5) {
    boards.push(bingo.splice(0,5).map((r) => r.split(/\s{1,2}/).filter((l => l !== '')).map(n => parseInt(n, 10))));
}

function drawNumber() {
    let complete = false;
    let index = 0;
    while(!complete) {
        let num = numberToPick[index];
        boards = boards.map((b) => b.map((c) => c.map((n) => n === num ? 'X' : n)));
        const winner = checkIfWinner(boards);
        console.log('Winner: ', winner);
        if(winner || winner === 0) {
            const total = computeBoardNumber(boards[winner]);
            console.log(`Solution: ${total * num},`);
            console.log(boards[winner], num);
            complete = true;
        }
        index ++;
    }
}

function getLastBoard() {
    let complete = false;
    let index = 0;
    while(!complete) {
        let num = numberToPick[index];
        boards = boards.map((b) => b.map((c) => c.map((n) => n === num ? 'X' : n)));
        const winner = checkIfWinner(boards);
        if(winner) {
            if(boards.length === 1) {
                const total = computeBoardNumber(boards[0]);
                console.log(`Solution Part 2: ${total * num}`);
                complete = true;
            }
            winner.forEach((w) => {
                boards.splice(w, 1);
            });
        }
        index ++;
    }
}

function computeBoardNumber(board) {
    let total = 0;
    board.forEach((r) => {
        r.forEach((n)=> {
            if(!isNaN(n)) total += n;
        })
    });
    return total;
}

function checkIfWinner(boards) {
    let winner = [];
    boards.forEach((b, index) => {
        for(let row = 0; row < 5; row ++) {
            let occurence = 0;
            b[row].forEach((n) => {if(n === 'X') occurence++});
            if(occurence === 5) winner.push(index);
        }
        for(let col = 0; col < 5; col ++) {
            let occurence = 0;
            for(let row = 0; row < 5; row ++) {
                if(b[row][col] === 'X') occurence ++;
            }
            if(occurence === 5) winner.push(index);
        }
    });
    return winner.length ? [...new Set(winner)] : false;
}

// Part 1
// drawNumber();

// Part 2
getLastBoard();