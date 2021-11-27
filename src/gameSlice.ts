import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as Result from './model/Results'

import { last } from 'ramda'

const emptyGame: Result.Game = [[[]]]

/**
 * Recuder for game state
 */
function _throwBag(g: Result.Game, t: Result.Toss): Result.Game {
    // so we have the Game
    // game(frame(...), frame(toss(ON, ON), toss(MISS, IN)))

    // in a game, find the last Inning
    // @FIXME why do we need ! here
    let currentInning = last(g)!
    let currentFrame = last(currentInning)!
    if (currentFrame.length === 2) {
        // new frame
        if (currentInning.length === 4) {
            // new inning
            currentInning = []
            g.push(currentInning)
        }
        currentFrame = []
        currentInning.push(currentFrame)
    }
    currentFrame.push(t);
    return g
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        game: emptyGame
    },
    reducers: {
        throwBag: (state, action: PayloadAction<Result.Toss>) => {
            state.game = _throwBag(state.game, action.payload)
        }
    }
})

export const { throwBag } = gameSlice.actions

export default gameSlice.reducer
