import {AlertDialog, Button, Card, H2, H3, H4, Paragraph, Sheet, Text, XStack, YStack} from "tamagui";
import {useState} from "react";
import * as React from 'react';
import {Ionicons} from "@expo/vector-icons";

const sampleData = [
    {id: '1', quantity: 1, measure: 'spoon', product: 'Flour'},
    {id: '2', quantity: 72, measure: 'Gr', product: 'Peanuts'},
    {id: '3', quantity: 1, measure: 'cup', product: 'Sugar'},
    {id: '4', quantity: 90, measure: 'Oz', product: 'Almonds'},
    {id: '5', quantity: 3, measure: 'teaspoon', product: 'Salt'},
    {id: '6', quantity: 67, measure: 'Kg', product: 'Rice'},
    {id: '7', quantity: 56, measure: 'tablespoon', product: 'Butter'},
    {id: '8', quantity: 21, measure: 'Pcs', product: 'Eggs'},
    {id: '9', quantity: 34, measure: 'ml', product: 'Milk'},
    {id: '10', quantity: 5, measure: 'slice', product: 'Bread'},
    {id: '11', quantity: 87, measure: 'cloves', product: 'Garlic'},
    {id: '12', quantity: 12, measure: 'bunch', product: 'Bananas'},
    {id: '13', quantity: 68, measure: 'clove', product: 'Onion'},
    {id: '14', quantity: 39, measure: 'packet', product: 'Chips'},
    {id: '15', quantity: 4, measure: 'head', product: 'Lettuce'},
    {id: '16', quantity: 50, measure: 'box', product: 'Cereal'},
    {id: '17', quantity: 26, measure: 'jar', product: 'Jam'},
    {id: '18', quantity: 63, measure: 'can', product: 'Soup'},
    {id: '19', quantity: 9, measure: 'bottle', product: 'Soda'},
    {id: '20', quantity: 80, measure: 'bag', product: 'Chocolates'}

]

export function RecipeIngredients() {
    const [position, setPosition] = useState(0)
    const [open, setOpen] = useState(false)
    const snapPoints = [85];
    return (
        <>
            <YStack space>
                <XStack space $sm={{flexDirection: 'column', alignItems: 'center'}}>
                    <Button marginVertical={30} width='100%' onPress={() => setOpen(true)}>
                        <Text>
                            Ingredients ({sampleData.length})
                        </Text>
                    </Button>
                </XStack>
            </YStack>

            <Sheet
                forceRemoveScrollEnabled={open}
                modal
                open={open}
                onOpenChange={setOpen}
                snapPoints={snapPoints}
                snapPointsMode='percent'
                dismissOnSnapToBottom
                position={position}
                onPositionChange={setPosition}
                zIndex={100_000}
                animation="medium"
            >
                <Sheet.Overlay
                    animation="lazy"
                    enterStyle={{opacity: 0}}
                    exitStyle={{opacity: 0}}
                />
                <Sheet.Handle/>
                <Sheet.Frame padding="$4" space="$2" position='relative' paddingBottom={80}>
                    <H3 textAlign='center'>Ingredients list ({sampleData.length})</H3>
                    <Sheet.ScrollView showsVerticalScrollIndicator={false}>
                        <YStack>
                            {sampleData.map((data: any, index: number) => (
                                <Card backgroundColor='#fff' width='100%' marginBottom={10}>
                                    <Card.Header>
                                        <H3>{data.product}</H3>
                                    </Card.Header>

                                    {/* any other components */}
                                    <YStack padding={20}>
                                        <XStack alignItems='center' gap={5}>
                                            <Paragraph>Quantity: </Paragraph>
                                            <H4>{data.quantity} </H4>
                                        </XStack>
                                        <XStack alignItems='center' gap={5}>
                                            <Paragraph>Measure: </Paragraph>
                                            <H4>{data.measure} </H4>
                                        </XStack>
                                    </YStack>
                                    <Card.Footer padding={10}>
                                        <XStack width='100%' gap={10} justifyContent='flex-end'>
                                            <Button icon={<Ionicons name="pencil" size={22} color="blue"/>}>
                                                <Text>Edit</Text>
                                            </Button>
                                            <AlertDialog native>
                                                <AlertDialog.Trigger asChild>
                                                    <Button icon={<Ionicons name="trash" size={22} color="red"/>}>
                                                        <Text>Delete</Text>
                                                    </Button>
                                                </AlertDialog.Trigger>

                                                <AlertDialog.Portal>
                                                    <AlertDialog.Overlay
                                                        key="overlay"
                                                        animation="quick"
                                                        opacity={0.5}
                                                        enterStyle={{ opacity: 0 }}
                                                        exitStyle={{ opacity: 0 }}
                                                    />
                                                    <AlertDialog.Content
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
                                                        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                                                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                                                        x={0}
                                                        scale={1}
                                                        opacity={1}
                                                        y={0}
                                                    >
                                                        <YStack space>
                                                            <AlertDialog.Title>Delete ingredient?</AlertDialog.Title>
                                                            <AlertDialog.Description>
                                                                By pressing yes, you accept deleting the ingredient.
                                                            </AlertDialog.Description>

                                                            <XStack space="$3" justifyContent="flex-end">
                                                                <AlertDialog.Cancel asChild>
                                                                    <Button>Cancel</Button>
                                                                </AlertDialog.Cancel>
                                                                <AlertDialog.Action asChild>
                                                                    <Button theme="active">Accept</Button>
                                                                </AlertDialog.Action>
                                                            </XStack>
                                                        </YStack>
                                                    </AlertDialog.Content>
                                                </AlertDialog.Portal>
                                            </AlertDialog>
                                        </XStack>
                                    </Card.Footer>
                                    <Card.Background/>
                                </Card>
                                // <XStack  key={data.id} width='100%' alignItems='center'>
                                //     <YStack width='15%'>
                                //         <Paragraph>{data.quantity}</Paragraph>
                                //     </YStack>
                                //     <YStack width='25%'>
                                //         <Paragraph>{data.measure}</Paragraph>
                                //     </YStack>
                                //     <YStack width='45%'>
                                //         <Paragraph>{data.product}</Paragraph>
                                //     </YStack>
                                //     <XStack gap={10}>
                                //         <TouchableOpacity>
                                //             <Ionicons name="pencil" size={22} color="blue" />
                                //         </TouchableOpacity>
                                //         <TouchableOpacity>
                                //             <Ionicons name="trash" size={22} color="red" />
                                //         </TouchableOpacity>
                                //     </XStack>
                                // </XStack>
                            ))}
                        </YStack>
                    </Sheet.ScrollView>
                    <Button position='absolute' bottom={30} left={30} right={30} backgroundColor='lightgreen'>Add Ingredient</Button>
                </Sheet.Frame>
            </Sheet>
        </>
    )
}

