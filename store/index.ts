import { configureStore } from '@reduxjs/toolkit'
// ...
import navigationReducer from './slices/navigation/navigationSlice';
import recipeReducer from './slices/recipe/recipeSlice';
import recipeFormReducer from './slices/recipe/recipeFormSlice';
import userReducer from './slices/user/userSlice';
import i18nReducer from './slices/i18n/i18nSlice';

export const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        recipe: recipeReducer,
        user: userReducer,
        i18n: i18nReducer,
        recipeForm: recipeFormReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
