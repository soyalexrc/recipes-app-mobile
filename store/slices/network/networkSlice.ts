import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../index";
import {NetInfoState, NetInfoStateType} from "@react-native-community/netinfo";

interface InitialState {
    isConnected: boolean,
    type: string;
    details: NetworkDetails | {};
    isInternetReachable: boolean
}

interface NetworkDetails {
    carrier: string,
    cellularGeneration: string;
    isConnectionExpensive: boolean
}


const initialState: InitialState = {
    isConnected: false,
    type: NetInfoStateType.none,
    details: {},
    isInternetReachable: false
}


export const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        detectNetworkChanged: (state, action: PayloadAction<InitialState>) => {
            if (state.isConnected !== action.payload.isConnected) {
                state.isConnected = action.payload.isConnected;
                state.details = action.payload.details;
                state.type = action.payload.type;
                state.isInternetReachable = action.payload.isInternetReachable
            }
        }
    }
});

export const {
    detectNetworkChanged
} = networkSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNetwork = (state: RootState) => state.network

export default networkSlice.reducer
