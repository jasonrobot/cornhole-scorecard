import { createElement as e } from 'react'

import * as Result from './model/Results'


export function buildTossString(t: Result.Toss): string {
    const [
        throwResult,
        knockOwn,
        knockOther
    ] = t

    let resultString = throwResult
    if (knockOwn.length) {
        resultString += '/' + knockOwn.join('')
    } else if (knockOther.length) {
        // we want to have something like 'x//x' if there are knock other
        // but not knock own
        resultString += '/'
    }

    if (knockOther.length) {
        resultString += '/' + knockOther.join('')
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

