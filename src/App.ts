import {
    createElement as e
} from 'react'

import * as Result from './model/Results'
import Scoreboard from './Scoreboard'
import Buttons from './Buttons'
import CurrentToss from './CurrentToss'

export function App() {
    return e(
        'div',
        null,
        e(Scoreboard),
        e(CurrentToss),
        e(Buttons),
    )
}
