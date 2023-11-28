import {Button, H2, H3, H4, H5, H6, Image, Paragraph, Text, XStack, YStack} from "tamagui";
import {FlashList} from "@shopify/flash-list";
import {Ionicons} from "@expo/vector-icons";
import {Dimensions, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";

interface Props {
    title: string;
    category: string;
    previewData: any[],
    amount: number;
}

export function GenericPreviewList({previewData, amount, title}: Props) {
    const router = useRouter();

    return (
        <YStack mb={40} minHeight={200}>
            <XStack justifyContent='space-between' alignItems='center' px={10}>
                <XStack alignItems='center' gap={10} mb={10}>
                    <H2>{title}</H2>
                    <H5>({amount})</H5>
                </XStack>
                {
                    previewData.length > 0 &&
                    <YStack>
                        <TouchableOpacity>
                            <Paragraph color='blue'>See all</Paragraph>
                        </TouchableOpacity>
                    </YStack>
                }
            </XStack>

            {
                previewData.length > 0 &&
                <View style={{ height: 200, width: Dimensions.get('screen').width }}>
                    <FlashList
                        renderItem={({item}) => {
                                return (
                                    <TouchableOpacity onPress={() => router.push('/(recipe)')}>
                                        <YStack width={200} height={200} mx={5}>
                                            <Image
                                                source={{
                                                    uri: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                }}
                                                width='100%'
                                                height='100%'
                                                style={{borderRadius: 10}}
                                            />
                                        </YStack>
                                    </TouchableOpacity>
                                )
                        }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        estimatedItemSize={10}
                        data={previewData}
                    />
                </View>
            }
        </YStack>
    )
}
