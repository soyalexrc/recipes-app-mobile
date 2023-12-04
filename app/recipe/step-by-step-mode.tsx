import {Text, YStack, Progress, ScrollView, XStack, H4, Button, Image, H3, Paragraph} from "tamagui";
import {Stack} from "expo-router/stack";
import {Dimensions, Platform, TouchableOpacity} from "react-native";
import {useMemo, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {selectRecipe} from "../../store/slices/recipe/recipeSlice";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import * as React from "react";
import {InformativeSheet} from "../../components";
import {Ingredient} from "../../constants/interfaces/recipe";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function StepByStepModeScreen() {
    const router = useRouter();
    const steps = useAppSelector(selectRecipe).steps;
    const ingredients = useAppSelector(selectRecipe).ingredients;
    const valueOfStep = useMemo(() => 100 / steps.length, [steps]);
    const deviceWidth = Dimensions.get('screen').width;
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(34);
    const [showIngredients, setShowIngredients] = useState(false);

    const tap = Gesture.Tap()
        .onStart((event) => {
            if (event.x <= deviceWidth / 2) {
                decrease()
            } else {
                increase()
            }
        })


    function increase() {
        if (progress < 100) {
            if (progress + valueOfStep >= 100) {
                setProgress(100)
                setCurrentStep(steps.length);
            } else {
                setProgress((prev) => prev + valueOfStep)
                setCurrentStep((prev) => prev + 1);
            }
        }
    }

    function decrease() {
        if (progress > 10) {
            if (progress - valueOfStep <= valueOfStep) {
                setProgress(valueOfStep)
                setCurrentStep(1)
            } else {
                setProgress((prev) => prev - valueOfStep)
                setCurrentStep((prev) => prev - 1);
            }
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <YStack paddingHorizontal={10} marginBottom={10} marginTop={Platform.OS === 'android' ? 10 : 0}>
                <XStack justifyContent='space-between' marginBottom={10}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowIngredients(true)}>
                        <H4 fontSize={18} color='green'>Ingredients ({ingredients.length})</H4>
                    </TouchableOpacity>
                </XStack>
                <H4 fontSize={18}>{currentStep} of {steps.length}</H4>
                <Progress value={progress}>
                    <Progress.Indicator animation="bouncy"/>
                </Progress>
            </YStack>
            <GestureDetector gesture={tap}>
                <ScrollView flex={1} paddingHorizontal={10} paddingVertical={20}>
                    <H3 marginBottom={10}>{steps[currentStep - 1].title}</H3>
                    {
                        steps[currentStep - 1].image &&
                        <Image source={{ uri: steps[currentStep - 1].image }} style={{ width: '100%', height: 250, borderRadius: 12, marginBottom: 10 }} />
                    }
                    <Paragraph marginTop={10} fontSize={18}>{steps[currentStep - 1].description}</Paragraph>

                </ScrollView>
            </GestureDetector>
            <InformativeSheet open={showIngredients} setOpen={(val) => setShowIngredients(val)} close={() => setShowIngredients(false)}>
                {
                    ingredients.map((ingredient: Ingredient) => (
                        <XStack
                            justifyContent='space-between'
                            alignItems='center'
                            paddingHorizontal={5}
                            paddingVertical={10}
                            key={ingredient.id}
                            borderBottomColor='black'
                            borderBottomWidth={0.2}
                        >
                            <Paragraph fontSize={18}>{ingredient.product}</Paragraph>
                            <Paragraph fontSize={18} fontWeight='900'>{ingredient.quantity} {ingredient.measure}</Paragraph>
                        </XStack>
                    ))
                }
            </InformativeSheet>
        </SafeAreaView>
    )
}
