
const fs = require('fs');


String.prototype.replaceAt = function(index, str) {
    return this.substring(0, index) + str + this.substring(index + str.length);
}

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


function mapLoop( map, currPositionX, currPositionY, forEach = null) {
    let char_in_map = true;
    let currDirection = '^'

    while ( char_in_map ) {

        if ( !map[ currPositionY ] || !map[ currPositionY ][ currPositionX ] ) {
            char_in_map = false;
            break;
        }
       
        if ( typeof forEach === 'function' ) {
            let loopFound = forEach(currDirection, currPositionX, currPositionY, map)
            if ( loopFound === true ) {
                break;
            }
        }
   
        // no obstacle, proceed forward
        if ( currDirection === '^' && !['#' , 'O'].includes( map[ currPositionY ][ currPositionX ] ) ) {
            if ( map[ currPositionY ][ currPositionX ] === '-' ){
                // crossing direction
                map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, '+')
            } else if (  map[ currPositionY ][ currPositionX ] === '.' ) {
                map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, '|')
            }
            currPositionY -= 1;
        } else if ( currDirection === '>' && !['#' , 'O'].includes( map[ currPositionY ][ currPositionX ] )) {
            if ( map[ currPositionY ][ currPositionX ] === '|' ) {
                map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, '+')
            } else if (  map[ currPositionY ][ currPositionX ] === '.' ) {
                map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, '-')
            }            
            currPositionX += 1;
        } else if ( currDirection === 'v' && !['#' , 'O'].includes( map[ currPositionY ][ currPositionX ] ) ) {
            if ( map[ currPositionY ][ currPositionX ] === '-' ) {
                // crossing
                map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, '+')
            } else if (  map[ currPositionY ][ currPositionX ] === '.' ) {
                map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, '|')
            }            
            currPositionY += 1;
        } else if ( currDirection === '<' && !['#' , 'O'].includes( map[ currPositionY ][ currPositionX ] ) ) {
            if ( map[ currPositionY ][ currPositionX ] === '|' ) {
                // crossing
                map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, '+')
            } else if (  map[ currPositionY ][ currPositionX ] === '.' ) {
                map[ currPositionY ] = map[ currPositionY ].replaceAt(currPositionX, '-')
            }      
            currPositionX -= 1;
        }
        // obstacle found, turn right
        else if ( currDirection === '^' && ['#' , 'O'].includes( map[ currPositionY ][ currPositionX ] ) ) {
            currPositionY += 1;
            currDirection = turnRight(currDirection)
        } else if ( currDirection === '>' && ['#' , 'O'].includes( map[ currPositionY ][ currPositionX ] ) ) {
            currPositionX -= 1;
            currDirection = turnRight(currDirection)
        } else if ( currDirection === 'v' && ['#' , 'O'].includes( map[ currPositionY ][ currPositionX ] ) ) {
            currPositionY -= 1;
            currDirection = turnRight(currDirection)
        } else if ( currDirection === '<' && ['#' , 'O'].includes( map[ currPositionY ][ currPositionX ] ) ) {
            currPositionX += 1;
            currDirection = turnRight(currDirection)
        }

        //console.log( JSON.stringify(map, null, '\t') )
    }
    
}


const inputFile = fs.readFileSync('./inputs/inputd6.txt',  { encoding: 'utf8', flag: 'r' })

let map = []
let startPositionX;
let startPositionY;
let obstacles = []

// Create map and find starting position
inputFile.split('\n').forEach(( line, index ) => {
    map.push( line )
    if ( line.indexOf('^') !== -1 ) {
        startPositionX = line.indexOf('^');
        startPositionY = index;
    }
    let obIndex;
    // find coordinates of all obstacles in line
    while ((obIndex = line.indexOf('#', obIndex)) != -1) {
        obIndex += 1;
        obstacles.push([ obIndex, index ])
    }
})

let freshMap = JSON.parse( JSON.stringify(map) )

// find places for potiential obstacle loops
let potientialObstacleLoops = { }
mapLoop(map, startPositionX, startPositionY, (currDir, currX, currY) => {
    let sameX = obstacles.filter( coords => currX === coords[0] )
    let sameY = obstacles.filter( coords => currY === coords[1] )
    if (( sameX.length > 0 || sameY.length > 0 ) && map[currY][currX] !== '#') {
        potientialObstacleLoops[[currX, currY]] = [currX, currY]
    }
})

// only unique position
// Prepare maps to test
let trialMaps = [ ]
Object.entries(potientialObstacleLoops).forEach(( potientialObstacle ) => {
    const x = potientialObstacle[1][0]
    const y = potientialObstacle[1][1]
    // deep copy map to change
    let maybeMap = JSON.parse( JSON.stringify(freshMap) )
    // place obstacle
    maybeMap[ y ] = maybeMap[ y ].replaceAt(x, 'O')
    trialMaps.push(maybeMap)
})

let confirmedLoops = [ ]

trialMaps.forEach(( attempt, index ) => {
    let encounteredObstacles = { }
    console.log( `attempt, ${index}` )
    mapLoop(attempt, startPositionX, startPositionY, (currDirection, currX, currY, currMap) => {
        if ( ['#' , 'O'].includes( currMap[ currY ][ currX ] )) {
            const key = `${currX},${currY},${currDirection}`
            // loop found when we encounter the same obstacle in the same direction
            if ( encounteredObstacles[ key ]) {
                confirmedLoops.push(currMap)
                return true;
            }
            encounteredObstacles[ key ] = [ currX, currY]
        }
      
    })
})

// S1
/* let distinctPositions = 0;
map.forEach(line => {
    distinctPositions += countMatches(line, 'X')
}); */


console.log( confirmedLoops.length)
