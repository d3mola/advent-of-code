const fs = require('fs')

// const INPUT_FILE_PATH = '../smol-input.txt'
const INPUT_FILE_PATH = 'input.txt'
let elvesCalories = inputToArray(readInput())

function part1 () {
    maxCalories(elvesCalories)
}

function part2 () {
    top3ElvesCalories(elvesCalories)
}

function top3ElvesCalories(elvesCalories) {
    return maxCalories(elvesCalories, 3)
}

function maxCalories(elvesCalories: number[][], numElves = 1) {
    let descendingCalories: number[] = []

    for (let elfCalories of elvesCalories) {
        let totalElfCalories = calcTotalElfCalories(elfCalories)
        descendingCalories.push(totalElfCalories)
    }

    descendingCalories.sort((a, b) => b - a)
    return calcTotalElfCalories(descendingCalories.slice(0, numElves))
}

console.log(`Elf carrying highest calories has ${maxCalories(elvesCalories)} calories`) // 66719
console.log(`The top 3 elves are carrying ${top3ElvesCalories(elvesCalories)} calories`) // 198551

function calcTotalElfCalories(calories: number[]): number {
    return calories.reduce((prev, current) => prev + current, 0)
}

function inputToArray(inputStr: string): number[][] {    
    return inputStr
        .split('\n\n')
        .map(line => line.split('\n').map(Number))
}

function readInput(): string {
    try {
        const input = fs.readFileSync(INPUT_FILE_PATH, 'utf-8')
        return input
    } catch (err) {
        console.error(err)
        throw new Error(err);
    }
}
