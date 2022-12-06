import assert from 'assert'
import fs from 'fs'
import path from 'path'

console.log('Day 06')
part1()
part2()

function part1() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('')
    let result = 0
    for (let i=0; i<input.length; i++) {
        let sequenceof4 = input.slice(i, i+4)
        if (new Set(sequenceof4).size === sequenceof4.length) { // no duplicate in sequence
            result = i + 4
            break
        }
    }
    assert.equal(result, 1134)
}

function part2() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('')
    let result = 0
    for (let i=0; i<input.length; i++) {
        let sequenceof14 = input.slice(i, i+14)
        if (new Set(sequenceof14).size === sequenceof14.length) { // no duplicate in sequence
            result = i + 14
            break
        }
    }
    assert.equal(result, 2263)
}
