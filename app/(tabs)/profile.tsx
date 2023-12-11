import {StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import {ProfileHeader, TopTabs} from "../../components/profile";
import {Button, YStack} from "tamagui";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeLanguage, selectI18n } from '../../store/slices/i18n/i18nSlice';
import * as storage from '../../utils/storage';
import {selectUser} from "../../store/slices/user/userSlice";
import {NotAuthenticatedScreen} from "../../components/shared";

export default function ProfileScreen() {
    const lng = useAppSelector(selectI18n).language;
    const user = useAppSelector(selectUser);
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    async function toggleLanguage() {
            dispatch(changeLanguage(lng === 'es' ? 'en' : 'es'));
            await storage.saveString('language', lng === 'es' ? 'en' : 'es')
    }

    console.log(user.id);

    if (!user.id) {
        return <NotAuthenticatedScreen />
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
            <YStack>
                <ProfileHeader user={user} />
                <Button onPress={toggleLanguage}>Toggle languages</Button>
            </YStack>
        </View>
    );
}

