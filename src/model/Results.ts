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

export interface Toss {
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
export function makeToss(
    bag: Bag,
    ownKnocked: {off: number, hole: number} = {off: 0, hole: 0},
    otherKnocked: {off: number, hole: number} = {off: 0, hole: 0},
): Toss {
    return {
        bag,
        ownKnocked,
        otherKnocked,
    }
}


export type Frame = Array<Toss>;
export function makeFrame(a: Toss, b: Toss) { return [a, b] }

export type Inning = Array<Frame>
export function makeInning(...fs: Array<Frame>) { return fs }

export type Game = Array<Inning>
export function makeGame(...ss: Array<Inning>) { return ss }

export function doToss(g: Game, t: Toss) {
    // so we have the Game
    // game(frame(...), frame(toss(ON, ON), toss(MISS, IN)))

    // in a game, find the last Inning
    let currentInning = g[g.length - 1]
    // if the Inning is full, create a new one
    if (currentInning.length === 4) {
        currentInning = []
        g.push(currentInning)
    }
    // in a Inning, find the last frame
    let currentFrame: Frame
    if (currentInning.length === 0) {
        currentFrame = []
    } else {
        currentFrame = currentInning[currentInning.length - 1]
    }
    // if the frame is full, create a new one
    if (currentFrame.length === 2) {
        currentFrame = []
        currentInning.push(currentFrame)
    }
    // add the toss to the last frame
    currentFrame.push(t)
    // return g
}

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
    const aTosses: Array<Toss> = inning.map(frame => frame[0]).filter(x => x)
    const bTosses: Array<Toss> = inning.map(frame => frame[1]).filter(x => x)

    let aScore = aTosses.reduce((acc: number, {bag}) => acc + getPoints(bag), 0)
    let bScore = bTosses.reduce((acc: number, {bag}) => acc + getPoints(bag), 0)
    // subtract one for every knock, on or in

    //
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


