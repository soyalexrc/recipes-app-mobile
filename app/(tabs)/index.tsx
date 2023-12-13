import {Card, H2, H3, H4, Image, Input, Paragraph, ScrollView, Text, XStack, YStack, ZStack} from "tamagui";
import {useRouter} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Dimensions, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {CommunityHorizontalList, GenericPreviewList} from "../../components/recipes";
import * as React from "react";

export default function DiscoveryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <YStack paddingTop={insets.top} flex={1} backgroundColor='#fff'>
            <YStack padding={10} marginBottom={40}>
                <ZStack>
                    <Input size='$4' placeholder='Search for a recipe' textAlign='center' borderRadius={100}></Input>
                    <Ionicons style={{position: 'absolute', left: 20, top: 10}} name="search" size={24} color="black"/>
                </ZStack>
            </YStack>

            <ScrollView flex={1}>
                {/*    featured */}
                <YStack padding={10}>
                    <H4 marginBottom={10}>What we are loving now!</H4>
                    <Card>
                        <Image
                            alignSelf="center"
                            width='100%'
                            borderTopLeftRadius={10}
                            borderTopRightRadius={10}
                            source={{
                                height: 300,
                                uri: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            }}
                        />
                        <YStack padding={20}>
                            <H2>The ultimate tasty holiday party</H2>
                            <TouchableOpacity>
                                <XStack alignItems='center' gap={5} marginTop={20}>
                                    <Paragraph>See the recipe</Paragraph>
                                    <Ionicons name="chevron-forward" size={18} color="black"/>
                                </XStack>
                            </TouchableOpacity>
                        </YStack>
                    </Card>
                </YStack>

                {/*    community preview */}

                <H4 paddingHorizontal={10} marginVertical={10}>What our community is cooking!</H4>

                <CommunityHorizontalList
                    previewData={['1', '2', '3', '4', '5']}
                />

                <GenericPreviewList
                    title='Trending'
                    previewData={['1', '2', '3', '4']}
                />

                <GenericPreviewList
                    title='Popular recipes this week'
                    previewData={['1', '2', '3', '4']}
                />

                <GenericPreviewList
                    title='Dessert lovers'
                    previewData={['1', '2', '3', '4']}
                />




            </ScrollView>
        </YStack>
    )
}
