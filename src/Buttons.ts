import { createElement as e } from 'react'

import {
    tossMiss,
    tossOn,
    tossHole,
} from './currentTossSlice'

import {
    throwBag
} from './gameSlice'

import { useAppDispatch } from './hooks'


// send the current toss to the game
// clear the current toss

export default function Buttons() {
    const d = useAppDispatch()
    return e(
        'div',
        null,
        e(
            'button',
            {
                id: 'miss',
                onClick: () => {
                    d(tossMiss())
                }
            },
            'Miss'
        ),
        e('button', { id: 'on', onClick: () => d(tossOn()) }, 'On'),
        e('button', { id: 'in', onClick: () => d(tossHole()) }, 'In'),
    )
}
