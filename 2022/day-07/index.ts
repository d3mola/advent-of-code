import assert from 'assert'
import fs from "fs"
import path from "path"

console.log('Day 07:  No Space Left On Device')

type Node = {
    value: string
    children?: Node[]
}

part1()
part2()

function part1() {
    let input = fs.readFileSync(path.join(__dirname, 'smol.txt'), 'utf-8').split('\n')
    let tree = createTree(input)
    let nodes = getNodes(tree)
    let dirs = nodes.filter(node => node.children)
    let sizes = dirs.map(dir => getTreeSize(dir))
    let result = sizes.filter(size => size <= 100_000).reduce((acc, size) => acc + size, 0)
    assert.equal(result, 95437) // smol.txt
    // assert.equal(result, 1989474) // input.txt
}

function part2() {
    let input = fs.readFileSync(path.join(__dirname, 'smol.txt'), 'utf-8').split('\n')
    let tree = createTree(input)
    let nodes = getNodes(tree)
    let dirs = nodes.filter(node => node.children)
    let dirSizes = [getTreeSize(tree), ...dirs.map(dir => getTreeSize(dir))]
    let maxSpace = 70000000
    let unusedSpace = maxSpace - getTreeSize(tree)
    let spaceNeeded = 30000000 - unusedSpace
    let result = Math.min(...dirSizes.filter(size => size > spaceNeeded))
    assert.equal(result, 24933642) // smol.txt
    // assert.equal(result, 1111607) // input.txt
}

function createTree(input: string[]): Node {
    let root: Node = {
        value: '/',
        children: []
    }
    let pwd = root
    let stack: Node[] = []

    for (let line of input) {
        if (line.startsWith('$')) { // command
            let [, cmd, dir] = line.split(' ')
            if (cmd === 'cd') {
                if (dir === '/') { // home
                    pwd = root
                    stack = []
                } else if (dir === '..') { // back
                    if (stack.length > 0) {
                        pwd = stack.pop()!
                    } else {
                        throw new Error('nothing to pop')
                    }
                } else { // dir
                    if (pwd.children?.findIndex((child => child.value === dir)) === -1) {
                        pwd.children.push({value: dir, children: []})
                    }
                    stack.push(pwd)
                    pwd = pwd.children!.find(child => child.value === dir)!
                }

            }
            if (cmd === 'ls') {}
        } else if (line.startsWith('dir')) { // dir
            let [, dirName] = line.split(' ')
            if (pwd.children?.findIndex((child => child.value === dirName)) === -1) {
                pwd.children?.push({value: dirName, children: []})
            }
        } else { // file
            let [fileSize, fileName] = line.split(' ')
            pwd.children?.push({value: `${fileName} ${fileSize}`})
        }
    }
    return root
}

function printTree(tree: Node) {
    prettyPrint(tree)
}

function prettyPrint(v: any) {
    console.log(JSON.stringify(v, null, 4))
}

function getNodes(tree: Node): Node[] {
    if (!tree.children) {
        return []
    }

    return tree.children.concat(
        tree.children.reduce((prev: Node[], current) => prev.concat(getNodes(current)), [])
    )
}

function getTreeSize(tree: Node): number {
    if (!tree.children) {
        return getFileSize(tree.value)
    }
    return getFileSize(tree.value) +
        tree.children.reduce((prev, current) => prev + getTreeSize(current), 0)
}

function getFileSize(file: string): number {
    let size = Number(file.split(' ')[1])
    if (Number.isNaN(size)) {
        return 0
    }
    return size
}


// let tree = {
//     '/': {
//         a: {
//             e: {
//                 i: 584,
//             },
//             f: 29116,
//             g: 2557,
//             'h.lst': 62596,
//         }, 
//         'b.txt': 14848514,
//         'c.dat': 8504156,
//         d: {
//             j: 4060174,
//             'd.log': 8033020,
//             'd.ext': 5626152,
//             k: 7214296,
//         }
//     }
// }

// type Tree = {
//     [key: string]: Tree | number
// }
