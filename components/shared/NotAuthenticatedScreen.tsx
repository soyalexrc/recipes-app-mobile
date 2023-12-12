import {TouchableOpacity, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Button, H2, H3, Paragraph, Text, YStack} from "tamagui";
import LottieView from 'lottie-react-native';
import {Link, useRouter} from "expo-router";
import {BasicCustomHeader} from "../BasicCustomHeader";
import {Ionicons} from "@expo/vector-icons";

interface Props {
    showSettingsIcon?: boolean;
}

export function NotAuthenticatedScreen(props: Props) {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    return (
        <YStack flex={1} paddingTop={insets.top} backgroundColor='#fff'>
            {props.showSettingsIcon &&
                <BasicCustomHeader hideGoBackButton>
                    <TouchableOpacity onPress={() => router.push('/settings')}>
                        <Ionicons name="settings-outline" size={24} color="black"/>
                    </TouchableOpacity>
                </BasicCustomHeader>
            }
            <YStack flex={1} justifyContent='center' alignItems='center'>
                <H3>No estas registrado.</H3>
                <Paragraph>Por favor inicia sesion para poder ver esta pantalla</Paragraph>
                <LottieView autoSize autoPlay loop source={require('../../utils/animations/not-found.json')}/>
                <Button backgroundColor='lightgreen' onPress={() => router.push('/(auth)')}>Ingresar</Button>
            </YStack>
        </YStack>
    )
}
