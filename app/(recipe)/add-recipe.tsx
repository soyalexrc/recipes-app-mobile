import {View} from "react-native";
import {Stack} from "expo-router/stack";
import {Text, YStack} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useRouter} from "expo-router";
import {ImagePicker, RecipeForm, RecipeIngredients, RecipeSteps} from "../../components/recipes";

export default function AddRecipeScreen() {
    const router = useRouter();
    return (
        <YStack backgroundColor='#fff' f={1}>
            <Stack.Screen
                options={{
                    title: 'New recipe',
                    headerLeft: props => (<HeaderBackButton {...props} onPress={() => router.back()} />)
                }}
            />
            <ImagePicker />
            <RecipeForm />
            <RecipeIngredients />
            <RecipeSteps />
        </YStack>
    )
}
