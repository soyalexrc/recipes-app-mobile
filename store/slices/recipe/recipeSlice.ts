import {createSlice, nanoid} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../'
import {v4 as uuid} from "uuid";
import {AddRecipeSliceState, FullRecipe, Ingredient, Step} from "../../../constants/interfaces/recipe";

// Define a type for the slice state


// Define the initial state using that type
const initialState: FullRecipe = {
    title: '',
    amountOfPortions: '',
    description: '',
    estimatedTime: '',
    image: '',
    steps: [],
    ingredients: [],
    typeOfPortion: '',
    category: '',
    id: null,
    userId: null
}

export const recipeSlice = createSlice({
    name: 'recipe',
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
        },
        setRecipe: (state, action: PayloadAction<FullRecipe>) => {
            const {
                amountOfPortions,
                title,
                estimatedTime,
                ingredients,
                steps,
                image,
                description,
                userId,
                id,
                typeOfPortion,
                category
            } = action.payload;

            state.ingredients = ingredients;
            state.amountOfPortions = amountOfPortions;
            state.description = description;
            state.title = title;
            state.estimatedTime = estimatedTime;
            state.steps = steps;
            state.image = image;
            state.category = category;
            state.userId = userId;
            state.id = id,
            state.typeOfPortion = typeOfPortion
        },
        resetRecipe: () =>  initialState,
    }
})

export const {
    updateTitle,
    addNewIngredientToRecipe,
    deleteIngredientFromRecipe,
    editIngredient,
    addNewStep,
    editStep,
    deleteStep,
    setRecipe,
    resetRecipe
} = recipeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectRecipe = (state: RootState) => state.recipe

export default recipeSlice.reducer
