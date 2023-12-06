import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Platform, Pressable, Text, useColorScheme, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { useAppSelector } from '../../store/hooks';
import { selectI18n } from '../../store/slices/i18n/i18nSlice';
import { getDictionary } from '../../i18n';

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
                    title: getDictionary(lng).myRecipes.title,
                    tabBarIcon: ({color}) => <TabBarIcon name="newspaper-outline" color={color}/>,
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({pressed}) => (
                                    <FontAwesome
                                        name="search"
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="discovery"
                options={{
                    title: 'Discovery',
                    tabBarIcon: ({color}) => <TabBarIcon name="search" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    title: 'Community',
                    tabBarIcon: ({color}) => <TabBarIcon name="people" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({color}) => <TabBarIcon name="person-circle-outline" color={color}/>,
                }}
            />
        </Tabs>
    );
}
