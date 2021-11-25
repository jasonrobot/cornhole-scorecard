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

export type Set = Array<Frame>
export function makeSet(...fs: Array<Frame>) { return fs }

export type Game = ReturnType<typeof makeGame>
export function makeGame(...ss: Array<Set>) { return ss }

export function doToss(g: Game, t: Toss): Game {
    // so we have the Game
    // game(frame(...), frame(toss(ON, ON), toss(MISS, IN)))

    // in a game, find the last set
    let currentSet = g[g.length - 1]
    // if the set is full, create a new one
    if (currentSet.length === 4) {
        currentSet = []
        g.push(currentSet)
    }
    // in a set, find the last frame
    let currentFrame: Frame
    if (currentSet.length === 0) {
        currentFrame = []
    } else {
        currentFrame = currentSet[currentSet.length - 1]
    }
    // if the frame is full, create a new one
    if (currentFrame.length === 2) {
        currentFrame = []
        currentSet.push(currentFrame)
    }
    // add the toss to the last frame
    currentFrame.push(t)
    return g
}
