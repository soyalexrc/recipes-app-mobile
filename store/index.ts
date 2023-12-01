import { configureStore } from '@reduxjs/toolkit'
// ...
import counterReducer from './slices/counter';
import addRecipeReducer from './slices/recipe/addRecipeSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        addRecipe: addRecipeReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
