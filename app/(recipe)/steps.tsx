import {Accordion, Button, Image, Paragraph, Square, Text, YStack} from "tamagui";
import {Stack} from "expo-router/stack";
import {HeaderBackButton} from "@react-navigation/elements";
import * as React from "react";
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {useAppDispatch} from "../../store/hooks";
import {FlashList} from "@shopify/flash-list";

const sampleData = [
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
]


export default function StepsScreen() {
    const dispatch = useAppDispatch()

    const router = useRouter();


    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
            <YStack flex={1}>
                <Stack.Screen
                    options={{
                        title: 'Steps',
                        headerLeft: props => (<HeaderBackButton {...props} onPress={() => router.back()}/>),
                    }}
                />
                <Accordion overflow="hidden" width="100%" type="multiple">
                    <FlashList
                        data={sampleData}
                        estimatedItemSize={20}
                        renderItem={({ item, index }) => {
                            return (
                                <Accordion.Item value={item.id} key={item.id} marginBottom={10}>
                                    <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                                        {({open}: {open: boolean}) => (
                                            <>
                                                <Paragraph fontWeight='bold' fontSize={18}>{index + 1}. {item.title}</Paragraph>
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
                                    </Accordion.Content>
                                </Accordion.Item>
                            )
                        }}
                    />
                </Accordion>
            </YStack>
        </SafeAreaView>
    )
}
