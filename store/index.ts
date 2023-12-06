import { configureStore } from '@reduxjs/toolkit'
// ...
import counterReducer from './slices/counter';
import recipeReducer from './slices/recipe/recipeSlice';
import userReducer from './slices/user/userSlice';
import i18nReducer from './slices/i18n/i18nSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        recipe: recipeReducer,
        user: userReducer,
        i18n: i18nReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
