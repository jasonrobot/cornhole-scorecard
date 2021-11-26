import { createElement as e } from 'react'

import * as Result from './model/Results'


export function buildTossString({bag, ownKnocked, otherKnocked}: Result.Toss): string {

    let resultString = bag
    if (ownKnocked.length) {
        resultString += '/' + ownKnocked.join('')
    } else if (otherKnocked.length) {
        // we want to have something like 'x//x' if there are knock other
        // but not knock own
        resultString += '/'
    }

    if (otherKnocked.length) {
        resultString += '/' + otherKnocked.join('')
    }

    return resultString
}

export default function Toss(t: Result.Toss) {
    return e(
        'div',
        { className: 'toss' },
        buildTossString(t)
    )
}

