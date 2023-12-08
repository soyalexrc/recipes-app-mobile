
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../'

// Define a type for the slice state
interface NavigationState {
    prev: NavigationRoute;
    current: NavigationRoute;
}

type NavigationRoute = 'my-recipes' | 'steps' | 'ingredients' | 'step-by-step' | 'detail' | 'add-edit' | ''

// Define the initial state using that type
const initialState: NavigationState = {
    prev: '',
    current: '',
}

export const navigationSlice = createSlice({
    name: 'navigation',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updatePrev: (state, action: PayloadAction<NavigationRoute>) => {
            state.prev = action.payload;
        },
        updateCurrent: (state, action: PayloadAction<NavigationRoute>) => {
            state.current = action.payload;
        }
    },
})

export const { updatePrev, updateCurrent } = navigationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNavigation = (state: RootState) => state.navigation

export default navigationSlice.reducer
