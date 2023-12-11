import {Button, Input, Text, XStack, YStack} from "tamagui";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity, View} from "react-native";

interface Props {
    changeFormType: () => void
}

export function LoginForm({changeFormType}: Props) {
    return (
        <YStack>
            <YStack padding={30} gap={20}>
                <XStack alignItems='center' gap={10}>
                    <MaterialIcons name="alternate-email" size={24} color="black"/>
                    <Input flex={1} size="$4" placeholder='email' keyboardType='email-address' borderWidth={0}/>
                </XStack>
                <XStack alignItems='center' gap={10}>
                    <Ionicons name="lock-closed" size={24} color="black"/>
                    <Input flex={1} size="$4" placeholder='password' borderWidth={0}/>
                </XStack>
            </YStack>

            <YStack paddingHorizontal={30}>
                <XStack justifyContent='center'>
                    <TouchableOpacity>
                        <Text color='blue' paddingVertical={15} textAlign='center'>Forgot password?</Text>
                    </TouchableOpacity>
                </XStack>
                <Button backgroundColor='lightblue'>Log in</Button>
                <XStack justifyContent='center'>
                    <Text paddingVertical={15} textAlign='center'>Not a member? </Text>
                    <TouchableOpacity onPress={changeFormType}>
                        <Text textDecorationLine='underline' color='blue' paddingVertical={15} textAlign='center'>Join
                            now </Text>
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
        marginVertical: 20,
        height: 1,
        backgroundColor: 'lightgray',
        width: '60%',
    },
});
