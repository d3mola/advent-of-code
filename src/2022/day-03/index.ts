import fs from "fs"

console.log('Day 03')

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
