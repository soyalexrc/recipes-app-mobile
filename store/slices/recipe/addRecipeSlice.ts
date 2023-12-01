
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../'

// Define a type for the slice state
interface AddRecipeSliceState {
    title: string;
    image: string;
    steps: any[],
    ingredients: any[]
}

// Define the initial state using that type
const initialState: AddRecipeSliceState = {
    title: '',
    image: '',
    steps: [],
    ingredients: []
}

export const addRecipeSlice = createSlice({
    name: 'addRecipe',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        updateTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
    },
})

export const { updateTitle } = addRecipeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAddRecipe = (state: RootState) => state.addRecipe

export default addRecipeSlice.reducer
