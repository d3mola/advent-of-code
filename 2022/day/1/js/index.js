const fs = require('fs')

const INPUT_FILE_PATH = '../smol-input.txt'
// const INPUT_FILE_PATH = '../input.txt'

// function top3ElvesCalories(elvesCalories) {
//     let max = maxCalories(elvesCalories)
// }

let elvesCalories = inputToArray(readInput())

function maxCalories(elvesCalories) {
    let max = 0

    for (let elfCalories of elvesCalories) {
        let totalElfCalories = calcTotalElfCalories(elfCalories)
        if (totalElfCalories > max) {
            max = totalElfCalories
        }
    }

    return max
}

console.log(`Elf carrying highest calories has ${maxCalories(elvesCalories)} calories`)

function calcTotalElfCalories(calories) {
    return calories.reduce((prev, current) => prev + current, 0)
}

function inputToArray(inputStr) {
    let inputArr = inputStr.split('\n\n')

    for (let i = 0; i < inputArr.length; i++) {
        let arr = inputArr[i].split('\n').map(str => Number(str))
        inputArr[i] = arr
    }

    return inputArr
}

function readInput() {
    try {
        const input = fs.readFileSync(INPUT_FILE_PATH, 'utf-8')
        return input
    } catch (err) {
        console.error(err)
    }
}
