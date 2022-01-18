import { createElement as e } from 'react'

import * as Result from './model/Results'

import {
    knockOwnOff,
    knockOwnIn,
    knockOtherOff,
    knockOtherIn,
    resetCurrentToss,
} from './currentTossSlice'

import {throwBag} from './gameSlice'

import {
    useAppDispatch,
    useAppSelector,
} from './hooks'

import {
    AppDispatch,
    RootState,
} from './store'

import {CurrentTossState} from './currentTossSlice'

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

// fetchTodoById is the "thunk action creator"
export function tossThunkCreator(bag: Result.Bag) {
    // fetchTodoByIdThunk is the "thunk function"
    return function tossThunk(dispatch: any, getState: () => RootState) {
        const {
            currentToss: {
                ownKnocked,
                otherKnocked,
            }
        } = getState()

        dispatch(
            throwBag({
                bag,
                ownKnocked,
                otherKnocked,
            })
        )
        dispatch(resetCurrentToss())
    }
}

function makeButton(text: string, id: string, onClick: () => void) {
    return e(
        'button',
        {
            id,
            onClick,
        },
        text,
    )
}

export default function Buttons() {
    const dis = useAppDispatch()
    const {
        ownKnocked: own,
        otherKnocked: other,
    } = useAppSelector((state) => state.currentToss)

    return e(
        'div',
        {className: 'buttons'},
        e('div',
          {className: 'knock-buttons'},
          e('div',
            {className: 'knock-own'},
            makeButton(
                `Own In (${own.hole})`,
                'knock-own-in',
                () => dis(knockOwnIn()),
            ),
            makeButton(
                `Own Off (${own.off})`,
                'knock-own-off',
                () => dis(knockOwnOff()),
            ),
           ),
          e('div',
            {className: 'knock-other'},
            makeButton(
                `Other In (${other.hole})`,
                'knock-other-in',
                () => dis(knockOtherIn()),
            ),
            makeButton(
                `Other Off (${other.off})`,
                'knock-other-off',
                () => dis(knockOtherOff()),
            ),
           ),
        ),
        e('div',
          {className: 'score-buttons'},
          makeButton(
              'Miss',
              'toss-miss',
              () => dis(tossThunkCreator(Result.MISS))
          ),
          makeButton(
              'On',
              'toss-on',
              () => dis(tossThunkCreator(Result.ON))
          ),
          makeButton(
              'In',
              'toss-hole',
              () => dis(tossThunkCreator(Result.HOLE))
          ),
        ),
    )
}
