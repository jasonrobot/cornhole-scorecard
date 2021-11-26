import { createElement as e } from 'react'

import * as Result from './model/Results'
import Inning from './Inning'

export default function Game({game}: { game: Result.Game }) {
    return e(
        'div',
        { className: 'game' },
        game.map((i: Result.Inning) => Inning(i))
    )
}
