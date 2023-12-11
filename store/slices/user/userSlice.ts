import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../index";
import {User} from "../../../constants/interfaces/user";

const initialState: User = {
    name: '',
    email: '',
    likes: 0,
    recipes: 0,
    tips: 0,
    image: '',
    id: null,
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

