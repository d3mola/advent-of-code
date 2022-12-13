import fs from 'fs'
import path from 'path'

console.log('Day 11: Monkey in the Middle')

let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')

part1()

type Monkey = {
    id: string;
    items: number[];
    operation: string;
    test: string;
    ifTrue: string;
    ifFalse: string;
    inspections: number;
}

function part1() {
    let monkeys = input
        .split('\n\n')
        .map(monkey => monkey.split('\n'))
        .map((monkey): Monkey => ({id: monkeyId(monkey[0]), items: monkeyItems(monkey[1]), operation: monkeyOperation(monkey[2]), test: monkeyTest(monkey[3]), ifTrue: monkeyIfTrue(monkey[4]), ifFalse: monkeyIfFalse(monkey[5]), inspections: 0}))

    let MAX_ROUNDS = 20
    for (let roundIndex = 0; roundIndex < MAX_ROUNDS; roundIndex++) {        
        for (let monkey of monkeys) {
            let {id, ifFalse, ifTrue, items, operation, test} = monkey
            if (!monkey.items.length) continue
            for (let itemIndex = 0; itemIndex < items.length; itemIndex=0) {
                let item  = items[itemIndex]
                let newWorry = newWorryLevel(item, operation)
                let nextMonkeyIndex = getNextMonkeyIndex(monkeys, newWorry, test, ifTrue, ifFalse)
                monkeys[nextMonkeyIndex].items.push(newWorry)
                items.shift()
                monkey.inspections++
            }
        }
    }
    let allInspections = monkeys.map(monkey => monkey.inspections)
    let allInspectionsSorted = allInspections.sort((a, b)=> b - a)
    let result = allInspectionsSorted[0] * allInspectionsSorted[1]
    console.log(result);
}

function getNextMonkeyIndex(monkeys: Monkey[], worryLevel: number, testNumber: string, monkeyIfTrue: string, monkeyIfFalse: string): number {
    if (worryLevel % Number(testNumber) === 0) {
        return monkeys.findIndex(monkey => monkey.id === monkeyIfTrue)
    }
    return monkeys.findIndex(monkey => monkey.id === monkeyIfFalse)
}

function newWorryLevel(oldWorryLevel: number, operation): number {
    let newWorry = eval(operation.replace(/old/g, String(oldWorryLevel))) as number
    newWorry = Math.floor(newWorry / 3)
    return newWorry
}

function monkeyId(name: string): string {
    return name.split(':')[0]
}

function monkeyItems(items: string): number[] {
    return items.trim().split('Starting items: ')[1].split(', ').map(Number)
}

function monkeyOperation(operation: string): string {
    return operation.trim().split('= ')[1]
}

function monkeyTest(test: string): string {
    return test.trim().split('divisible by ')[1]
}

function monkeyIfTrue(trueStatement: string): string {
    
    return capitalize(trueStatement.trim().split('If true: throw to ')[1])
}

function monkeyIfFalse(falseStatement: string): string {
    return capitalize(falseStatement.trim().split('If false: throw to ')[1])
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
