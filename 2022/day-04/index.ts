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
}
