import { createElement as e } from 'react'

import * as Result from './model/Results'

import {repeat} from 'ramda'

import {
    MISS,
    ON,
    HOLE
} from './model/Results'

export function buildTossString({bag, ownKnocked, otherKnocked}: Result.Toss): string {

    let resultString = bag



    const ownKnockedString: string = [
        ...repeat(HOLE, ownKnocked.hole),
        ...repeat(ON, ownKnocked.off),
    ].join('')

    const otherKnockedString: string = [
        ...repeat(HOLE, otherKnocked.hole),
        ...repeat(ON, otherKnocked.off),
    ].join('')

    if (ownKnockedString.length === 0) {
        if (otherKnockedString.length === 0) {
            return bag
        } else {
            // own is 0, but other is nonzero
            return `${bag}//${otherKnockedString}`
        }
    } else {
        // own is nonzero
        if (otherKnockedString.length === 0) {
            return `${bag}/${ownKnockedString}`
        } else {
            return [resultString, ownKnockedString, otherKnockedString].join('/')
        }
    }
}

export default function Toss(t: Result.Toss) {
    return e(
        'div',
        { className: 'toss' },
        buildTossString(t)
    )
}

