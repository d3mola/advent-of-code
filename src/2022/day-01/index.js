const fs = require('fs')

// const INPUT_FILE_PATH = '../smol-input.txt'
const INPUT_FILE_PATH = 'input.txt'

function top3ElvesCalories(elvesCalories) {
    return maxCalories(elvesCalories, 3)
}

let elvesCalories = inputToArray(readInput())

function maxCalories(elvesCalories, numElves = 1) {
    let total = 0
    let descendingCalories = []

    for (let elfCalories of elvesCalories) {
        let totalElfCalories = calcTotalElfCalories(elfCalories)
        descendingCalories.push(totalElfCalories)
    }

    descendingCalories.sort((a, b) => b - a)
    return calcTotalElfCalories(descendingCalories.slice(0, numElves))
}

console.log(`Elf carrying highest calories has ${maxCalories(elvesCalories)} calories`)
console.log(`The top 3 elves are carrying ${top3ElvesCalories(elvesCalories)} calories`)

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
