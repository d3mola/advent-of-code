import fs from 'fs'

type Shape = 'Rock' | 'Paper' | 'Scissors'
type Winner = 'player1' | 'player2' | 'none'

const inputFile = 'input.txt'
// const inputFile = 'smol.txt'

const OpponentsShape:  {[n: string]: Shape } = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
}
const TargetResult = {
    Lose: 'X',
    Draw: 'Y',
    Win: 'Z',
}

function main() {
    let strategy = getInput(inputFile)
        .split('\n')
        .map(line => line.split(' '))

    let scores = strategy.map(round => {
        let [opponent, targetResult] = round
        let myShape = determineMyShape(OpponentsShape[opponent], targetResult)
        return [OpponentsShape[opponent], myShape]
    })

    let myRoundScores = scores.map(round => {
        let [_, me] = round
        let roundScore = shapeScore(me) + roundOutcomeScore(round)
        return roundScore
    })

    let myTotalScore = myRoundScores.reduce((prev: number, total: number) => prev + total, 0)
    console.log(myTotalScore)
    return myTotalScore
}

function shapeScore(shape: Shape): number {
    const ShapeScore = {
        Rock: 1,
        Paper: 2,
        Scissors: 3,
    }
    return ShapeScore[shape]
}

function roundOutcomeScore(round: Shape[]): number {
    let [opponent, me] = round
    let winner = determineRoundWinner(opponent, me)
    let Winner = {
        Player1: 'player1',
        Player2: 'player2',
        None: 'none',
    }
    let RoundOutcomeScore = {
        Lose: 0,
        Draw: 3,
        Win: 6,
    }

    if (winner === Winner.Player1) return RoundOutcomeScore.Lose
    if (winner === Winner.Player2) return RoundOutcomeScore.Win
    return RoundOutcomeScore.Draw
}

function determineRoundWinner(player1: Shape, player2: Shape): Winner {
    if (player1 === player2) return 'none'

    if (player1 ===
        'Rock') {
        return player2 ===
            'Scissors' ? 'player1' : 'player2'
    }

    if (player1 ===
        'Paper') {
        return player2 ===
            'Rock' ? 'player1' : 'player2'
    }

    if (player1 ===
        'Scissors') {
        return player2 ===
            'Paper' ? 'player1' : 'player2'
    }

    throw new Error("Couldn't determine winner")
}

function determineMyShape(opponentShape: Shape, targetResult: string): Shape {
    if (targetResult === TargetResult.Draw) return opponentShape

    if (targetResult === TargetResult.Lose) {
        if (opponentShape === 'Rock') return 'Scissors'
        if (opponentShape === 'Paper') return 'Rock'
        return 'Paper'
    }

    if (targetResult === TargetResult.Win) {
        if (opponentShape ===
            'Rock') return 'Paper'
        if (opponentShape ===
            'Paper') return 'Scissors'
        return 'Rock'
    }

    throw new Error("Couldn't determine shape");
}

function getInput(file: string): string {
    try {
        return fs.readFileSync(file, 'utf-8')
    } catch (error) {
        console.error(error)
        throw new Error("Couldn't read file")
    }
}

main()

console.assert(main() === 11756, 'main() should return 11756')
