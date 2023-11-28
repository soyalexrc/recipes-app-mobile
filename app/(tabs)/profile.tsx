import {StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import {ProfileHeader, TopTabs} from "../../components/profile";
import {YStack} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ProfileScreen() {
    return (
        <SafeAreaView>
            <YStack>
                <ProfileHeader/>
                <TopTabs />
            </YStack>
        </SafeAreaView>
    );
}

