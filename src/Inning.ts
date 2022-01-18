import { createElement as e } from 'react'

import { useAppSelector } from './hooks'

import Frame from './Frame'
import * as Result from './model/Results'
import {times} from 'ramda'

import {Score} from './model/Results'

export default function Inning(inning: Result.Inning, inningNumber: number) {

    const [
        aScore,
        bScore,
    ] = Result.scoreInning(inning)

    return e(
        'div',
        { className: 'inning' },
        e('div',
          {className: 'inning__header'},
          `inning: ${inningNumber}`,
         ),
        // We want to render all frames of an inning, even if they're empty
        e('div',
          {className: 'inning__frames'},
          // s.map((f: Result.Frame) => Frame(f)),
          [0, 1, 2, 3].map(frameNumber => {
              return Frame(inning[frameNumber])
          }),
          e('div',
            {className: 'inning__scores'},
            e('div', {className: 'inning__score'}, aScore),
            e('div', {className: 'inning__score'}, bScore),
           ),
         )
    )
}
