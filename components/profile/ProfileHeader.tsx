import {YStack, Text, Circle, H3, XStack, H6, H5, H4} from "tamagui";
import {View} from "../Themed";
import {useAppSelector} from "../../store/hooks";
import {selectUser} from "../../store/slices/user/userSlice";
import {User} from "../../constants/interfaces/user";

interface Props {
    user: User
}

export function ProfileHeader({user}: Props) {

    return (
        <YStack alignItems='center'>
            <Circle size='$8' bg='lightgray' />
            <H3 fontWeight='bold'>{user.name}</H3>
            <XStack mt={20} w='100%' justifyContent='space-evenly'>
                <YStack alignItems='center'>
                    <H5 fontWeight='bold'>{user.likes}</H5>
                    <Text>Ratings</Text>
                </YStack>
                <YStack alignItems='center'>
                    <H5 fontWeight='bold'>{user.tips}</H5>
                    <Text>Tips</Text>
                </YStack>
                <YStack alignItems='center'>
                    <H5 fontWeight='bold'>{user.recipes}</H5>
                    <Text>Photos</Text>
                </YStack>
            </XStack>
            <View style={{ marginVertical: 30, height: 0.2, width: '80%', backgroundColor: 'black' }} />
        </YStack>
    )
}
