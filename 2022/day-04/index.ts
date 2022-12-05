import assert from "assert"
import fs from "fs"
import path from "path"

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

console.log('Day 4: Camp Cleanup')

part1()
part2()

function part1() {
    let result = input
        .split('\n')
        .map(line => line.split(','))
        .map(([pair1, pair2]) => [
            [Number(pair1.split('-')[0]), Number(pair1.split('-')[1])],
            [Number(pair2.split('-')[0]), Number(pair2.split('-')[1])]
        ])
        .filter(([pair1, pair2]) => (pair1[0]<=pair2[0] && pair1[1]>=pair2[1]) || (pair2[0]<=pair1[0] && pair2[1]>=pair1[1]))
        .length
    console.log(result)
    assert.equal(result, 448, 'result should be 448')
}

function part2() {
    let result = input
        .split('\n')
        .map(line => line.split(','))
        .map(([pair1, pair2]) => [
            [Number(pair1.split('-')[0]), Number(pair1.split('-')[1])],
            [Number(pair2.split('-')[0]), Number(pair2.split('-')[1])]
        ])
        .filter(([[a, b], [c, d]]) => isBetween(c,d,a) || isBetween(c,d,b) || isBetween(a,b,c) || isBetween(a,b,d))
        .length
    console.log(result)
    assert.equal(result, 794, `expected 794 got ${result}`)
}

function isBetween (num1: number, num2: number, value: number): boolean {
    return value >= num1 && value <= num2 
}
