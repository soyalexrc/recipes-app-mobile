import {useRouter} from "expo-router";
import {Circle, Input, ScrollView, XStack, YStack, Text, Button} from "tamagui";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {LoginForm, RegisterForm} from "../../components/auth";
import {useState} from "react";
import {BasicCustomHeader} from "../../components/BasicCustomHeader";

type FormType = 'logIn' | 'signIn'

export default function Login() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [formType, setFormType] = useState<FormType>('logIn')

    return (
        <YStack  paddingTop={insets.top} backgroundColor='#fff' flex={1}>
            <BasicCustomHeader title={formType === 'signIn' ? 'Sign in' : 'Log in'}/>
            <YStack flex={1} justifyContent='center'>
                <YStack>
                    <ScrollView>
                        <XStack justifyContent='center'>
                            <Circle bordered borderColor='#000000' width={100} height={100}>
                                <Text>Logo here</Text>
                            </Circle>
                        </XStack>
                        {
                            formType === 'logIn'
                                ? <LoginForm changeFormType={() => setFormType('signIn')}/>
                                : <RegisterForm changeFormType={() => setFormType('logIn')}/>}


                    </ScrollView>
                </YStack>
            </YStack>
        </YStack>
    )
}


