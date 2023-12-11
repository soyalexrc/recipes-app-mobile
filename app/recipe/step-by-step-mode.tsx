import {Text, YStack, Progress, ScrollView, XStack, H4, Button, Image, H3, Paragraph} from "tamagui";
import {Stack} from "expo-router/stack";
import {Dimensions, Platform, TouchableOpacity, View} from "react-native";
import {useEffect, useMemo, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {selectRecipe} from "../../store/slices/recipe/recipeSlice";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import * as React from "react";
import {InformativeSheet} from "../../components";
import {Ingredient} from "../../constants/interfaces/recipe";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {selectI18n} from "../../store/slices/i18n/i18nSlice";
import {getDictionary} from "../../i18n";

export default function StepByStepModeScreen() {
    const router = useRouter();
    const steps = useAppSelector(selectRecipe).steps;
    const lng = useAppSelector(selectI18n).language;
    const insets = useSafeAreaInsets();
    const ingredients = useAppSelector(selectRecipe).ingredients;
    const valueOfStep = useMemo(() => 100 / steps.length, [steps]);
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(34);
    const [showIngredients, setShowIngredients] = useState(false);

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

    useEffect(() => {
        if (steps.length === 1) {
            setProgress(100)
        }
        if (steps.length === 0) {
            setProgress(0)
        }
    }, []);


    return (
        <View style={{flex: 1, position: 'relative', paddingTop: insets.top, backgroundColor: '#fff'}}>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <YStack paddingHorizontal={10} marginBottom={10} marginTop={Platform.OS === 'android' ? 10 : 0}>
                <XStack justifyContent='space-between' marginBottom={10}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowIngredients(true)}>
                        <H4 fontSize={18}
                            color='green'>{getDictionary(lng).common.ingredients} ({ingredients.length})</H4>
                    </TouchableOpacity>
                </XStack>
                <H4 fontSize={18}>{currentStep} {getDictionary(lng).common.of} {steps.length}</H4>
                <Progress value={progress} backgroundColor='lightgray'>
                    <Progress.Indicator animation="bouncy"/>
                </Progress>
            </YStack>
            <ScrollView flex={1} paddingHorizontal={10} paddingVertical={20}>
                <H3 marginBottom={10}>{steps[currentStep - 1].title}</H3>
                {
                    steps[currentStep - 1].image &&
                    <Image source={{uri: steps[currentStep - 1].image}}
                           style={{width: '100%', height: 250, borderRadius: 12, marginBottom: 10}}/>
                }
                <Paragraph marginTop={10} fontSize={18}>{steps[currentStep - 1].description}</Paragraph>

            </ScrollView>
            <InformativeSheet showHandle open={showIngredients} setOpen={(val) => setShowIngredients(val)}
                              title={getDictionary(lng).common.ingredients}>
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
                            <Paragraph fontSize={18}
                                       fontWeight='900'>{ingredient.quantity} {ingredient.measure}</Paragraph>
                        </XStack>
                    ))
                }
            </InformativeSheet>
            <XStack position='absolute' bottom={10} right={10} left={10}
                    justifyContent={currentStep === 1 ? 'flex-end' : 'space-between'}>
                {
                    currentStep > 1 &&
                    <Button onPress={decrease} backgroundColor='lightgreen'>Anterior</Button>
                }
                {
                    currentStep < steps.length &&
                    <Button onPress={increase} backgroundColor='lightgreen'>Siguiente</Button>
                }
            </XStack>
        </View>
    )
}
