import {Button, H2, H3, H4, H5, H6, Image, Paragraph, Text, XStack, YStack} from "tamagui";
import {FlashList} from "@shopify/flash-list";
import {Ionicons} from "@expo/vector-icons";
import {Dimensions, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
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
        <YStack marginBottom={40} minHeight={200}>
            <XStack justifyContent='space-between' alignItems='center' paddingHorizontal={10}>
                <XStack alignItems='center' width='70%' gap={10} marginBottom={10}>
                    <H3 lineHeight={26}>{title} <H5>({amount})</H5></H3>

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
                <View style={{ width: Dimensions.get('screen').width }}>
                    <FlashList
                        renderItem={({item}) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => router.push('/recipe/detalle/123')}>
                                        <YStack width={200}  mx={5}>
                                            <Image
                                                source={{
                                                    uri: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                }}
                                                width='100%'
                                                height={180}
                                                style={{borderRadius: 10}}
                                            />
                                            <H4 marginTop={10} fontSize={16} lineHeight={22}>Pan de jamon navideno sample 2 123 123 1</H4>
                                        </YStack>
                                    </TouchableWithoutFeedback>
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
