import {Stack} from "expo-router/stack";
import { Text, View} from "react-native";
import {Link, useFocusEffect, useRouter} from "expo-router";
import {useState} from "react";

export default function Login() {
    const [redirect, setRedirect] = useState<boolean>(true);
    const router = useRouter();


    useFocusEffect(() => {
        if (redirect) {
            router.replace('/(tabs)');
        }
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Text>Login page</Text>
            <Link href='/(auth)/register' replace={false}>Register Screen</Link>
            <Link href='/(auth)/forgot-password' replace={false}>Forgot password Screen</Link>
            <Link href='/(tabs)' replace={true}>Tabs Screen</Link>
        </View>
    )
}
