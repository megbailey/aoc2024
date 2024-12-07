const fs = require('fs');


function matchHorizontalFwd(i, j, arr) {
    if ( j+3 < arr[i].length && arr[i][j] === 'X' && arr[i][j+1] === 'M' &&  arr[i][j+2] === 'A' && arr[i][j+3] === 'S')
        return true;
    return false
}

function matchHorizontalBkwd(i, j, arr) {
    if ( j-3 >= 0 && arr[i][j] === 'X' && arr[i][j-1] === 'M' &&  arr[i][j-2] === 'A' && arr[i][j-3] === 'S')
        return true;
    return false
}

function matchVerticalFwd(i, j, arr) {
    if ( i+3 < arr.length && arr[i][j] === 'X' && arr[i+1][j] === 'M' &&  arr[i+2][j] === 'A' && arr[i+3][j] === 'S')
        return true;
    return false;
}

function matchVerticalBkwd(i, j, arr) {
    if ( i-3 >= 0 && arr[i][j] === 'X' && arr[i-1][j] === 'M' &&  arr[i-2][j] === 'A' && arr[i-3][j] === 'S')
        return true;
    return false;
}

function matchPositveDiagonalFwd(i, j, arr) {
    if (( i+3 < arr.length && j+3 < arr[i].length ) && arr[i][j] === 'X' && arr[i+1][j+1] === 'M' &&  arr[i+2][j+2] === 'A' && arr[i+3][j+3] === 'S')
        return true;
    return false;
}

function matchPositveDiagonalBkwd(i, j, arr) {
    if (( i-3 >= 0 && j-3 >= 0 ) && arr[i][j] === 'X' && arr[i-1][j-1] === 'M' &&  arr[i-2][j-2] === 'A' && arr[i-3][j-3] === 'S')
        return true;
    return false;
}

function matchNegativeDiagonalFwd(i, j, arr) {
    if (( i+3 < arr.length && j-3 >= 0 ) && arr[i][j] === 'X' && arr[i+1][j-1] === 'M' &&  arr[i+2][j-2] === 'A' && arr[i+3][j-3] === 'S')
        return true;
    return false
}

function matchNegativeDiagonalBkwd(i, j, arr) {
    if (( i-3 >= 0 && j+3 < arr[i].length) && arr[i][j] === 'X' && arr[i-1][j+1] === 'M' &&  arr[i-2][j+2] === 'A' && arr[i-3][j+3] === 'S')
        return true;
    return false
}


fs.readFile('./inputs/inputd4.txt', (err, rawData) => {
    if (err) throw err;

    var crosswordData = [];
    const allLines = rawData.toString().split(/\n/);

    // Reading line by line and add to arrays
    allLines.forEach((line) => {
        crosswordData.push(line)
    });


    let count = 0;
    for ( i = 0; i < crosswordData.length; i++ ) {
        for ( j = 0; j < crosswordData[i].length; j++ ) {
            if ( matchHorizontalFwd(i, j, crosswordData) )
                count++;
            if ( matchHorizontalBkwd(i, j, crosswordData) )
                count++;
            if ( matchVerticalFwd(i, j, crosswordData) )
                count++;
            if ( matchVerticalBkwd(i, j, crosswordData) )
                count++
            if ( matchPositveDiagonalFwd(i, j, crosswordData) )
                count++;
            if ( matchPositveDiagonalBkwd(i, j, crosswordData) )
                count++;
            if ( matchNegativeDiagonalBkwd(i, j, crosswordData) )
                count++;
            if ( matchNegativeDiagonalFwd(i, j, crosswordData) )
                count++;
        }
    }
    
    console.log('found matches ', count)
});