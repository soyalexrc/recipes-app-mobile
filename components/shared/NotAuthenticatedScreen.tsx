import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Button, H2, H3, Paragraph, Text, YStack} from "tamagui";
import LottieView from 'lottie-react-native';
import {Link, useRouter} from "expo-router";

export function NotAuthenticatedScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    return (
        <YStack justifyContent='center' alignItems='center' flex={1} paddingTop={insets.top} backgroundColor='#fff'>
            <H3>No estas registrado.</H3>
            <Paragraph>Por favor inicia sesion para poder ver esta pantalla</Paragraph>
            <LottieView autoSize autoPlay loop source={require('../../utils/animations/not-found.json')}/>
            <Button backgroundColor='lightgreen' onPress={() => router.push('/(auth)')}>Ingresar</Button>
        </YStack>
    )
}
