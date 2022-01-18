import { createElement as e } from 'react'

import * as Result from './model/Results'
import Game from './Game'

import { useAppSelector } from './hooks'

export default function Scoreboard() {
    const game = useAppSelector((state) => state.game)

    return e(
        'div',
        { className: 'scoreboard' },
        e(Game, {game: game.game})
    )
}
