import {YStack, Text, Circle, H3, XStack, H6, H5, H4} from "tamagui";
import {View} from "../Themed";

export function ProfileHeader() {
    return (
        <YStack alignItems='center'>
            <Circle size='$8' bg='lightgray' />
            <H3 fontWeight='bold'>Alex Rodriguez</H3>
            <XStack mt={20} w='100%' justifyContent='space-evenly'>
                <YStack alignItems='center'>
                    <H5 fontWeight='bold'>2500</H5>
                    <Text>Ratings</Text>
                </YStack>
                <YStack alignItems='center'>
                    <H5 fontWeight='bold'>134</H5>
                    <Text>Tips</Text>
                </YStack>
                <YStack alignItems='center'>
                    <H5 fontWeight='bold'>1123</H5>
                    <Text>Photos</Text>
                </YStack>
            </XStack>
            <View style={{ marginVertical: 30, height: 0.2, width: '80%', backgroundColor: 'black' }} />
        </YStack>
    )
}
