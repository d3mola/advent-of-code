import fs from "fs"

console.log('Day 03')

part1()
part2()

function part1() {
    let rucksacks = fs
        .readFileSync('input.txt', 'utf-8')
        .split('\n')
        .map(line => {
            let mid = line.length / 2
            return [line.slice(0, mid), line.slice(mid)]
        })
    
    let duplicates: string[] = []
    for (let sack of rucksacks) {
        let cache: {[key: string]: true} = {}
        for (let item of sack[0]) {
            cache[item] = true
        }
    
        for (let item of sack[1]) {
            if (item in cache) { // found duplicate
                duplicates.push(item)
                break
            }
        }
    }
    
    let alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = duplicates
        .map(item => alphabets.indexOf(item) + 1)
        .reduce((prev, curr) => prev + curr, 0)
    
    console.log(result)
    console.assert(result === 8233, 'result should be 8233')
}

function part2() {
    let elves = fs
        .readFileSync('input.txt', 'utf-8')
        .split('\n')

    let duplicates: string[] = []
    for (let elfIndex = 0; elfIndex < elves.length; elfIndex += 3) {
        let sortedElves = elves.slice(elfIndex, elfIndex+3).sort((a, b) => b.length - a.length)
        let cache1 = strToMap(sortedElves[0])
        let cache2 = strToMap(sortedElves[1])

        for (let item of sortedElves[2]) {
            if (cache1.has(item) && cache2.has(item)) { // duplicate found
                duplicates.push(item)
                break
            }
        }
    }
    let result = sumPriorities(duplicates)
    console.log(result)
    console.assert(result === 2821, 'result should be 2821');
}

function strToMap(str: string): Map<string, boolean> {
    let cache = new Map<string, boolean>()
    for (let item of str) {
        cache.set(item, true)
    }
    return cache
}

function sumPriorities(letters: string[]): number {
    let alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return letters
        .map(item => alphabets.indexOf(item) + 1)
        .reduce((prev, curr) => prev + curr, 0)
}
