import {Button, Input, Text, XStack, YStack} from "tamagui";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity, View} from "react-native";

interface Props {
    changeFormType: () => void
}

export function RegisterForm({changeFormType}: Props) {
    return (
        <YStack>
            <YStack padding={30} gap={20}>
                <XStack alignItems='center' gap={10}>
                    <AntDesign name="user" size={24} color="black" />
                    <Input flex={1} size="$4" placeholder='name' borderWidth={0}/>
                </XStack>
                <XStack alignItems='center' gap={10}>
                    <MaterialIcons name="alternate-email" size={24} color="black"/>
                    <Input flex={1} size="$4" placeholder='email' keyboardType='email-address' borderWidth={0}/>
                </XStack>
                <XStack alignItems='center' gap={10}>
                    <Ionicons name="lock-closed" size={24} color="black"/>
                    <Input flex={1} size="$4" placeholder='password' borderWidth={0}/>
                </XStack>
            </YStack>

            <YStack padding={30}>
                <Button backgroundColor='lightblue'>Sign in</Button>
                <XStack justifyContent='center'>
                    <Text paddingVertical={15} textAlign='center'>Already a member? </Text>
                    <TouchableOpacity onPress={changeFormType}>
                        <Text textDecorationLine='underline' color='blue' paddingVertical={15} textAlign='center'>Log in</Text>
                    </TouchableOpacity>
                </XStack>
            </YStack>

            <XStack justifyContent='center'>
                <View style={styles.separator}/>
            </XStack>
            <XStack justifyContent='center' paddingTop={20}>
                <Button icon={<Ionicons name="logo-google" size={24} color="black" />}>
                    Ingresar con google
                </Button>
            </XStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: 'lightgray',
        width: '60%',
        marginBottom: 20,
    },
});
