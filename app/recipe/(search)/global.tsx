import {View} from "react-native";
import {Text} from "tamagui";
import {Stack} from "expo-router/stack";
import {HeaderBackButton} from "@react-navigation/elements";
import * as React from "react";
import {useRouter} from "expo-router";

export default function GlobalSearchScreen() {
    const router = useRouter();
    return (
        <View>
            <Stack.Screen options={{
                headerLeft: props => (<HeaderBackButton {...props} onPress={() => router.back()}/>)
            }}
            />
            <Text>
                global search
            </Text>
        </View>
    )
}
