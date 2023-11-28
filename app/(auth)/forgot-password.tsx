import {Text, View} from "react-native";
import {Stack} from "expo-router/stack";

export default function ForgotPassword() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen />
            <Text>Forgot passowrd page</Text>
        </View>
    )
}
