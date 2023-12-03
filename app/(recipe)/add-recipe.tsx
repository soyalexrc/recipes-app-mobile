import {View} from "react-native";
import {Stack} from "expo-router/stack";
import {Button, ScrollView, Text, XStack, YStack} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useRouter, useNavigation, useFocusEffect} from "expo-router";
import {ImagePicker, RecipeForm, RecipeSteps, RecipeIngredients} from "../../components/recipes";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import * as React from "react";
import {useAppSelector} from "../../store/hooks";
import {RootState} from "../../store";
import {selectAddRecipe, selectRecipe} from "../../store/slices/recipe/recipeSlice";
import {useEffect} from "react";


export interface AddRecipeFormData {
    title: string;
    description: string;
    estimatedTime: string;
    amountOfPortions: string;
}

export default function AddRecipeScreen() {
    const title = useAppSelector(selectRecipe).title;
    const ingredients = useAppSelector(selectRecipe).ingredients;
    const steps = useAppSelector(selectRecipe).steps;
    const router = useRouter();
    const navigation = useNavigation();
    const {
        register,
        setValue,
        control,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm<AddRecipeFormData>({
        defaultValues: {}
    })
    const onSubmit = handleSubmit((data) => console.log(data))

    useFocusEffect(() => {
        navigation.setOptions({
            title: 'New Recipe'
        })
    })


    useEffect(() => {
        navigation.setOptions({
            title: title.length > 22 ? title.substring(0, 22).concat('...') : title
        })
    }, [title]);

    return (
        <SafeAreaView edges={['bottom']} style={{flex: 1}}>
            <ScrollView backgroundColor='#fff' f={1}>
                <Stack.Screen
                    options={{
                        title: 'New recipe',
                        headerLeft: props => (<HeaderBackButton {...props} onPress={() => router.back()}/>)
                    }}
                />
                <ImagePicker/>
                <YStack padding={20}>
                    <RecipeForm control={control} errors={errors} getValues={getValues} setValue={setValue}/>
                    <XStack gap={10} marginVertical={30}>
                        <Button flex={1} onPress={() => router.push('/(recipe)/ingredients')}>
                            <Text>
                                Ingredients ({ingredients.length})
                            </Text>
                        </Button>
                        <Button flex={1} onPress={() => router.push('/(recipe)/steps')}>
                            <Text>
                                Steps ({steps.length})
                            </Text>
                        </Button>
                    </XStack>
                    {/*<RecipeSteps/>*/}
                    <Button backgroundColor='lightgreen' onPress={onSubmit}>submit</Button>

                </YStack>
            </ScrollView>

        </SafeAreaView>
    )
}
