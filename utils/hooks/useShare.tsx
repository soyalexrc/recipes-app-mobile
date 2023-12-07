// import * as Sharing from 'expo-sharing';
import {Share} from 'react-native';

export function useShare() {

    async function doTheMagic(url: string) {
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
        share: (url: string) => doTheMagic(url)
    }
}
