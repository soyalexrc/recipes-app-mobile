import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {TamaguiProvider} from "tamagui";
import config from '../tamagui.config';
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {store} from "../store";
import 'react-native-gesture-handler';


export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Inter: require('../assets/fonts/Inter-Regular.ttf'),
        InterBold: require('../assets/fonts/Inter-Bold.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <TamaguiProvider config={config}>
                    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                            <Stack.Screen name="recipe" options={{headerShown: false}}/>
                            <Stack.Screen name="modal" options={{presentation: 'modal'}}/>
                        </Stack>
                    </SafeAreaProvider>
                </TamaguiProvider>
            </ThemeProvider>
        </Provider>
    );
}
