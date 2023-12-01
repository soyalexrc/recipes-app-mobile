import {View} from "react-native";
import {Stack} from "expo-router/stack";
import {ScrollView, Text, YStack} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useRouter} from "expo-router";
import {ImagePicker, RecipeForm, RecipeIngredients, RecipeSteps} from "../../components/recipes";
import {SafeAreaView} from "react-native-safe-area-context";

export default function AddRecipeScreen() {
    const router = useRouter();
    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
            <ScrollView backgroundColor='#fff' f={1}>
                <Stack.Screen
                    options={{
                        title: 'New recipe',
                        headerLeft: props => (<HeaderBackButton {...props} onPress={() => router.back()}/>)
                    }}
                />
                <ImagePicker/>
                <YStack padding={10}>
                    <RecipeForm/>
                    <RecipeIngredients/>
                    <RecipeSteps/>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    )
}
