import {StyleSheet, TouchableOpacity} from 'react-native';

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
import {BasicCustomHeader} from "../../components/BasicCustomHeader";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

export default function ProfileScreen() {
    const lng = useAppSelector(selectI18n).language;
    const user = useAppSelector(selectUser);
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function toggleLanguage() {
            dispatch(changeLanguage(lng === 'es' ? 'en' : 'es'));
            await storage.saveString('language', lng === 'es' ? 'en' : 'es')
    }

    console.log(user.id);

    if (!user.id) {
        return <NotAuthenticatedScreen showSettingsIcon />
    }


    return (
        <YStack style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
            <BasicCustomHeader hideGoBackButton>
                <TouchableOpacity onPress={() => router.push('/settings')}>
                    <Ionicons name="settings-outline" size={24} color="black"/>
                </TouchableOpacity>
            </BasicCustomHeader>
                <ProfileHeader user={user} />
        </YStack>
    );
}

