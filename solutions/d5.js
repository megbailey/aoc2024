const fs = require('fs');


function determineRule( rule, arr ) {
    let mustBeBeforeIndex = arr.findIndex( a => a === rule[0])
    let mustBeAfterIndex = arr.findIndex( a => a === rule[1])
    if (( mustBeBeforeIndex === -1 || mustBeAfterIndex === -1 ) ||  mustBeBeforeIndex < mustBeAfterIndex )
        return true;
    return false;
}

function reorder(rule, arr) {
    let shouldBeBeforeIndex = arr.findIndex( a => a === rule[0])
    let shouldBeAfterIndex = arr.findIndex( a => a === rule[1])
    let shouldBeBefore = arr[shouldBeBeforeIndex]
    let newArr = arr.slice(0, shouldBeAfterIndex)
        .concat([ shouldBeBefore ])
        .concat( arr.slice(shouldBeAfterIndex, shouldBeBeforeIndex) )
        .concat( arr.slice(shouldBeBeforeIndex+1, arr.length) )
    return newArr;
}

const inputFile = fs.readFileSync('./inputs/inputd5.txt',  { encoding: 'utf8', flag: 'r' })

let rules = []
let inputLines = []

inputFile.split('\n').forEach(line => {
    if ( line.includes('|') ) {
        rules.push( line.split('|') )
    } else if ( line.includes(',') ) {
        inputLines.push( line.split(',') )
    }
})

let updatesThatWereReorderd = []

// Solution 1
/* inputLines.forEach( inputLine => {
    let evalEachNum = inputLine.map( numInLine => {
        let applicableRules = rules.filter( rule => rule.includes(numInLine) && inputLine.includes(rule[0]) && inputLine.includes(rule[1]))
        let evalEachRule = applicableRules.map( rule => determineRule(rule, inputLine) )
        if ( evalEachRule.includes(false) )
            return false
        return true;
    })
    // the whole line passed
    if ( !evalEachNum.includes(false) ) {
        updatesThatFollowRules.push(inputLine)
    }
}) */


    // Solution 2
    inputLines.forEach( inputLine => {
        let reorderedLine = []
        inputLine.map( numInLine => {
            let applicableRules = rules.filter( rule => rule.includes(numInLine) && inputLine.includes(rule[0]) && inputLine.includes(rule[1]))
            applicableRules.forEach( rule => { 
                if ( !determineRule(rule, reorderedLine.length > 0 ? reorderedLine : inputLine) ) {
                    reorderedLine = reorder(rule, reorderedLine.length > 0 ? reorderedLine : inputLine)
                }
            })
        })

        if ( reorderedLine.length > 0 ) {
            updatesThatWereReorderd.push(reorderedLine)
        }
       
    })

    let middleNumSum = 0;
    updatesThatWereReorderd.forEach( item => {
        middleNumSum += parseInt( item[ Math.floor(item.length/2) ] )
    })
    console.log(middleNumSum)