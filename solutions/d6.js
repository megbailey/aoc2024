
const fs = require('fs');

function countMatches(str, sub) {
    if (str.length === 0 || sub.length === 0) {
        return 0;
    }
    count = 0;
    idx = 0;
    while ((idx = str.indexOf(sub, idx)) != -1) {
        count++;
        idx += sub.length;
    }
    return count;
}

function turnRight( direction ) {
    switch (direction) {
        case '^':
            return '>';
        case '>':
            return 'v';
        case 'v':
            return '<';
        case '<':
            return '^';
    }
}

String.prototype.replaceAt = function(index, str) {
    return this.substring(0, index) + str + this.substring(index + str.length);
}

const inputFile = fs.readFileSync('./inputs/inputd6.txt',  { encoding: 'utf8', flag: 'r' })

let map = []
let currPositionX;
let currPositionY;
inputFile.split('\n').forEach(( line, index ) => {
    map.push( line )
    if ( line.indexOf('^') !== -1 ) {
        currPositionX = line.indexOf('^');
        currPositionY = index;
    }
})


let char_in_map = true;
let currDirection = '^'
while ( char_in_map ) {

    // no obstacle
    if ( currDirection === '^' && ( currPositionY-1 < 0 || map[ currPositionY-1 ][ currPositionX ] !== '#' )) {
        map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, 'X')
        currPositionY -= 1;
    } else if ( currDirection === '>' && ( currPositionX+1 >= map[0].length || map[ currPositionY ][ currPositionX+1 ] !== '#' )) {
        map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, 'X')
        currPositionX += 1;
    } else if ( currDirection === 'v' && ( currPositionY+1 >= map.length || map[ currPositionY+1 ][ currPositionX ] !== '#' )) {
        map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, 'X')
        currPositionY += 1;
    } else if ( currDirection === '<' && ( currPositionX-1 < 0 || map[ currPositionY ][ currPositionX-1 ] !== '#' )) {
        map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, 'X')
        currPositionX -= 1;
    }
    // obstacle found
    else if ( currDirection === '^' && map[ currPositionY-1 ] && map[ currPositionY-1 ][ currPositionX ] === '#' ) {
        currDirection = turnRight(currDirection)
    } else if ( currDirection === '>' && map[ currPositionY ][ currPositionX+1 ] && map[ currPositionY ][ currPositionX+1 ] === '#' ) {
        currDirection = turnRight(currDirection)
    } else if ( currDirection === 'v' && map[ currPositionY+1 ] && map[ currPositionY+1 ][ currPositionX ] === '#' ) {
        currDirection = turnRight(currDirection)
    } else if ( currDirection === '<' && map[ currPositionY ][ currPositionX-1 ] && map[ currPositionY ][ currPositionX-1 ] === '#' ) {
        currDirection = turnRight(currDirection)
    }
 
    if ( currPositionX >= map[0].length || currPositionX < 0 )
        char_in_map = false;
    else if ( currPositionY >= map.length || currPositionY < 0 )
        char_in_map = false;

}


let distinctPositions = 0;
map.forEach(line => {
    distinctPositions += countMatches(line, 'X')
});

console.log(map, distinctPositions)

