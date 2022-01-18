import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as Result from './model/Results'

import * as R from 'ramda'

// const emptyGame: Result.Game = [
//     [
//         [],[]
//     ],
//     []
// ]

const emptyGame: Result.Game = Result.makeGame(
    Result.makeInning()
)

/**
 * Reducer for game state
 */
function _throwBag(g: Result.Game, t: Result.Toss): Result.Game {
    // so we have the Game
    // game(frame(...), frame(toss(ON, ON), toss(MISS, IN)))

    // in a game, find the last Inning
    let currentInning = g[g.length - 1]

    // in a Inning, find the last frame with a no-toss
    let currentFrame = currentInning
        .findIndex((frame: Result.Frame) => {
            return frame[0] === Result.NoToss || frame[1] === Result.NoToss
        })

    // if the Inning is full (no empty tosses), create a new inning
    if (currentFrame === -1) {
        currentInning = Result.makeInning()
        g.push(currentInning)
        currentFrame = 0
    }
    const currentToss = currentInning[currentFrame][0] === Result.NoToss ? 0 : 1
    // add the toss to the last frame
    currentInning[currentFrame][currentToss] = t
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
