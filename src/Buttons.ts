import { createElement as e } from 'react'

import * as Result from './model/Results'

import {
    knockOwnOff,
    knockOwnIn,
    knockOtherOff,
    knockOtherIn,
} from './currentTossSlice'

import {
    throwBag
} from './gameSlice'

import { useAppDispatch, useAppSelector } from './hooks'
import {AppDispatch} from './store'

import { CurrentTossState } from './currentTossSlice'

// send the current toss to the game
// clear the current toss

function tossCompleter(
    d: AppDispatch,
    {
        ownKnocked,
        otherKnocked
    }: CurrentTossState
): (b: Result.Bag) => void {

    return function dispatchThrowBag(bag: Result.Bag) {
        const completeToss: Result.Toss = {
            bag,
            ownKnocked,
            otherKnocked,
        }
        d(throwBag(completeToss))
    }
}

export default function Buttons() {
    const tossBagForResult = tossCompleter(
        useAppDispatch(),
        useAppSelector((state) => state.currentToss)
    )

    return e(
        'div',
        null,
        e(
            'button',
            {id: 'miss', onClick: () => tossBagForResult(Result.MISS)},
            'Miss'
        ),
        e(
            'button',
            {id: 'on', onClick: () => tossBagForResult(Result.ON)},
            'On',
        ),
        e(
            'button',
            {id: 'in', onClick: () => tossBagForResult(Result.HOLE)},
            'In',
        ),
    )
}
