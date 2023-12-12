import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../index";
import {User} from "../../../constants/interfaces/user";

const initialState: User = {
    name: 'Pepito Perez',
    email: 'pepitoperez@gmail.com',
    likes: 10,
    recipes: 11,
    tips: 10,
    image: '',
    id: '2',
    token: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
});

export const {} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer

