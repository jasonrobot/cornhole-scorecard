import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as Result from './model/Results'

export type CurrentTossState = Omit<Result.YesToss, 'bag'>

const initialState: CurrentTossState = {
    ownKnocked: {
        off: 0,
        hole: 0,
    },
    otherKnocked: {
        off: 0,
        hole: 0,
    },
}

function knocker(count: number): number {
    if (count === 3) {
        return 0
    }
    return count + 1
}

export const currentTossSlice = createSlice({
    name: 'currentToss',
    initialState,
    reducers: {
        knockOwnOff: (state) => {
            state.ownKnocked.off = knocker(state.ownKnocked.off)
        },
        knockOwnIn: (state) => {
            state.ownKnocked.hole = knocker(state.ownKnocked.hole)
        },
        knockOtherOff: (state) => {
            state.otherKnocked.off = knocker(state.otherKnocked.off)
        },
        knockOtherIn: (state) => {
            state.otherKnocked.hole = knocker(state.otherKnocked.hole)
        },
        resetCurrentToss: state => {
            state.ownKnocked.off = 0
            state.ownKnocked.hole = 0
            state.otherKnocked.off = 0
            state.otherKnocked.hole = 0
        }
    }
})

export const {
    knockOwnOff,
    knockOwnIn,
    knockOtherOff,
    knockOtherIn,
    resetCurrentToss,
} = currentTossSlice.actions

export default currentTossSlice.reducer
