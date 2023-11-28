import {View} from "react-native";
import {Stack} from "expo-router/stack";
import {Text} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useRouter} from 'expo-router';

export default function RecipeViewScreen() {
    const router = useRouter();
    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Recipe view',
                    headerLeft: props => (<HeaderBackButton {...props} onPress={() => router.back()} />)
                }}
            />
            <Text>hello</Text>
        </View>
    )
}
