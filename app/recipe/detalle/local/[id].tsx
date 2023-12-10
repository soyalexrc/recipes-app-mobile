import {Button, Text, YStack} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";

export default function LocalRecipeScreen() {
    const router = useRouter();
    return (
        <SafeAreaView>
            <YStack>
                <Text>local recipe</Text>
            </YStack>
            <Button onPress={() => router.back()}>go back</Button>
        </SafeAreaView>
    )
}
