import {
    AlertDialog,
    Button,
    Card,
    H3,
    H4,
    H5,
    Input,
    Label,
    Paragraph,
    Sheet,
    Text,
    XStack,
    YStack,
    ZStack
} from "tamagui";
import {Stack} from "expo-router/stack";
import {HeaderBackButton} from "@react-navigation/elements";
import * as React from "react";
import {useNavigation, useRouter} from "expo-router";

import {useAppSelector, useAppDispatch} from '../../store/hooks';
import {LegacyRef, RefObject, useEffect, useRef, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {FlashList} from "@shopify/flash-list";
import {
    addNewIngredientToRecipe,
    deleteIngredientFromRecipe, editIngredient,
} from "../../store/slices/recipe/recipeFormSlice";
import {SafeAreaView} from "react-native-safe-area-context";
import {TouchableOpacity} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {selectRecipeForm} from "../../store/slices/recipe/recipeFormSlice";
import {Ingredient} from "../../constants/interfaces/recipe";
import {BasicCustomHeader} from "../../components/BasicCustomHeader";

type TypeOfAction = 'edit' | 'create';


export default function IngredientsScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const ingredients = useAppSelector(selectRecipeForm).ingredients;
    const dispatch = useAppDispatch();
    const flashListRef = useRef<any>();
    const [currentIngredientToEdit, setCurrentIngredientToEdit] = useState<number | null>(null);
    const [newIngredient, setNewIngredient] = useState<boolean>(false);

    const {
        register,
        setValue,
        control,
        handleSubmit,
        getValues,
        reset,
        formState: {errors},
    } = useForm<Ingredient>({
        defaultValues: {}
    })
    const onSubmitCreate = handleSubmit((data) => {
        dispatch(addNewIngredientToRecipe(data))
        flashListRef.current?.scrollToEnd({
            animated: true
        });
        CancelNewIngredient()
    });
    const onSubmitEdit = handleSubmit((data) => {
        dispatch(editIngredient({
            ...data,
            id: ingredients[currentIngredientToEdit!].id
        }))
        flashListRef.current?.scrollToEnd({
            animated: true
        });
        CancelNewIngredient()
    });

    console.log(ingredients);

    const onPressNewIngredient = () => {
        setNewIngredient(true);
    }

    // useEffect(() => {
    //     console.log(ingredients)
    //     navigation.setOptions({
    //         title: `Ingredients (${ingredients.length})`
    //     })
    // }, [ingredients]);


    function CancelNewIngredient() {
        setNewIngredient(false)
        setCurrentIngredientToEdit(null);
        reset();
    }

    const onEditIngredient = (index: number) => {
        setValue('product', ingredients[index].product);
        setValue('quantity', ingredients[index].quantity);
        setValue('measure', ingredients[index].measure);
        setCurrentIngredientToEdit(index);
    }

    return (
        <SafeAreaView  style={{flex: 1, backgroundColor: '#fff'}}>
            <YStack flex={1} position='relative'
                    paddingBottom={(newIngredient || typeof currentIngredientToEdit === 'number') ? 0 : 60}
                    paddingHorizontal={10}>

                <BasicCustomHeader title='Ingredientes' />


                {
                    (newIngredient || typeof currentIngredientToEdit === 'number') &&
                    <Card elevation={3} backgroundColor='#fff' width='100%' marginVertical={10}>
                        <Card.Header>
                            <XStack justifyContent='space-between' alignItems='center'>
                                <H4>{newIngredient ? 'New Ingredient' : `Edit ${getValues('product')}`}</H4>
                                <TouchableOpacity onPress={CancelNewIngredient}>
                                    <Ionicons name="close-circle-outline" size={24} color="red"/>
                                </TouchableOpacity>
                            </XStack>
                        </Card.Header>

                        <YStack paddingHorizontal={10}>
                            <Label htmlFor="titleNewIngredient">Product</Label>
                            <Controller
                                control={control}
                                rules={{required: true}}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        id='titleNewIngredient'
                                        size="$3"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}/>
                                )}
                                name='product'
                            />
                            {errors.product && <Text>This is required.</Text>}

                            <XStack gap={10}>
                                <YStack flex={1}>
                                    <Label htmlFor="amountForIngredient">Quantity</Label>
                                    <Controller
                                        control={control}
                                        rules={{required: true}}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <Input
                                                id='amountForIngredient'
                                                size="$3"
                                                onBlur={onBlur}
                                                keyboardType='phone-pad'
                                                onChangeText={onChange}
                                                value={value}/>
                                        )}
                                        name='quantity'
                                    />
                                    {errors.quantity && <Text>This is required.</Text>}
                                </YStack>

                                <YStack flex={1}>
                                    <Label htmlFor="measureNewIngredient">Measure</Label>
                                    <Controller
                                        control={control}
                                        rules={{required: true}}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <Input
                                                id='measureNewIngredient'
                                                size="$3"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}/>
                                        )}
                                        name='measure'
                                    />
                                    {errors.measure && <Text>This is required.</Text>}
                                </YStack>

                            </XStack>
                        </YStack>

                        <Card.Footer padding={10}>
                            <Button width='100%' onPress={newIngredient ? onSubmitCreate : onSubmitEdit} backgroundColor='lightgreen'>Save Changes</Button>
                        </Card.Footer>
                    </Card>
                }

                <FlashList
                    data={ingredients}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={40}
                    ref={flashListRef}
                    renderItem={({item, index}) => {
                        return (
                            <Card backgroundColor='#fff' width='100%' marginVertical={5}>
                                <Card.Header>
                                    <YStack>
                                        <XStack gap={10} paddingBottom={10} justifyContent='flex-end'>
                                            <TouchableOpacity onPress={() => onEditIngredient(index)}>
                                                <Ionicons name="pencil" size={22} color="blue"/>
                                            </TouchableOpacity>
                                            <AlertDialog>
                                                <AlertDialog.Trigger asChild>
                                                    <TouchableOpacity>
                                                        <Ionicons name="trash" size={22} color="red"/>
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
                                                                ingredient?</AlertDialog.Title>
                                                            <AlertDialog.Description>
                                                                By pressing yes, you accept deleting the ingredient.
                                                            </AlertDialog.Description>

                                                            <XStack space="$3" justifyContent="flex-end">
                                                                <AlertDialog.Cancel asChild>
                                                                    <Button>Cancel</Button>
                                                                </AlertDialog.Cancel>
                                                                <AlertDialog.Action asChild>
                                                                    <Button
                                                                        onPress={() => dispatch(deleteIngredientFromRecipe(index))}
                                                                        theme="active">Accept</Button>
                                                                </AlertDialog.Action>
                                                            </XStack>
                                                        </YStack>
                                                    </AlertDialog.Content>
                                                </AlertDialog.Portal>
                                            </AlertDialog>
                                        </XStack>
                                        <XStack justifyContent='space-between' alignItems='center'>
                                            <Paragraph fontSize={16} maxWidth='80%'>{item.product}</Paragraph>
                                            <H4 fontSize={16}>{item.quantity} {item.measure}</H4>
                                        </XStack>
                                    </YStack>
                                </Card.Header>

                                {/* any other components */}
                                <Card.Background/>
                            </Card>
                        )
                    }
                    }
                />
                {
                    (!newIngredient && typeof currentIngredientToEdit !== 'number') &&
                    <Button
                        onPress={onPressNewIngredient}
                        backgroundColor='lightgreen'
                        position='absolute'
                        bottom={10}
                        right={10}
                        left={10}>
                        Add Ingredient
                    </Button>
                }
            </YStack>
        </SafeAreaView>
    )
}
