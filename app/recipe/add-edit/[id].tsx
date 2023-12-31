import {TouchableOpacity, View} from "react-native";
import {Stack} from "expo-router/stack";
import {AlertDialog, Button, ScrollView, Text, XStack, YStack} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useRouter, useNavigation, useFocusEffect, useLocalSearchParams} from "expo-router";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import * as React from "react";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deleteStep, resetRecipe, selectRecipe, setRecipe} from "../../../store/slices/recipe/recipeSlice";
import {ImagePicker, RecipeForm} from "../../../components/recipes";
import {Ionicons} from "@expo/vector-icons";
import {selectI18n} from "../../../store/slices/i18n/i18nSlice";
import {getDictionary} from "../../../i18n";
import {resetRecipeForm, selectRecipeForm} from "../../../store/slices/recipe/recipeFormSlice";
import {selectNavigation, updateCurrent, updatePrev} from "../../../store/slices/navigation/navigationSlice";
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {createRecipe, deleteRecipeById, updateRecipe} from "../../../utils/db";
import {nanoid} from "@reduxjs/toolkit";
import {addOneRecipe, deleteLocalRecipeById, editLocalRecipe} from "../../../store/slices/recipe/localRecipesSlice";
import {BasicCustomHeader} from "../../../components/BasicCustomHeader";
import {selectUser} from "../../../store/slices/user/userSlice";


export interface AddRecipeFormData {
    title: string;
    description: string;
    estimatedTime: string;
    amountOfPortions: string;
    typeOfPortion: string;
    category: string;
}

export default function AddEditRecipeScreen() {
    const recipeForm = useAppSelector(selectRecipeForm);
    const lng = useAppSelector(selectI18n).language;
    const user = useAppSelector(selectUser);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(true);
    const {id} = useLocalSearchParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const {
        setValue,
        control,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm<AddRecipeFormData>({
        defaultValues: {}
    })

    const {current, prev} = useAppSelector(selectNavigation);

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (id === 'new') {
                // case create new
                const newRecipe = {
                    ...data,
                    localId: nanoid(),
                    userId: '2',
                    steps: recipeForm.steps,
                    ingredients: recipeForm.ingredients,
                    image: recipeForm.image,
                }
                const newId = await createRecipe(newRecipe, user.id);

                dispatch(addOneRecipe({
                    ...newRecipe,
                    id: newId
                }));
                router.back();
            } else {
                // case create new
                const editedRecipe = {
                    ...data,
                    id: recipeForm.id,
                    localId: recipeForm.localId,
                    userId: recipeForm.userId,
                    steps: JSON.stringify(recipeForm.steps) as any,
                    ingredients: JSON.stringify(recipeForm.ingredients) as any,
                    image: recipeForm.image,
                }
                await updateRecipe(id, editedRecipe);

                dispatch(editLocalRecipe(editedRecipe));
                dispatch(setRecipe({
                    ...editedRecipe,
                    ingredients: JSON.parse(editedRecipe.ingredients),
                    steps: JSON.parse(editedRecipe.steps)
                }));
                router.back();
            }
        } catch (error) {
            console.log(error);
        }


    })

    async function deleteRecipe(id: string | number) {
        const deletedRecipe = await deleteRecipeById(id);

        if (deletedRecipe) {
            dispatch(deleteLocalRecipeById(id));
            router.replace('/(tabs)/my-recipes');
        }
    }

    useEffect(() => {
        dispatch(updatePrev(current))
        dispatch(updateCurrent('add-edit'))

        if (id === 'new') {
            if (prev === 'my-recipes') {
                dispatch(resetRecipeForm())
            }
            navigation.setOptions({
                title: getDictionary(lng).recipeForm.newRecipe
            })
        } else {
            navigation.setOptions({
                title: recipeForm.title
            })
            setValue('title', recipeForm.title);
            setValue('typeOfPortion', recipeForm.typeOfPortion);
            setValue('amountOfPortions', recipeForm.amountOfPortions);
            setValue('description', recipeForm.description);
            setValue('estimatedTime', recipeForm.estimatedTime);
            setValue('category', recipeForm.category);
        }
    }, []);


    useEffect(() => {
        navigation.setOptions({
            title: recipeForm.title.length > 22 ? recipeForm.title.substring(0, 22).concat('...') : recipeForm.title
        })
    }, [recipeForm.title]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 10)
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: insets.top}}>
            <BasicCustomHeader title={id === 'new' ? 'Nueva receta' : getValues('title')}>
                {
                    id !== 'new' &&
                    <DeleteButton action={() => deleteRecipe(id)} />
                }
            </BasicCustomHeader>
            <ScrollView backgroundColor='#fff' flex={1}>
                <ImagePicker/>
                <YStack padding={20}>
                    {loading &&
                        <Animated.View style={{flex: 1, height: 500, justifyContent: 'center', alignItems: 'center'}}
                                       entering={FadeIn} exiting={FadeOut}>
                            <Text>Loading...</Text>
                        </Animated.View>
                    }
                    {
                        !loading &&
                        <Animated.View style={{flex: 1}} entering={FadeIn.springify().delay(200)}>
                            <RecipeForm control={control} errors={errors} getValues={getValues}
                                        setValue={setValue}/>
                        </Animated.View>

                    }
                    <Button marginVertical={20} flex={1} onPress={() => router.push('/recipe/ingredients')}>
                        <Text>
                            {getDictionary(lng).recipeForm.ingredientsLabel} ({recipeForm.ingredients.length})
                        </Text>
                    </Button>
                    <Button marginBottom={20} flex={1} onPress={() => router.push('/recipe/steps')}>
                        <Text>
                            {getDictionary(lng).recipeForm.stepsLabel} ({recipeForm.steps.length})
                        </Text>
                    </Button>
                    {/*<RecipeSteps/>*/}
                    <Button backgroundColor='lightgreen'
                            onPress={onSubmit}>{getDictionary(lng).recipeForm.submitLabel}</Button>

                </YStack>
            </ScrollView>


        </View>
    )
}

function DeleteButton(props: { action: () => void }) {
    return (
        <AlertDialog>
            <AlertDialog.Trigger asChild>
                <TouchableOpacity>
                    <Ionicons name="trash" size={24} color="red"/>
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
                                    onPress={props.action}
                                    theme="active">Accept</Button>
                            </AlertDialog.Action>
                        </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>

    )
}
