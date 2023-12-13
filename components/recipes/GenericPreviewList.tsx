import {Button, H2, H3, H4, H5, H6, Image, Paragraph, Text, XStack, YStack} from "tamagui";
import {FlashList} from "@shopify/flash-list";
import {Ionicons} from "@expo/vector-icons";
import {Dimensions, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {useRouter} from "expo-router";


interface Props {
    title: string;
    category: string;
    previewData: any[],
}

export function GenericPreviewList({previewData, title}: Props) {
    const router = useRouter();

    return (
        <YStack marginBottom={40} minHeight={200} width={Dimensions.get('screen').width}>
            <H4 paddingHorizontal={10} marginBottom={5} >{title}</H4>
            <FlashList
                renderItem={({item}) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => router.push('/recipe/detalle/123')}>
                            <YStack width={140} mx={5}>
                                <Image
                                    width='100%'
                                    source={{
                                        uri: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                    }}
                                    height={140}
                                />
                                <H4 marginTop={10} fontSize={14} lineHeight={20}>Pan de jamon navideno sample 2
                                    123 123 1</H4>
                            </YStack>
                        </TouchableWithoutFeedback>
                    )
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                estimatedItemSize={10}
                data={previewData}
            />
        </YStack>
    )
}
