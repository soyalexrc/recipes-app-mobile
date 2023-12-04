import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../index";
import {User} from "../../../constants/interfaces/user";

const initialState: User = {
    name: 'Alex Rodriguez',
    email: 'alexcarvajal2404@gmail.com',
    likes: '2400',
    recipes: '234',
    tips: '112',
    image: '',
    id: '2',
    token: 'asd123klashljkd12hj3gk',
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

