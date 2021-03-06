const arrBase = [                                   // 
    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],  // 0
    ['#', '+', '+', '+', '#', '+', '+', '+', '#'],  // 1
    ['#', '+', '#', '+', '#', '+', '#', '+', '#'],  // 2
    ['+', '+', '#', '+', '0', '+', '#', '+', '#'],  // 3
    ['#', '#', '#', '+', '#', '#', '#', '#', '#'],  // 4
    ['#', '#', '+', '+', '#', '#', '#', '#', '#'],  // 5
    ['#', '#', '+', '#', '#', '#', '#', '#', '#'],  // 6
    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],  // 7
]  // 0    1    2    3    4    5    6    7    8                 

let saveWay = [];

function findStart(array) {
    let res_x = 0;
    let res_y = 0;

    outer: for (let index = 0; index < array.length; index++) {
        const element = array[index];

        let res = element.findIndex(value => value === '0');
        if (res !== -1) {
            res_y = res;
            res_x = index;
            break outer;
        }
    }

    return { x: res_y, y: res_x };
}

function findEnd(array) {
    let res_x = null;
    let res_y = null;

    outer: for (let i = 0; i < array.length; i++) {
        let element = array[i];

        let res = element.findIndex(value => value === '+');
        if (i === 0 || i === array.length - 1) {
            if (res !== -1) {
                res_x = res;
                res_y = i;
            }
        } else {
            for (let n = 0; n < element.length; n += (element.length - 1)) {
                if ((n === 0 || n === element.length - 1) && element[n] === '+') {
                    res_x = n;
                    res_y = i;
                    break outer;
                }
            }
        }
    }

    if (res_x === null && res_y === null) {
        return false;
    }

    return { x: res_x, y: res_y }
}


let start_cord = findStart(arrBase);
let end_cord = findEnd(arrBase);

function check(start, end) {
    let { x, y } = start;
    if (arrBase[y][x] !== 0) {
        arrBase[y][x] = '-';
    }
    let flag = 0;
    let arr_cord = [];

    if (arrBase[y - 1][x] !== undefined && arrBase[y - 1][x] === '+') {
        arr_cord.push({ x: x, y: y - 1, val: arrBase[y - 1][x], step: 'top' });
        flag = 1;
    }
    if (arrBase[y + 1][x] !== undefined && arrBase[y + 1][x] === '+') {
        arr_cord.push({ x: x, y: y + 1, val: arrBase[y + 1][x], step: 'bottom' });
        flag = 1;
    }
    if (arrBase[y][x - 1] !== undefined && arrBase[y][x - 1] === '+') {
        arr_cord.push({ x: x - 1, y: y, val: arrBase[y][x - 1], step: 'left' });
        flag = 1;
    }
    if (arrBase[y][x + 1] !== undefined && arrBase[y][x + 1] === '+') {
        arr_cord.push({ x: x + 1, y: y, val: arrBase[y][x + 1], step: 'rigth' });
        flag = 1;
    }

    if (arr_cord.length > 0) {
        for (let index = 0; index < arr_cord.length; index++) {
            let element = arr_cord[index];
            
            saveWay.push(element.step);            

            let result = element.x === end.x && element.y === end.y;
            let notVisited = arrBase[element.y][element.x] !== '-';

            if (result || (notVisited && check(element, end))) {
                return saveWay;
            }
        }
    }
    
    saveWay.pop();
    return false;
}


if (!end_cord) {
    alert('This maze with no exit.')
} else {
    console.log(check(start_cord, end_cord));    
};
