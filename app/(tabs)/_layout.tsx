import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Platform, Pressable, Text, useColorScheme, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { useAppSelector } from '../../store/hooks';
import { selectI18n } from '../../store/slices/i18n/i18nSlice';
import { getDictionary } from '../../i18n';
import {HeaderSearch} from "../../components/recipes";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}) {
    return <Ionicons size={28} style={{marginBottom: -3}} {...props} />;
}


export default function TabLayout() {
    const colorScheme = useColorScheme();
    const lng = useAppSelector(selectI18n).language;

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: Platform.OS === 'android' ? 60 : 80,
                    paddingBottom: Platform.OS === 'android' ? 5 : 30,
                },
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: getDictionary(lng).discovery.pageTitle,
                    tabBarIcon: ({color}) => <TabBarIcon name="search" color={color}/>,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="my-recipes"
                options={{
                    headerShown: false,
                    title: getDictionary(lng).myRecipes.pageTitle,
                    tabBarIcon: ({color}) => <TabBarIcon name="newspaper-outline" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    title: getDictionary(lng).community.pageTitle,
                    tabBarIcon: ({color}) => <TabBarIcon name="people" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: getDictionary(lng).profile.pageTitle,
                    headerShown: false,
                    tabBarIcon: ({color}) => <TabBarIcon name="person-circle-outline" color={color}/>,
                }}
            />
        </Tabs>
    );
}
