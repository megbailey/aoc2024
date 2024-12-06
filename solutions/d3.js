const fs = require('fs');

let match; 
fs.readFile('./inputs/inputd3.txt', (err, rawData) => {
    if (err) throw err;
  
    const jumbledString = rawData.toString();

    // S1
    //const re = /mul\((\d+),(\d+)\)/g;
    // S2
    const re = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g

    let sumNum = 0;
    let lastInstruction = null;
    while( match = re.exec(jumbledString)) {

        if ( match[0] === 'don\'t()' || match[0] === 'do()') {
            lastInstruction = match[0];
        } else if ( lastInstruction === null || lastInstruction === 'do()' ) {
            if ( match[1] && match[2] ) {
                sumNum += parseInt(match[1]) * parseInt(match[2])
            }
        }
       
    }
   
    console.log('Sum is ' + sumNum)

  });