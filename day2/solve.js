const fs = require('fs');

const directions = fs.readFileSync('input.txt', 'utf-8').split('\n');

console.log('Directions: ', directions);

function computePosition() {
    let depth = 0;
    let direction = 0;
    directions.forEach((d) => {
        let [dir, units] = d.split(' ');
        units = parseInt(units);
        switch(dir) {
            case 'forward':
                direction += units;
                break;
            case 'down':
                depth += units;
                break;
            case 'up':
                depth -= units;
                break;
            default:
                console.log('Unmanaged');
                break;
        }
    });
    console.log(`Solution = ${depth * direction}`);
}

function computePositionWithAim() {
    let depth = 0;
    let direction = 0;
    let aim = 0;
    directions.forEach((d) => {
        let [dir, units] = d.split(' ');
        units = parseInt(units);
        switch(dir) {
            case 'forward':
                direction += units;
                depth += aim * units;
                break;
            case 'down':
                aim += units;
                break;
            case 'up':
                aim -= units;
                break;
            default:
                console.log('Unmanaged');
                break;
        }
    });
    console.log(`Solution = ${depth * direction}`);
}

//Part 1
computePosition();
//Part 2
computePositionWithAim();