import { createElement as e } from 'react'

import Frame from './Frame'
import * as Result from './model/Results'

export default function Inning(s: Result.Inning, inningNumber: number) {
    const [
        aScore,
        bScore,
    ] = Result.scoreInning(s)

    return e(
        'div',
        { className: 'inning' },
        e('div',
          {className: 'inning__header'},
          `inning: ${inningNumber}`,
         ),
        e('div',
          {className: 'inning__frames'},
          s.map((f: Result.Frame) => Frame(f)),
          e('div',
            {className: 'inning__scores'},
            e('div', null, aScore),
            e('div', null, bScore),
           ),
         )
    )
}
