// so what do we have

export const MISS = '-'
export const ON = 'x'
export const OFF = ON
export const HOLE = 'o'

export type Bag = typeof MISS | typeof ON | typeof OFF | typeof HOLE

export type Toss = [Bag, Array<Bag>, Array<Bag>]
export function makeToss(
    thrown: Bag,
    ownKnocked: Array<Bag> = [],
    otherKnocked: Array<Bag> = []
): Toss {
    return [thrown, ownKnocked, otherKnocked]
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
