import assert from 'assert'
import fs from 'fs'
import path from 'path'

console.log('Day 05: Supply Stacks')

part1()
part2()

function part1() {
    let [labels, crates, moves] = parseInput()
    let stacks = createStacks(labels, crates)

    for (let move of moves) {
        let {amount,from,to} = parseMove(move)
        while (amount > 0) {
            let popped = stacks[from-1].pop()
            if (!popped) throw new Error("stack is empty");
            stacks[to-1].push(popped)
            amount--
        }
    }

    let result = topCrates(stacks)
    assert.equal(result, 'BWNCQRMDB')
}

function part2() {
    let [labels, crates, moves] = parseInput()
    let stacks = createStacks(labels, crates)

    for (let move of moves) {
        let {amount,from,to} = parseMove(move)
        
        let fromStack = stacks[from-1] // remove last n items
        let toStack = stacks[to-1]
        let popped = fromStack.splice(fromStack.length - amount)
        toStack.push(...popped)
    }

    let result = topCrates(stacks)
    assert.equal(result, 'NHWZCBNBF')
}

function parseMove(move: string): {amount: number, from: number, to: number} {
    let [,amount,,from,,to] = move.split(' ').map(Number)
    return {amount, from, to}
}

function getEveryNth(arr: string[], nth: number, startIndex: number) {
    const result: string[] = [];
    let _arr = arr.slice(startIndex)
    for (let i = 0; i < _arr.length; i += nth) {
        result.push(_arr[i]);
    }
    return result;
}

function createStacks(labels: string[], crates: string[]): string[][] {
    let stacks: string[][] = []
    let startIndex = 0
    for (let label = 1; label <= labels.length; label++) {
        stacks[label-1] = getEveryNth(crates, labels.length, startIndex)
        startIndex++
    }
    stacks = stacks.map(stack => stack.reverse().filter(Boolean)) // remove empty crates
    return stacks
}

function parseInput(): [string[], string[], string[]] {
    const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split('\n\n')

    let moves = input[1].split('\n')
    let body = input[0].split('\n')
    let labels = body[body.length-1].trim().split('   ')
    let crates = body
        .slice(0, body.length-1)
        .map(line => line.replace(/\s\s\s\s/g, ','))
        .map(line => line.replace(/\s/g, ','))
        .map(line => line.split(','))
        .flat()

    return [labels, crates, moves]
}

function topCrates(stacks: string[][]): string {
    let result = ''
    stacks.forEach(stack => {
        result += stack[stack.length-1][1]
    })
    return result
}
