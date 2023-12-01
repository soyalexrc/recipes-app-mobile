import * as React from 'react';
import {View} from "react-native";
import {Accordion, Button, H3, H4, H5, Image, Paragraph, Square, Text, XStack, YStack} from "tamagui";
import {Ionicons} from "@expo/vector-icons";

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


export function RecipeSteps() {
    return (
        <YStack marginBottom={30}>
            <XStack marginBottom={20} justifyContent='space-between' alignItems='center'>
                <H3>Steps (2)</H3>
                <Button>Add step</Button>
            </XStack>
            <Accordion overflow="hidden" width="100%" type="multiple">
                {
                    sampleData.map((data: any, index: number) => (
                        <Accordion.Item value={data.id} key={data.id} marginBottom={10}>
                            <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                                {({open}) => (
                                    <>
                                        <Paragraph fontWeight='bold' fontSize={18}>{index + 1}. {data.title}</Paragraph>
                                        <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                            <Ionicons name="chevron-up" size={24} color="black"/>
                                        </Square>
                                    </>
                                )}
                            </Accordion.Trigger>
                            <Accordion.Content>
                                {
                                    data.image &&
                                    <Image
                                        source={{
                                            uri: data.image
                                        }}
                                        width={'100%'}
                                        height={180}
                                        style={{borderRadius: 12, marginBottom: 10}}
                                    />
                                }
                                <Paragraph>{data.description}</Paragraph>
                            </Accordion.Content>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </YStack>
    )
}
