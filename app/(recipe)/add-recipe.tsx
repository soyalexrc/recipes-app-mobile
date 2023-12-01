import {View} from "react-native";
import {Stack} from "expo-router/stack";
import {Button, ScrollView, Text, YStack} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useRouter, useNavigation} from "expo-router";
import {ImagePicker, RecipeForm, RecipeSteps, RecipeIngredients} from "../../components/recipes";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import * as React from "react";
import {useAppSelector} from "../../store/hooks";
import {RootState} from "../../store";
import {selectAddRecipe} from "../../store/slices/recipe/addRecipeSlice";
import { useEffect} from "react";


export interface AddRecipeFormData {
    title: string;
    description: string;
}

export default function AddRecipeScreen() {
    const {title} = useAppSelector(selectAddRecipe);
    const router = useRouter();
    const navigation = useNavigation();
    const {
        register,
        setValue,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AddRecipeFormData>()
    const onSubmit = handleSubmit((data) => console.log(data))


    useEffect(() => {
        console.log(title);
        navigation.setOptions({
            title: title
        })
    }, [title]);



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
                <YStack padding={20}>
                    <RecipeForm control={control} errors={errors}/>
                    <RecipeIngredients/>
                    <RecipeSteps/>
                    <Button backgroundColor='lightgreen' onPress={onSubmit}>submit</Button>

                </YStack>
            </ScrollView>

        </SafeAreaView>
    )
}
