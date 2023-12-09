import {Circle, Input, Text, XStack, YStack} from "tamagui";
import {NavigationProp} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

interface Props extends NavigationProp<any> {
    text: string
}

export function HeaderSearch(props: Props) {
    const router = useRouter();
    return (
        <SafeAreaView edges={['top']} style={{height: 110}}>
            <XStack gap={10} paddingHorizontal={10} flex={1} alignItems='center'  onPress={() => router.push('/modal')}>
                <Circle backgroundColor='lightgreen' width={40} height={40}>
                    <Text>RA</Text>
                </Circle>
                <YStack paddingVertical={5} justifyContent='center' flex={1} position='relative'>
                    <Input flex={1} placeholder={props.text} disabled size="$4" borderWidth={2}/>
                    <Ionicons style={{position: 'absolute', right: 25}} name="search" size={24} color="black"/>
                </YStack>

            </XStack>
        </SafeAreaView>
    )
}
