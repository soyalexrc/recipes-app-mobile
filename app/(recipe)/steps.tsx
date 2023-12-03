import {
    Accordion, AlertDialog,
    Button,
    Card,
    H4,
    Image,
    Input,
    Label,
    Paragraph,
    Square,
    Text,
    TextArea,
    XStack,
    YStack
} from "tamagui";
import {Stack} from "expo-router/stack";
import {HeaderBackButton} from "@react-navigation/elements";
import * as React from "react";
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {FlashList} from "@shopify/flash-list";
import {
    addNewStep,
    deleteStep,
    editStep,
    selectRecipe,
    Step
} from "../../store/slices/recipe/recipeSlice";
import {useRef, useState} from "react";
import {TouchableOpacity} from "react-native";
import {Controller, useForm} from "react-hook-form";
import * as Picker from "expo-image-picker";

export default function StepsScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const steps = useAppSelector(selectRecipe).steps;
    const [createStep, setCreateStep] = useState<boolean>(false);
    const [currentStepToEdit, setCurrentStepToEdit] = useState<number | null>(null);
    const flashListRef = useRef<any>();

    const [image, setImage] = useState<any>(null);

    const removeImage = () => {
        setImage(null)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await Picker.launchImageLibraryAsync({
            mediaTypes: Picker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const {
        register,
        setValue,
        control,
        handleSubmit,
        getValues,
        reset,
        formState: {errors},
    } = useForm<Step>({
        defaultValues: {}
    })

    function CancelNewIngredient() {
        setCreateStep(false)
        setCurrentStepToEdit(null);
        setImage(null);
        reset();
    }

    const onSubmitCreate = handleSubmit((data) => {
        dispatch(addNewStep({...data, image}));
        flashListRef.current?.scrollToEnd({
            animated: true
        });
        CancelNewIngredient()
    });
    const onSubmitEdit = handleSubmit((data) => {
        dispatch(editStep({
            ...data,
            image,
            id: steps[currentStepToEdit!].id
        }))
        flashListRef.current?.scrollToEnd({
            animated: true
        });
        CancelNewIngredient()
    });

    const onEditStep = (index: number) => {
        setValue('title', steps[index].title);
        setValue('description', steps[index].description);
        setImage(steps[index].image);
        setCurrentStepToEdit(index);
    }

    return (
        <SafeAreaView edges={['bottom']} style={{flex: 1}}>
            <YStack flex={1} paddingHorizontal={10} position='relative' paddingBottom={(createStep || typeof currentStepToEdit === 'number') ? 0 : 60}>
                <Stack.Screen
                    options={{
                        title: 'Steps',
                        headerLeft: props => (<HeaderBackButton {...props} onPress={() => router.back()}/>),
                    }}
                />

                {
                    (createStep || typeof currentStepToEdit === 'number') &&
                    <Card elevation={3} backgroundColor='#fff' width='100%' marginVertical={10}>
                        <Card.Header>
                            <XStack justifyContent='space-between' alignItems='center'>
                                <H4>{createStep ? 'New' : 'Edit'} Step</H4>
                                <TouchableOpacity onPress={CancelNewIngredient}>
                                    <Ionicons name="close-circle-outline" size={24} color="red"/>
                                </TouchableOpacity>
                            </XStack>
                        </Card.Header>

                        <YStack paddingHorizontal={10}>
                            <YStack position='relative' marginTop={30}>
                                {image && <Image source={{uri: image}}
                                                 style={{width: '100%', height: 200, borderRadius: 12}}/>}
                                {!image && <Button height={200} onPress={pickImage}>Select a picture</Button>}
                                {
                                    image &&
                                    <XStack justifyContent='flex-end' gap={10} position='absolute' top={10} right={10}>
                                        <Button onPress={pickImage} size='$3' icon={ <Ionicons name="pencil" size={22} color="blue"/>}>
                                            Edit
                                        </Button>
                                        <Button onPress={removeImage} size='$3' icon={ <Ionicons name="trash" size={22} color="red"/>}>
                                            Remove
                                        </Button>
                                    </XStack>
                                }
                            </YStack>

                            <Label htmlFor="titleNewStep">Title</Label>
                            <Controller
                                control={control}
                                rules={{required: true}}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        id='titleNewStep'
                                        size="$3"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}/>
                                )}
                                name='title'
                            />
                            {errors.title && <Text>This is required.</Text>}

                            <Label htmlFor="descriptionNewStep">Description</Label>
                            <Controller
                                control={control}
                                rules={{required: true}}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextArea
                                        id='descriptionNewStep'
                                        size="$3"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}/>
                                )}
                                name='description'
                            />
                            {errors.description && <Text>This is required.</Text>}
                        </YStack>

                        <Card.Footer padding={10}>
                            <Button width='100%' onPress={createStep ? onSubmitCreate : onSubmitEdit}
                                    backgroundColor='lightgreen'>Save Changes</Button>
                        </Card.Footer>
                    </Card>
                }

                <Accordion height='100%' overflow="hidden" width="100%" type="multiple">
                    <FlashList
                        ref={flashListRef}
                        data={steps}
                        estimatedItemSize={20}
                        renderItem={({item, index}) => {
                            return (
                                <Accordion.Item value={item.id} key={item.id} marginVertical={5}>
                                    <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                                        {({open}: { open: boolean }) => (
                                            <>
                                                <Paragraph fontWeight='bold'
                                                           fontSize={18}>{index + 1}. {item.title}</Paragraph>
                                                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                                    <Ionicons name="chevron-up" size={24} color="black"/>
                                                </Square>
                                            </>
                                        )}
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        {
                                            item.image &&
                                            <Image
                                                source={{
                                                    uri: item.image
                                                }}
                                                width={'100%'}
                                                height={180}
                                                style={{borderRadius: 12, marginBottom: 10}}
                                            />
                                        }
                                        <Paragraph>{item.description}</Paragraph>
                                        <XStack gap={10} marginTop={10}>
                                            <Button flex={1} onPress={() => onEditStep(index)} icon={ <Ionicons name="pencil" size={22} color="blue"/>}>
                                                Edit
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialog.Trigger asChild>
                                                    <Button flex={1} icon={ <Ionicons name="trash" size={22} color="red"/>}>
                                                        Remove
                                                    </Button>
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
                                                                step?</AlertDialog.Title>
                                                            <AlertDialog.Description>
                                                                By pressing yes, you accept deleting the ingredient.
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
                                        </XStack>
                                    </Accordion.Content>
                                </Accordion.Item>
                            )
                        }}
                    />
                </Accordion>
                {
                    (!createStep && typeof currentStepToEdit !== 'number') &&
                    <Button
                        onPress={() => setCreateStep(true)}
                        backgroundColor='lightgreen'
                        position='absolute'
                        bottom={10}
                        right={10}
                        left={10}>
                        Add Step
                    </Button>
                }
            </YStack>
        </SafeAreaView>
    )
}
