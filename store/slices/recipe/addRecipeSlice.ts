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

export interface Step {
    id?: string;
    title: string;
    description: string;
    image?: string;
}

// Define the initial state using that type
const initialState: AddRecipeSliceState = {
    title: '',
    image: '',
    steps: [
        {
            id: '1',
            image: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Pre cook the oven',
            description: 'this is the process sample'
        },
        {
            id: '2',
            image: '',
            title: 'Put your hands on the mass',
            description: 'lorem ipsum'
        },
        {
            id: '3',
            image: '',
            title: 'Let the magic happend while it is cooked',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n' +
                '\n'
        }
    ],
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
        addNewStep: (state, action: PayloadAction<Step>) => {
            state.steps.push({
                ...action.payload,
                id: nanoid()
            })
        },
        editStep: (state, action: PayloadAction<Step>) => {
            const index = state.steps.findIndex(x => x.id === action.payload.id);
            state.steps.splice(index, 1, action.payload);
        },
        deleteStep: (state, action: PayloadAction<number>) => {
            console.log(action.payload)
            state.steps.splice(action.payload, 1);
        }
    },
})

export const {
    updateTitle,
    addNewIngredientToRecipe,
    deleteIngredientFromRecipe,
    editIngredient,
    addNewStep,
    editStep,
    deleteStep
} = addRecipeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAddRecipe = (state: RootState) => state.addRecipe

export default addRecipeSlice.reducer
