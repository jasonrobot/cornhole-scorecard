import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as Result from './model/Results'

const sampleGame = Result.makeGame(
    Result.makeInning(
        Result.makeFrame(
            Result.makeToss(Result.MISS),
            Result.makeToss(Result.ON)
        ),
        Result.makeFrame(
            Result.makeToss(Result.HOLE),
            Result.makeToss(Result.MISS)
        )
    )
)

// const emptyGame = Result.makeGame(
//     Result.makeInning(
//         Result.makeFrame()
//     )
// );

const emptyGame: Result.Game = [[[]]]

function _throwBag(g: Result.Game, t: Result.Toss): Result.Game {
    // so we have the Game
    // game(frame(...), frame(toss(ON, ON), toss(MISS, IN)))

    // in a game, find the last Inning
    let currentInning = g[g.length - 1]
    // if the Inning is full, create a new one
    if (currentInning.length === 4) {
        currentInning = []
        g.push(currentInning)
    }
    // in a Inning, find the last frame
    let currentFrame: Result.Frame
    if (currentInning.length === 0) {
        currentFrame = []
    } else {
        currentFrame = currentInning[currentInning.length - 1]
    }
    // if the frame is full, create a new one
    if (currentFrame.length === 2) {
        currentFrame = []
        currentInning.push(currentFrame)
    }
    // add the toss to the last frame
    currentFrame.push(t)
    return g
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        game: emptyGame
    },
    reducers: {
        throwBag: (state, action: PayloadAction<Result.Toss>) => {
            return {
                game: _throwBag(state.game, action.payload)
            }
        }
    }
})

export const { throwBag } = gameSlice.actions

export default gameSlice.reducer
