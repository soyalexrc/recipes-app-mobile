import {TouchableOpacity, View} from "react-native";
import {Stack} from "expo-router/stack";
import {AlertDialog, Button, ScrollView, Text, XStack, YStack} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useRouter, useNavigation, useFocusEffect, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import * as React from "react";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deleteStep, resetRecipe, selectRecipe} from "../../../store/slices/recipe/recipeSlice";
import {ImagePicker, RecipeForm} from "../../../components/recipes";
import {Ionicons} from "@expo/vector-icons";
import {selectI18n} from "../../../store/slices/i18n/i18nSlice";
import {getDictionary} from "../../../i18n";
import {selectRecipeForm} from "../../../store/slices/recipe/recipeFormSlice";
import {selectNavigation, updateCurrent, updatePrev} from "../../../store/slices/navigation/navigationSlice";
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';


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
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const {id} = useLocalSearchParams<{ id: string }>();
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

    const {current, prev} = useAppSelector(selectNavigation);

    const onSubmit = handleSubmit((data) => console.log(data))

    useEffect(() => {
        dispatch(updatePrev(current))
        dispatch(updateCurrent('add-edit'))

        if (id === 'new') {
            if (prev === 'my-recipes') {
                dispatch(resetRecipe())
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
        }, 500)
    }, []);

    return (
        <SafeAreaView edges={['bottom']} style={{flex: 1}}>
            <Stack.Screen
                options={{
                    title: getDictionary(lng).recipeForm.newRecipe,
                    headerRight: props => <HeaderRight id={id} isOwner={id === recipeForm.userId}/>,
                    headerLeft: props => <HeaderBackButton  {...props} onPress={() => router.back()}/>
                }}
            />
            {
                loading &&
                <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                               entering={FadeIn} exiting={FadeOut}>
                    <Text>Loading...</Text>
                </Animated.View>
            }

            {
                !loading &&
                <Animated.View style={{ flex: 1 }} entering={FadeIn.springify().delay(200)}>
                    <ScrollView backgroundColor='#fff' flex={1}>
                        <ImagePicker/>
                        <YStack padding={20}>
                            <RecipeForm control={control} errors={errors} getValues={getValues} setValue={setValue}/>
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

                </Animated.View>
            }

        </SafeAreaView>
    )
}

function HeaderRight(props: { isOwner: boolean, id: number }) {
    const dispatch = useAppDispatch();

    if (!props.isOwner) {
        return;
    }

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
                                    onPress={() => dispatch(deleteStep(props.id))}
                                    theme="active">Accept</Button>
                            </AlertDialog.Action>
                        </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>

    )
}
