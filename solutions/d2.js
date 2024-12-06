const fs = require('fs');

// must either be always increasing or always decreasing
function increasing(e1, e2) { 
    return parseInt(e1) < parseInt(e2);
}

function decreasing(e1, e2) { 
    return parseInt(e1) > parseInt(e2);
}

function smallDiff(e1, e2) { 
    const abs = Math.abs(parseInt(e1) - parseInt(e2))
    if ( abs >= 1 && abs <= 3 )
        return true;
    return false;     
} 


function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

function withoutDampner( levelsMatrix ) {
    return levelsMatrix.map(( report )=> {    
        
        const alwaysIncreasing = report.every((e, i, arr) => !i || increasing(e, arr[i-1]))
        const alwaysDecreasing = report.every((e, i, arr) => !i || decreasing(e, arr[i-1]))
        const alwaysSmallDiff = report.every((e, i, arr) => !i || smallDiff(e, arr[i-1]))
      
        if (( alwaysDecreasing || alwaysIncreasing ) && alwaysSmallDiff ) {
            return 'safe';
       }
       return 'unsafe';
    })
}

function withDampner( levelsMatrix ) {
    return levelsMatrix.map(( report )=> {    
        
        const alwaysIncreasing = report.every((e, i, arr) => !i || increasing(e, arr[i-1]))
        const alwaysDecreasing = report.every((e, i, arr) => !i || decreasing(e, arr[i-1]))
        const alwaysSmallDiff = report.every((e, i, arr) =>  !i || smallDiff(e, arr[i-1]))
      
        if (( alwaysDecreasing || alwaysIncreasing ) && alwaysSmallDiff ) {
            return 'safe';
        }

        for ( i = 0; i < report.length; i++ ) { 
            const allButI = report.slice(0, i).concat( report.slice(i+1, report.length) )

            const alwaysIncreasing = allButI.every((e, i, arr) => !i || increasing(e, arr[i-1]))
            const alwaysDecreasing = allButI.every((e, i, arr) => !i || decreasing(e, arr[i-1]))
            const alwaysSmallDiff = allButI.every((e, i, arr) =>  !i || smallDiff(e, arr[i-1]))

            if (( alwaysDecreasing || alwaysIncreasing ) && alwaysSmallDiff ) {
                return 'safe';
            }
        }
        
        return 'unsafe'
       
    })
}

var levelsMatrix = [ ]
// read the list into arrays 
fs.readFile('./inputs/inputd2.txt', (err, txt) => {
    if (err) throw err;

    const data = txt.toString().split(/\n/);
    // Reading line by line and add to arrays
    data.forEach((line) => {
        const levels = line.split(/ +/)
        //console.log(levels)
        levelsMatrix.push(levels)
    }) 
    // S1
    //let safetyReports = withoutDampner(levelsMatrix)
    // S2
     let safetyReports = withDampner(levelsMatrix)

    const safeReports = getAllIndexes(safetyReports, 'safe')
    console.log(`# of Safe reports ${safeReports.length}`)
});





