import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as Result from './model/Results'

interface CurrentTossState {
    bag: null | typeof Result.MISS | typeof Result.ON | typeof Result.HOLE
    ownKnocked: {
        off: number
        hole: number
    }
    otherKnocked: {
        off: number
        hole: number
    }
}

const initialState: CurrentTossState = {
    bag: null,
    ownKnocked: {
        off: 0,
        hole: 0,
    },
    otherKnocked: {
        off: 0,
        hole: 0,
    },
}

export const currentTossSlice = createSlice({
    name: 'currentToss',
    initialState,
    reducers: {
        tossMiss: (state) => {
            state.bag = Result.MISS
        },
        tossOn: (state) => {
            state.bag = Result.ON
        },
        tossHole: (state) => {
            state.bag = Result.HOLE
        },
        knockOwnOff: (state) => {
            if (state.ownKnocked.off == 3) {
                state.ownKnocked.off = 0
            } else {
                state.ownKnocked.off += 1
            }
        }
    }
})

export const {
    tossMiss,
    tossOn,
    tossHole
} = currentTossSlice.actions

export default currentTossSlice.reducer
