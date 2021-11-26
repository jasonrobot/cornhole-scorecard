import { createElement as e } from 'react'

import Frame from './Frame'
import * as Result from './model/Results'

export default function Inning(s: Result.Inning) {
    return e(
        'div',
        { className: 'inning' },
        s.map((f: Result.Frame) => Frame(f))
    )
}
