import { createElement as e } from 'react'

import * as Result from './model/Results'
import Toss from './Toss'

export default function frame(f: Result.Frame) {
    return e(
        'div',
        { className: 'frame' },
        f.map((t: Result.Toss) => Toss(t))
    )
}
