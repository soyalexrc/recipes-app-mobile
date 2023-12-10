import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../index";
import {FullRecipe} from "../../../constants/interfaces/recipe";


const initialState: { list: FullRecipe[] } = {
    list: [],
}


export const localRecipesSlice = createSlice({
    name: 'localRecipes',
    initialState,
    reducers: {
        setDataToList: (state, action: PayloadAction<FullRecipe[]>) => {
            state.list = action.payload;
        },
        addOneRecipe: (state, action: PayloadAction<FullRecipe>) => {
            state.list.push(action.payload);
        },
        removeOneRecipe: (state, action:PayloadAction<string>) => {
            const id = action.payload;
            const index = state.list.findIndex(r => r.id === id);
            state.list.splice(index, 1);
        }
    }
});

export const {
    setDataToList,
    addOneRecipe,
    removeOneRecipe
} = localRecipesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLocalRecipes = (state: RootState) => state.localRecipes

export default localRecipesSlice.reducer
