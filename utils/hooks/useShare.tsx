import {useEffect, useState} from "react";
// import * as Sharing from 'expo-sharing';
import {Share} from 'react-native';

export function useShare() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    async function doTheMagic(url: string) {
        // const isAvailable = await Sharing.isAvailableAsync();
        //
        // if (!isAvailable) {
        //     return ;
        // }
        try {
            const result = await Share.share({
                url,
                title: 'sample title',
                message: 'sample message'
            });
            console.log(result);
            if (result.action === Share.sharedAction) {
                // shared with activivy type of result.activityType
            } else {
                // shared
            }
        } catch (e) {
            console.log(e)
        }

        // console.log(isAvailable);
    }

    return {
        success,
        error,
        share: (url: string) => doTheMagic(url)
    }
}
