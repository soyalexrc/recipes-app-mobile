import {RefreshControl, TouchableOpacity, View} from "react-native";
import {Stack} from "expo-router/stack";
import {Button, H2, H4, Image, Paragraph, ScrollView, Text, XStack, YStack} from "tamagui";
import { useLocalSearchParams, useNavigation, useRouter} from 'expo-router';
import {AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import * as React from "react";
import { useSafeAreaInsets} from "react-native-safe-area-context";
import {FullRecipe, Step, Ingredient} from "../../../constants/interfaces/recipe";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {selectRecipe, setRecipe} from "../../../store/slices/recipe/recipeSlice";
import {selectUser} from "../../../store/slices/user/userSlice";
import {useShare} from "../../../utils/hooks";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {useEffect, useState} from "react";
import {getRecipeById} from "../../../utils/db";
import {setRecipeForm} from "../../../store/slices/recipe/recipeFormSlice";
import {selectI18n} from "../../../store/slices/i18n/i18nSlice";
import {getDictionary} from "../../../i18n";

const sampleData: FullRecipe = {
    id: '1',
    userId: '2',
    localId: '123123',
    title: 'Pan de jamon',
    category: 'Dinner',
    description: 'Tradicion venezolana en todo su esplendor',
    estimatedTime: '90 min',
    typeOfPortion: 'Slice',
    amountOfPortions: '10',
    image: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    steps: [
        {
            id: '1',
            image: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Pre cook the oven',
            description: 'this is the process sample'
        },
        {
            id: '2',
            image: '',
            title: 'Put your hands on the mass',
            description: 'lorem ipsum'
        },
        {
            id: '3',
            image: '',
            title: 'Let the magic happend while it is cooked',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n' +
                '\n'
        }
    ],
    ingredients: [
        {
            id: '1',
            product: 'Harina de trigo',
            quantity: '900',
            measure: 'grs'
        },
        {
            id: '2',
            product: 'Mantequilla',
            quantity: '500',
            measure: 'gr'
        },
        {
            id: '3',
            product: 'Leche entera',
            quantity: '500',
            measure: 'ml'
        },
        {
            id: '4',
            product: 'Sal',
            quantity: '10',
            measure: 'gr'
        },
        {
            id: '5',
            product: 'Azucar',
            quantity: '200',
            measure: 'gr'
        },
        {
            id: '6',
            product: 'Vainilla',
            quantity: '1',
            measure: 'Chorrito'
        }
    ]
}


export default function RecipeViewScreen() {
    const router = useRouter();
    const {share} = useShare();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const params = useLocalSearchParams<{ local: string, id: string }>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const lng = useAppSelector(selectI18n).language;
    const currentRecipe = useAppSelector(selectRecipe);
    const {id} = useLocalSearchParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getRecipe(true);
    }, []);

    async function getRecipe(isFirstCall: boolean) {
        if (isFirstCall) {
            setLoading(true);
        } else {
            setRefreshing(true)
        }
        const isLocalRecipe = JSON.parse(params.local);

        if (isLocalRecipe) {
            const recipe = await getRecipeById(id, user.id!);
            if (recipe) {
                dispatch(setRecipe(recipe));
                navigation.setOptions({
                    title: sampleData.title
                })
            }
            if (isFirstCall) {
                setLoading(false);
            } else {
                setRefreshing(false)
            }

        } else {
            //     handle online db
            dispatch(setRecipe(sampleData))
            navigation.setOptions({
                title: sampleData.title
            })
            if (isFirstCall) {
                setLoading(false);
            } else {
                setRefreshing(false)
            }
        }
    }

    function goToEdit() {
        dispatch(setRecipeForm(currentRecipe));
        router.push(`/recipe/add-edit/${id}`)
    }

    return (
        <View style={{flex: 1, paddingTop: insets.top, backgroundColor: '#fff'}}>
            <Stack.Screen
                options={{title: 'Recipe view'}}
            />
            {
                loading &&
                <YStack flex={1} justifyContent='center' alignItems='center'>
                    <Text>{getDictionary(lng).common.loading}...</Text>
                </YStack>
            }
            {
                !loading && (currentRecipe.localId || currentRecipe._id) &&
                <>
                    <XStack padding={15} justifyContent='space-between' alignItems='center'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="black"/>
                        </TouchableOpacity>
                        {/*<H4 alignSelf='center'>Pan de jamon venezolano </H4>*/}
                        <XStack gap={20}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name={currentRecipe._id ? 'publish-off' : 'publish'} size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => share('https://google.com')}>
                                <Ionicons name="share-social" size={24} color="black"/>
                            </TouchableOpacity>
                            {
                                sampleData.userId === user.id &&
                                <TouchableOpacity onPress={goToEdit}>
                                    <Ionicons name="pencil" size={24} color="black"/>
                                </TouchableOpacity>
                            }
                            {
                                sampleData.userId !== user.id &&
                                <TouchableOpacity>
                                    <Ionicons name="heart-outline" size={24} color="black"/>
                                </TouchableOpacity>
                            }
                        </XStack>

                    </XStack>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                onRefresh={() => {
                                    getRecipe(false);
                                }}
                                refreshing={refreshing}
                            />
                        }
                        flex={1}
                        backgroundColor='#fff'
                    >
                        <Animated.View entering={FadeIn.delay(200)}>
                            <YStack padding={10}>
                                <H2>{currentRecipe.title}</H2>
                                <Paragraph>
                                    {currentRecipe.description}
                                </Paragraph>
                            </YStack>

                            {/*    image*/}
                            <Image source={{uri: currentRecipe.image}} style={{width: '100%', height: 350}}/>


                            {/*  info  */}
                            <YStack padding={10} gap={10}>
                                <XStack alignItems='center' gap={10}>
                                    <AntDesign name="like2" size={20} color="black"/>
                                    <XStack gap={5}>
                                        <Paragraph fontWeight='900'>96 {getDictionary(lng).recipeDetail.people}</Paragraph>
                                        <Paragraph>{getDictionary(lng).recipeDetail.likeThis}</Paragraph>
                                    </XStack>
                                </XStack>

                                <XStack gap={10}>
                                    <AntDesign name="clockcircleo" size={20} color="black"/>
                                    <XStack gap={2}>
                                        <Paragraph>{getDictionary(lng).recipeDetail.readyIn} </Paragraph>
                                        <Paragraph fontWeight='900'>{getDictionary(lng).recipeDetail.under} {currentRecipe.estimatedTime}</Paragraph>
                                    </XStack>
                                </XStack>
                            </YStack>

                            {/* ingredients */}

                            <YStack padding={10}>
                                <H4>{getDictionary(lng).recipeDetail.ingredientsFor}</H4>
                                <Paragraph
                                    fontSize={16}>{currentRecipe.amountOfPortions} {`${currentRecipe.typeOfPortion}${Number(currentRecipe.amountOfPortions) > 1 ? 's' : ''}`}</Paragraph>

                                <YStack marginVertical={20}>
                                    {
                                        currentRecipe.ingredients.map((ingredient: Ingredient) => (
                                            <XStack
                                                justifyContent='space-between'
                                                alignItems='center'
                                                padding={5}
                                                key={ingredient.id}
                                                borderBottomColor='black'
                                                borderBottomWidth={0.2}
                                            >
                                                <Paragraph>{ingredient.product}</Paragraph>
                                                <Paragraph
                                                    fontWeight='900'>{ingredient.quantity} {ingredient.measure}</Paragraph>
                                            </XStack>
                                        ))
                                    }
                                </YStack>
                            </YStack>

                            {/*    Nutrition information*/}
                            <YStack padding={10}>
                                <H4>{getDictionary(lng).recipeDetail.nutritionInformation}</H4>
                                <YStack backgroundColor='lightgray' height={100} justifyContent='center'
                                        alignItems='center'>
                                    <Paragraph>{getDictionary(lng).common.underDevelopment}...</Paragraph>
                                </YStack>
                            </YStack>

                            {/* Tips or comments */}
                            <YStack padding={10}>
                                <H4>{getDictionary(lng).recipeDetail.tipsAndComments}</H4>
                                <YStack backgroundColor='lightgray' height={100} justifyContent='center'
                                        alignItems='center'>
                                    <Paragraph>{getDictionary(lng).common.underDevelopment}...</Paragraph>
                                </YStack>
                            </YStack>

                            {/*    Preparation*/}

                            <YStack paddingHorizontal={10} paddingVertical={20} backgroundColor='#f2f2f2'>
                                <H4>{getDictionary(lng).recipeDetail.preparation}</H4>
                                <Button
                                    marginVertical={10}
                                    iconAfter={<Ionicons name="play" size={20} color="black"/>}
                                    backgroundColor='lightblue'
                                    onPress={() => router.push('/recipe/step-by-step-mode')}
                                >
                                    {getDictionary(lng).recipeDetail.stepByStepMode}
                                </Button>

                                <YStack marginVertical={10}>
                                    {
                                        currentRecipe.steps.map((step: Step, index: number) => (
                                            <XStack gap={10} key={step.id} backgroundColor='#fff' padding={10}
                                                    marginBottom={10}
                                                    borderRadius={10}>
                                                <H4>{index + 1}.</H4>
                                                <YStack flex={1}>
                                                    <H4 fontSize={18} marginBottom={5}>{step.title}</H4>
                                                    {
                                                        step.image &&
                                                        <Image source={{uri: step.image}} style={{
                                                            width: '100%',
                                                            height: 200,
                                                            borderRadius: 12,
                                                            marginBottom: 10
                                                        }}/>
                                                    }
                                                    <Paragraph>{step.description}</Paragraph>
                                                </YStack>
                                            </XStack>
                                        ))
                                    }
                                </YStack>

                            </YStack>

                        </Animated.View>
                    </ScrollView>
                </>

            }
        </View>
    )
}
