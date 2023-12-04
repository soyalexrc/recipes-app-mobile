import {TouchableOpacity, View} from "react-native";
import {Stack} from "expo-router/stack";
import {AlertDialog, Button, ScrollView, Text, XStack, YStack} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useRouter, useNavigation, useFocusEffect, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import * as React from "react";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deleteStep, resetRecipe, selectRecipe} from "../../../store/slices/recipe/recipeSlice";
import {ImagePicker, RecipeForm} from "../../../components/recipes";
import {Ionicons} from "@expo/vector-icons";



export interface AddRecipeFormData {
    title: string;
    description: string;
    estimatedTime: string;
    amountOfPortions: string;
    typeOfPortion: string;
    category: string;
}

export default function AddEditRecipeScreen() {
    const recipe = useAppSelector(selectRecipe);
    const router = useRouter();
    const {id} = useLocalSearchParams<{id: string}>();
    const dispatch = useAppDispatch();
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
        if (id === 'new') {
            dispatch(resetRecipe())
            navigation.setOptions({
                title: 'New Recipe'
            })
        } else {
            navigation.setOptions({
                title: recipe.title
            })
            setValue('title', recipe.title);
            setValue('typeOfPortion', recipe.typeOfPortion);
            setValue('amountOfPortions', recipe.amountOfPortions);
            setValue('description', recipe.description);
            setValue('estimatedTime', recipe.estimatedTime);
            setValue('category', recipe.category);
        }
    })



    useEffect(() => {
        navigation.setOptions({
            title: recipe.title.length > 22 ? recipe.title.substring(0, 22).concat('...') : recipe.title
        })
    }, [recipe.title]);

    return (
        <SafeAreaView edges={['bottom']} style={{flex: 1}}>
            <ScrollView backgroundColor='#fff' f={1}>
                <Stack.Screen
                    options={{
                        title: 'New recipe',
                        headerRight: props => <HeaderRight isOwner={id === recipe.userId} />,
                        headerLeft: props => <HeaderBackButton {...props} onPress={() => router.back()}/>
                    }}
                />
                <ImagePicker/>
                <YStack padding={20}>
                    <RecipeForm control={control} errors={errors} getValues={getValues} setValue={setValue}/>
                    <Button marginVertical={20} flex={1} onPress={() => router.push('/recipe/ingredients')}>
                        <Text>
                            Ingredients ({recipe.ingredients.length})
                        </Text>
                    </Button>
                    <Button marginBottom={20} flex={1} onPress={() => router.push('/recipe/steps')}>
                        <Text>
                            Steps ({recipe.steps.length})
                        </Text>
                    </Button>
                    {/*<RecipeSteps/>*/}
                    <Button backgroundColor='lightgreen' onPress={onSubmit}>submit</Button>

                </YStack>
            </ScrollView>

        </SafeAreaView>
    )
}

function HeaderRight(props: { isOwner: boolean }) {
    if (!props.isOwner) {
        return;
    }

    return (
        <AlertDialog>
            <AlertDialog.Trigger asChild>
                <TouchableOpacity>
                    <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    key="overlay"
                    animation="quick"
                    opacity={0.5}
                    enterStyle={{opacity: 0}}
                    exitStyle={{opacity: 0}}
                />
                <AlertDialog.Content
                    marginHorizontal={20}
                    bordered
                    elevate
                    key="content"
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{x: 0, y: -20, opacity: 0, scale: 0.9}}
                    exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
                    x={0}
                    scale={1}
                    opacity={1}
                    y={0}
                >
                    <YStack space>
                        <AlertDialog.Title>Delete
                            recipe?</AlertDialog.Title>
                        <AlertDialog.Description>
                            By pressing yes, you accept deleting the recipe.
                        </AlertDialog.Description>

                        <XStack space="$3" justifyContent="flex-end">
                            <AlertDialog.Cancel asChild>
                                <Button>Cancel</Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <Button
                                    onPress={() => dispatch(deleteStep(index))}
                                    theme="active">Accept</Button>
                            </AlertDialog.Action>
                        </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>

    )
}
