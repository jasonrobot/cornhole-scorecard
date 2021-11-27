import { createElement as e } from 'react'

import * as Result from './model/Results'

import {
    identity,
    times,
} from 'ramda'

export function buildTossString({bag, ownKnocked, otherKnocked}: Result.Toss): string {

    let resultString = bag

    return resultString
}

export default function Toss(t: Result.Toss) {
    return e(
        'div',
        { className: 'toss' },
        buildTossString(t)
    )
}

