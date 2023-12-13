import {Button, H2, H3, H4, H5, H6, Image, Paragraph, Text, XStack, YStack} from "tamagui";
import {FlashList} from "@shopify/flash-list";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Dimensions, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {useRouter} from "expo-router";
import * as React from "react";


interface Props {
    previewData: any[],

}

export function CommunityHorizontalList({previewData}: Props) {
    const router = useRouter();

    return (
        <YStack marginBottom={40} minHeight={200} width={Dimensions.get('screen').width}>
            <FlashList
                renderItem={({item}) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => router.push('/recipe/detalle/123')}>
                            <YStack width={200} mx={5}>
                                <Image
                                    source={{
                                        uri: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                    }}
                                    width='100%'
                                    height={180}
                                />
                                <YStack backgroundColor='#fafafa' padding={10} position='relative'>
                                    <XStack gap={10} alignItems='center'>
                                        <Ionicons name="person-circle-outline" size={24} color="black"/>
                                        <Text fontSize={12}>sample person cooked</Text>
                                    </XStack>
                                    <Text marginTop={5} fontWeight='bold'>Pan de jamon navideno tradicion venezolana</Text>
                                    <XStack marginTop={20} justifyContent='flex-end' alignItems='center' gap={5}>
                                        <AntDesign name="like2" size={20} color="black"/>
                                        <Text fontSize={12}>120</Text>
                                    </XStack>
                                </YStack>
                            </YStack>
                        </TouchableWithoutFeedback>
                    )
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                estimatedItemSize={10}
                data={previewData}
            />
            <XStack paddingTop={20} paddingHorizontal={10}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text fontSize={18} color='blue'>See more community</Text>
                    <Ionicons name="chevron-forward" size={20} color="blue"/>
                </TouchableOpacity>
            </XStack>
        </YStack>
    )
}
