import { configureStore, createAction } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import currentTossReducer from './currentTossSlice'

const store = configureStore({
    reducer: {
        game: gameReducer,
        currentToss: currentTossReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
