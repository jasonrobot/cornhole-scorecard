import { createElement as e } from 'react'

import * as Result from './model/Results'
import Toss from './Toss'

export default function frame(frame: Result.Frame) {
    return e(
        'div',
        { className: 'frame' },
        // Frame should always draw both tosses, even if they're empty
        [0, 1].map(toss => {
            return Toss(frame[toss])
        }),
        // f.map((t: Result.Toss) => Toss(t))
    )
}
