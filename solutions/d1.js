const fs = require('fs');
const getAllIndexes = require
function getTotalDistance(leftList, rightList) {
  let totalDistance = 0;
  for ( i = 0; i < leftList.length; i++ ) {
      let distance = Math.abs(leftList[i] - rightList[i])
      totalDistance += distance
    }
  console.log(`Total Distance: ${totalDistance}`)
} 

function getSimiliaryScore(leftList, rightList) {
  let similartityScore = 0;
  for ( i = 0; i < leftList.length; i++ ) {
    const instances = getAllIndexes(rightList, leftList[i])
    similartityScore += leftList[i] * ( instances.length )
  }
  console.log(`Similartity Score: ${similartityScore}`)

} 

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}

let leftList = [ ]
let rightList = [ ]

// read the list into arrays 
fs.readFile('./inputs/inputd1.txt', (err, rawData) => {
  if (err) throw err;

    const allLines = rawData.toString().split(/\n/);
    // Reading line by line and add to arrays
    allLines.forEach((line) => {
        const splitLine = line.split(/   /);
        if (splitLine.length < 2 ) return;
        leftList.push(splitLine[0])
        rightList.push(splitLine[1])
    });
    console.log(leftList)

    leftList.sort()
    rightList.sort()

    // S1
    getTotalDistance(leftList, rightList)
    // S2
    getSimiliaryScore(leftList, rightList)
});



