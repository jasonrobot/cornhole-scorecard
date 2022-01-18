// so what do we have

import {
    cond,
    equals,
    always,
} from 'ramda'

export const MISS = '-'
export const ON = 'x'
export const HOLE = 'o'


export type Bag = typeof MISS | typeof ON | typeof HOLE

export interface Knock {
    off: number
    hole: number
}

export const NO_KNOCK = {
    off: 0,
    hole: 0,
}

export interface YesToss {
    bag: Bag
    ownKnocked: {
        off: number
        hole: number
    }
    otherKnocked: {
        off: number
        hole: number
    }
}

export const NoToss = undefined

export type Toss = YesToss | typeof NoToss

export function makeToss(
    bag: Bag,
    ownKnocked: Knock = NO_KNOCK,
    otherKnocked: Knock = NO_KNOCK,
): Toss {
    return {
        bag,
        ownKnocked,
        otherKnocked,
    }
}

export type Frame = [Toss, Toss]
export function makeFrame(a: Toss, b: Toss) { return [a, b] }

export type Inning = [Frame, Frame, Frame, Frame]
export function makeInning(...fs: Array<Frame>): Inning {
    return [
        fs[0] ?? makeFrame(NoToss, NoToss),
        fs[1] ?? makeFrame(NoToss, NoToss),
        fs[2] ?? makeFrame(NoToss, NoToss),
        fs[3] ?? makeFrame(NoToss, NoToss),
    ]

}

export type Game = Array<Inning>
export function makeGame(...ss: Array<Inning>) { return ss }

// export function doToss(g: Game, t: Toss) {
//     // so we have the Game
//     // game(frame(...), frame(toss(ON, ON), toss(MISS, IN)))

//     // in a game, find the last Inning
//     let currentInning = g[g.length - 1]

//     // in a Inning, find the last frame with a no-toss
//     let curFrame = inning.find((frame: Frame) => {
//         frame[0] === NoToss || frame[1] === NoToss
//     })
//     // if the Inning is full (no empty frames), create a new inning
//     if (curFrame === undefined) {
//         currentInning = makeInning()
//         g.push(currentInning)
//         currentFrame = currentInning[0]
//     }
//     // add the toss to the last frame
//     currentFrame.push(t)
//     // return g
// }

// function bagScoreReducer(acc, next) {
//     if (next === ON) {
//         return acc + 1
//     } else if (next === HOLE) {
//         return acc + 3
//     } else {
//         return acc
//     }
// }

const getPoints: ((bag: Bag) => number) = cond([
    [equals(MISS), always(0)],
    [equals(ON), always(1)],
    [equals(HOLE), always(3)],
])

export type Score = [0, number] | [number, 0]
// export type Score = [number, number]

export function scoreInning(inning: Inning): Score {
    // add all the bag landings
    // const aTosses: Array<YesToss> = []// = inning.map(frame => frame[0])
    // const bTosses: Array<YesToss> = []// = inning.map(frame => frame[1])
    // for (const frame of inning) {
    //     if (frame[0] !== undefined) {
    //         aTosses.push(frame[0])
    //     }
    //     if (frame[1] !== undefined) {
    //         bTosses.push(frame[1])
    //     }
    // }

    const aTosses: Array<YesToss> = inning
        .map(frame => frame[0])
        .filter((toss): toss is YesToss => toss !== NoToss)
    const bTosses: Array<YesToss> = inning
        .map(frame => frame[1])
        .filter((toss): toss is YesToss => toss !== NoToss)

    let aScore = aTosses.reduce((acc: number, {bag}) => acc + getPoints(bag), 0)
    let bScore = bTosses.reduce((acc: number, {bag}) => acc + getPoints(bag), 0)
    // subtract one for every knock, on or in

    // knocks = a's owns + b's others
    let aBagKnocks = [
        ...aTosses.map(({ownKnocked}) => ownKnocked.off),
        ...bTosses.map(({otherKnocked}) => otherKnocked.off),
    ].reduce((acc, next) => acc + next, 0)

    let bBagKnocks = [
        ...bTosses.map(({ownKnocked}) => ownKnocked.off),
        ...aTosses.map(({otherKnocked}) => otherKnocked.off),
    ].reduce((acc, next) => acc + next, 0)

    aScore -= aBagKnocks
    bScore -= bBagKnocks

    const aKnockIn = [
        ...aTosses.map(({ownKnocked}) => ownKnocked.hole),
        ...bTosses.map(({otherKnocked}) => otherKnocked.hole),
    ].reduce((acc, next) => acc + next, 0)

    const bKnockIn = [
        ...bTosses.map(({ownKnocked}) => ownKnocked.hole),
        ...aTosses.map(({otherKnocked}) => otherKnocked.hole),
    ].reduce((acc, next) => acc + next, 0)

    // add 2 for each knock in (since an "ON" is lost with a knock in, so
    // it's worth 3-1=2 points
    aScore += aKnockIn * 2
    bScore += bKnockIn * 2

    const netScore = aScore - bScore
    if (netScore < 0) {
        return [0, -netScore]
    } else {
        return [netScore, 0]
    }
}


