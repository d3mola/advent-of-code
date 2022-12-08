// https://adventofcode.com/2022/day/8

import assert from 'assert'
import fs from 'fs'
import path from 'path'

console.log('Day 08: Treetop Tree House')

let input = fs.readFileSync(path.join(__dirname, 'smol.txt'), 'utf-8')
    .split('\n')
    .map(line => line.split(''))
    .map(line => line.map(char => Number(char)))

part1()

function part1() {
    console.log(input);
    let visible = 0

    for (let rowIndex=0; rowIndex<input.length; rowIndex++) {
        for (let colIndex=0; colIndex<input[0].length; colIndex++) {
            let isOuterCol = colIndex === 0 || colIndex === input[0].length - 1
            let isOuterRow = rowIndex === 0 || rowIndex === input.length - 1
            let isOuterTree = isOuterCol || isOuterRow
            if (isOuterTree) {
                visible++
            } else {
                let tree = input[rowIndex][colIndex]
                // top has: same colIndex, smaller rowIndex
                let top: number[] = []
                for (let i=0; i<rowIndex; i++) {
                    top.push(input[i][colIndex])
                }
                let blockers = top.filter(num => num >= tree)
                if (!blockers.length) {
                    visible++
                    continue
                }

                // bottom has: same colIndex, bigger rowIndex
                let bottom: number[] = []
                for (let i=rowIndex+1; i<input[0].length; i++) {
                    bottom.push(input[i][colIndex])
                }
                blockers = bottom.filter(num => num >= tree)
                if (!blockers.length) {
                    visible++
                    continue
                }

                // left has: same rowIndex, smaller colIndex
                let left: number[] = []
                for (let i=0; i<colIndex; i++) {
                    left.push(input[rowIndex][i])
                }
                blockers = left.filter(num => num >= tree)
                if (!blockers.length) {
                    visible++
                    continue
                }
                // right has: same rowIndex, bigger colIndex
                let right: number[] = []
                for (let i=colIndex+1; i<input.length; i++) {
                    right.push(input[rowIndex][i])
                }
                blockers = right.filter(num => num >= tree)
                if (!blockers.length) {
                    visible++
                }
            }
        }
    }

    assert.equal(visible, 21) // smol.txt
    // assert.equal(visible, 1814) // input.txt
}
