import {RefreshControl, TouchableOpacity, View} from "react-native";
import {Stack} from "expo-router/stack";
import {Button, H3, H4, H5, H6, Image, Paragraph, ScrollView, Text, XStack, YStack} from "tamagui";
import {HeaderBackButton} from "@react-navigation/elements";
import {useFocusEffect, useLocalSearchParams, useNavigation, useRouter} from 'expo-router';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {FullRecipe, Step, Ingredient} from "../../../constants/interfaces/recipe";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {selectRecipe, setRecipe} from "../../../store/slices/recipe/recipeSlice";
import {selectUser} from "../../../store/slices/user/userSlice";
import {useShare} from "../../../utils/hooks";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {useEffect, useState} from "react";
import {getRecipeById} from "../../../utils/db";

const sampleData: FullRecipe = {
    id: '1',
    userId: '2',
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
    const navigation = useNavigation();
    const params = useLocalSearchParams<{ local: string, id: string }>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const currentRecipe = useAppSelector(selectRecipe);
    const {id} = useLocalSearchParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        getRecipe();
    }, []);

    async function getRecipe() {
        setLoading(true);
        const isLocalRecipe = JSON.parse(params.local);


        if (isLocalRecipe) {
            const recipe = await getRecipeById(id);
            if (recipe) {
                dispatch(setRecipe(recipe));
                navigation.setOptions({
                    title: sampleData.title
                })
            }
            setLoading(false)

        } else {
        //     handle online db
            dispatch(setRecipe(sampleData))
            navigation.setOptions({
                title: sampleData.title
            })
            setLoading(false)
        }


    }

    return (
        <SafeAreaView edges={['bottom']} style={{flex: 1}}>
            <Stack.Screen
                options={{
                    title: 'Recipe view',
                    headerRight: props => (
                        <HeaderRight isOwner={sampleData.userId === user.id} {...props} />),
                    headerLeft: props => (<HeaderBackButton {...props} onPress={() => router.back()}/>)
                }}
            />
            {
                loading &&
                <YStack flex={1} justifyContent='center' alignItems='center'>
                    <Text>Loading...</Text>
                </YStack>
            }
            {
                !loading && currentRecipe.id &&
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => {
                                setRefreshing(true)
                                getRecipe();
                                setTimeout(() => {
                                    setRefreshing(false)
                                }, 2000)
                            }}
                            refreshing={refreshing}
                        />
                    }
                    flex={1}
                    backgroundColor='#fff'
                >
                    <Animated.View entering={FadeIn.delay(200)}>
                        {/*    image*/}
                        <Image source={{uri: currentRecipe.image}} style={{width: '100%', height: 350}}/>


                        {/*  info  */}
                        <YStack padding={10} gap={10}>
                            <XStack alignItems='center' gap={10}>
                                <AntDesign name="like2" size={20} color="black"/>
                                <XStack gap={5}>
                                    <Paragraph fontWeight='900'>96 people</Paragraph>
                                    <Paragraph>like this</Paragraph>
                                </XStack>
                            </XStack>

                            <XStack gap={10}>
                                <AntDesign name="clockcircleo" size={20} color="black"/>
                                <XStack gap={2}>
                                    <Paragraph>ready in </Paragraph>
                                    <Paragraph fontWeight='900'>under {currentRecipe.estimatedTime}</Paragraph>

                                </XStack>
                            </XStack>
                        </YStack>

                        {/* ingredients */}

                        <YStack padding={10}>
                            <H4>Ingredients for</H4>
                            <Paragraph
                                fontSize={16}>{currentRecipe.amountOfPortions} {`${currentRecipe.typeOfPortion}${Number(currentRecipe.amountOfPortions) > 1 && 's'}`}</Paragraph>

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
                            <H4>Nutrition information</H4>
                            <YStack backgroundColor='lightgray' height={100} justifyContent='center' alignItems='center'>
                                <Paragraph>Under development...</Paragraph>
                            </YStack>
                        </YStack>

                        {/* Tips or comments */}
                        <YStack padding={10}>
                            <H4>Tips / Comments</H4>
                            <YStack backgroundColor='lightgray' height={100} justifyContent='center' alignItems='center'>
                                <Paragraph>Under development...</Paragraph>
                            </YStack>
                        </YStack>

                        {/*    Preparation*/}

                        <YStack paddingHorizontal={10} paddingVertical={20} backgroundColor='#f2f2f2'>
                            <H4>Preparation</H4>
                            <Button
                                marginVertical={10}
                                iconAfter={<Ionicons name="play" size={20} color="black"/>}
                                backgroundColor='lightblue'
                                onPress={() => router.push('/recipe/step-by-step-mode')}
                            >
                                Step-by-step mode
                            </Button>

                            <YStack marginVertical={10}>
                                {
                                    currentRecipe.steps.map((step: Step, index: number) => (
                                        <XStack gap={10} key={step.id} backgroundColor='#fff' padding={10} marginBottom={10}
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
            }
        </SafeAreaView>
    )
}

function HeaderRight(props: { isOwner: boolean }) {
    const router = useRouter();
    const {share} = useShare();

    return (
        <XStack gap={20}>
            <TouchableOpacity onPress={() => share('https://google.com')}>
                <Ionicons name="share-social" size={24} color="black"/>
            </TouchableOpacity>
            {
                props.isOwner &&
                <TouchableOpacity onPress={() => router.push('/recipe/add-edit/2')}>
                    <Ionicons name="pencil" size={24} color="black"/>
                </TouchableOpacity>
            }
            {
                !props.isOwner &&
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={24} color="black"/>
                </TouchableOpacity>
            }
        </XStack>
    )
}
