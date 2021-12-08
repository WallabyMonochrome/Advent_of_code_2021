const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf-8').split('\n').map((l) => l.split(' | '));

function computeUniqueSegmentsNumber() {
    let uniqueDigit = 0;
    input.forEach((i) => {
        const output = i[1].split(' ');
        output.forEach((o) => {
            if(o.length === 7 || o.length === 4 || o.length === 3 || o.length === 2) {
                uniqueDigit ++;
            }
        });
    });
    console.log('Part 1 solution:', uniqueDigit);
}

function sortAlphabet(a, b) {
    if(a < b) return -1;
    return 1;
}

function decodeDigit() {
    let total = 0;
    input.forEach((i) => {
        let segmentToRenderDigit = {};
        const digit = i[0].split(' ').map((s) => s.split('').sort(sortAlphabet));
        const output = i[1].split(' ').map((s) => s.split('').sort(sortAlphabet));
        digit.forEach((d) => {
            switch(d.length) {
                case 7:
                    segmentToRenderDigit[8] = d;
                    break;
                case 4:
                    segmentToRenderDigit[4] = d;
                    break;
                case 3:
                    segmentToRenderDigit[7] = d;
                    break;
                case 2:
                    segmentToRenderDigit[1] = d;
                    break;
                default:
                    break;
            }
        });
        deduceNumber(digit,segmentToRenderDigit);
        let ouputNumber = [];
        output.forEach((o) => {
            for(let i = 0; i < 10; i++) {
                if(segmentToRenderDigit[i].join('') === o.join('')) {
                    ouputNumber.push(i);
                }
            }
        });
        total += parseInt(ouputNumber.join(''), 10);
    });
    console.log('Part 2:', total);
}

function deduceNumber(digit, segmentToRenderDigit) {
    let sixSegment = digit.filter((d) => d.length === 6);
    let combineFourSeven = [...segmentToRenderDigit[4], ...segmentToRenderDigit[7]];
    combineFourSeven = [...new Set(combineFourSeven)].sort(sortAlphabet);
    // lets find 9
    sixSegment.forEach((s) => {
        let diff = differenceBetweenSegment(combineFourSeven, s);
        if(diff.length === 1) {
            segmentToRenderDigit[9] = s;
        }
    });
    // Remove 9
    sixSegment = sixSegment.filter((f) => differenceBetweenSegment(f, segmentToRenderDigit[9]).length !== 0);
    // lets find 6
    sixSegment.forEach((s) => {
        let diff = differenceBetweenSegment(s, segmentToRenderDigit[1]);
        if(diff.length === 1) {
            segmentToRenderDigit[6] = s;
        }
    });
    // Remove 6
    sixSegment = sixSegment.filter((f) => differenceBetweenSegment(f, segmentToRenderDigit[6]).length !== 0);
    // lets find 0
    segmentToRenderDigit[0] = sixSegment[0];
    let fiveSegment = digit.filter((d) => d.length === 5);
    // lets find 5
    fiveSegment.forEach((s) => {
        let diff = differenceBetweenSegment(segmentToRenderDigit[6], s);
        if(diff.length === 0) {
            segmentToRenderDigit[5] = s;
        }
    });
    // Remove 5
    fiveSegment = fiveSegment.filter((f) => differenceBetweenSegment(f, segmentToRenderDigit[5]).length !== 0);
    // lets find 3
    fiveSegment.forEach((s) => {
        let diff = differenceBetweenSegment(segmentToRenderDigit[5], s);
        if(diff.length === 1) {
            segmentToRenderDigit[3] = s;
        }
    });
    // Remove 3
    fiveSegment = fiveSegment.filter((f) => differenceBetweenSegment(f, segmentToRenderDigit[3]).length !== 0);
    segmentToRenderDigit[2] = fiveSegment[0];
}

function differenceBetweenSegment(base, toCompare) {
    const findA = {};
    let notFound = [];
    base.forEach((l) => {
        findA[l] = true;
    });
    toCompare.forEach((l) => {
        if(!findA[l]) notFound.push(l);
    });
    return notFound;
}

decodeDigit();
