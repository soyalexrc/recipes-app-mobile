import {H4, H5, Text, XStack} from "tamagui";
import {TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

interface Props {
    children?: React.ReactNode;
    title?: string;
    hideGoBackButton?: boolean;
}

export function BasicCustomHeader(props: Props) {
    const router = useRouter();
    return (
        <XStack padding={10} justifyContent='space-between' alignItems='center'>
            <TouchableOpacity onPress={() => router.back()}>
                {!props.hideGoBackButton &&  <Ionicons name="arrow-back" size={24} color="black"/>}
            </TouchableOpacity>
            <H4 alignSelf='center'>{props.title}</H4>
            {
                props.children ? (
                    <XStack gap={10}>
                        {props.children}
                    </XStack>
                ) : (
                    <View style={{ width: 20 }} />
                )
            }

        </XStack>
    )
}
