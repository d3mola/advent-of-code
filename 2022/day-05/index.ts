import assert from 'assert'
import fs from 'fs'
import path from 'path'

console.log('Day 05: Supply Stacks')

part1()
part2()

function part1() {
    let input = getInput()
    let moves = getMoves(input)
    let stacks = getStacks(input)

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
    let input = getInput()
    let moves = getMoves(input)
    let stacks = getStacks(input)

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

function getInput(): string[] {
    return fs
        .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
        .split('\n\n')
}

function getMoves(input: string[]): string[] {
    return input[1].split('\n')
}

function getStacks(input: string[]): string[][] {
    let body = input[0].split('\n')
    let rows = body.slice(0, body.length-1).slice(0, body.length-1)
        .map(line => line.replace(/\s\s\s\s/g, ','))
        .map(line => line.replace(/\s/g, ','))
        .map(line => line.split(','))
    let stacks = transpose2dMatrix<string>(rows)
        .map(stack => stack.reverse().filter(Boolean))
    return stacks
}

function topCrates(stacks: string[][]): string {
    let result = ''
    stacks.forEach(stack => {
        result += stack[stack.length-1][1]
    })
    return result
}

function transpose2dMatrix<T>(matrix: T[][]): T[][] {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}
