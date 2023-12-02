import {createSlice, nanoid} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../'
import {v4 as uuid} from "uuid";

// Define a type for the slice state
interface AddRecipeSliceState {
    title: string;
    image: string;
    steps: any[],
    ingredients: any[]
}

export interface Ingredient {
    id?: string;
    quantity: string;
    measure: string;
    product: string;

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
        addNewIngredientToRecipe: (state, action: PayloadAction<Ingredient>) => {
            state.ingredients.push({
                ...action.payload,
                id: nanoid()
            })
        },
        editIngredient: (state, action: PayloadAction<Ingredient>) => {
            const index = state.ingredients.findIndex(x => x.id === action.payload.id);
            state.ingredients.splice(index, 1, action.payload);
        },
        deleteIngredientFromRecipe: (state, action: PayloadAction<number>) => {
            state.ingredients.splice(action.payload, 1);
        },
    },
})

export const {
    updateTitle,
    addNewIngredientToRecipe,
    deleteIngredientFromRecipe,
    editIngredient
} = addRecipeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAddRecipe = (state: RootState) => state.addRecipe

export default addRecipeSlice.reducer
