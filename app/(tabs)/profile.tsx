import {StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import {ProfileHeader, TopTabs} from "../../components/profile";
import {Button, YStack} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeLanguage, selectI18n } from '../../store/slices/i18n/i18nSlice';
import * as storage from '../../utils/storage';

export default function ProfileScreen() {
    const lng = useAppSelector(selectI18n).language;
    const dispatch = useAppDispatch();

    async function toggleLanguage() {
            dispatch(changeLanguage(lng === 'es' ? 'en' : 'es'));
            await storage.saveString('language', lng === 'es' ? 'en' : 'es')
    }


    return (
        <SafeAreaView>
            <YStack>
                <ProfileHeader/>
                <TopTabs />
                <Button onPress={toggleLanguage}>Toggle languages</Button>
            </YStack>
        </SafeAreaView>
    );
}

