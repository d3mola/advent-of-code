import fs from 'fs'

const inputFile = 'input.txt'

const Rock = 'Rock'
const Paper = 'Paper'
const Scissors = 'Scissors'
let Shape = {
    Rock: 'Rock',
    Paper: 'Paper',
    Scissors: 'Scissors',
}
let Winner = {
    Player1: 'player1',
    Player2: 'player2',
    None: 'none',
}
const RoundOutcomeScore = {
    Lose: 0,
    Draw: 3,
    Win: 6,
}
const ShapeScore = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
}
const Opponent = {
    A: Rock,
    B: Paper,
    C: Scissors,
}
const Me = {
    X: Rock,
    Y: Paper,
    Z: Scissors,
}

function part1() {
    let strategy = getInput(inputFile).split('\n')
        .map(line => line.split(' '))
        .map(round => {
            return [Opponent[round[0]],  Me[round[1]]]
        })
    
    let myRoundScores = strategy.map(round => {
            let [opponent, me] = round
            let roundScore = shapeScore(me) + roundOutcomeScore(round)
            return roundScore
        })

    let myTotalScore = myRoundScores.reduce((prev, total) => prev + total, 0)
    console.log(myTotalScore)
}

function shapeScore(shape) {
    return ShapeScore[shape]
}


// Lose | Draw | Win
function roundOutcomeScore(round) {
    let [opponent, me] = round
    let winner = determineRoundWinner(opponent, me)

    if (winner === Winner.Player1) return RoundOutcomeScore.Lose
    if (winner === Winner.Player2) return RoundOutcomeScore.Win
    return RoundOutcomeScore.Draw
}

/**
 * 
 * @param {string, string} round shape for each player
 * @returns {string} 'player1' | 'player2' | 'none'
 */
function determineRoundWinner(player1, player2) {
    if (player1 === player2) return 'none'

    if (player1 === Shape.Rock) {
        return player2 === Shape.Scissors ? 'player1' : 'player2'
    }

    if (player1 === Shape.Paper) {
        return player2 === Shape.Rock ? 'player1' : 'player2'
    }

    if (player1 === Shape.Scissors) {
        return player2 === Shape.Paper ? 'player1' : 'player2'
    }
}

function part2(params) {
    
}

function getInput(file) {
    try {
        return fs.readFileSync(file, 'utf-8')
    } catch (error) {
        console.error(error)
    }
}

part1()
