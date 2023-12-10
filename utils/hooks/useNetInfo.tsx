import { useEffect } from 'react';
import NetInfo, {NetInfoState, NetInfoUnknownState} from '@react-native-community/netinfo';
import {useAppDispatch} from "../../store/hooks";
import {detectNetworkChanged} from "../../store/slices/network/networkSlice";

export const useNetInfo = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            dispatch(detectNetworkChanged(state as any))
        });
        return () => {
            unsubscribe();
        }
    }, []);
};
