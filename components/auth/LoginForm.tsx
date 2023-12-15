import {Button, Input, Spinner, Text, XStack, YStack} from "tamagui";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import * as React from "react";
import {useState} from "react";
import sleep from "../../utils/sleep";
import Animated, {FadeIn, FadeOut, SlideInLeft, SlideOutRight} from 'react-native-reanimated';
import api from "../../utils/api/api";
import {useAppDispatch} from "../../store/hooks";
import {setUser} from "../../store/slices/user/userSlice";
import {useRouter} from "expo-router";
import * as storage from '../../utils/storage';

interface Props {
    changeFormType: () => void
}

export function LoginForm({changeFormType}: Props) {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {
        register,
        setValue,
        control,
        handleSubmit,
        getValues,
        reset,
        formState: {errors},
    } = useForm<any>({
        defaultValues: {}
    })

    const onSubmit = handleSubmit(async (loginData) => {
        setSubmitting(true)
        try {
            const {data} = await api.post('auth/login', loginData);
            const savedOnStorage = await storage.save('userData', data.data);
            if (savedOnStorage) {
                dispatch(setUser(data.data));
                router.replace('/(tabs)')
            }
        } catch (error) {
            console.log(error)
        }
        setSubmitting(false)
    });

    return (
        <Animated.View entering={SlideInLeft.delay(100)} exiting={SlideOutRight}>
            <YStack padding={30} gap={20}>
                <XStack alignItems='center' gap={10}>
                    <MaterialIcons name="alternate-email" size={24} color="black"/>
                    <Controller
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
                                id='login-email'
                                size="$4"
                                placeholder='email'
                                keyboardType='email-address'
                                borderWidth={0}
                                flex={1}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}/>
                        )}
                        name='email'
                    />
                </XStack>
                <XStack alignItems='center' gap={10}>
                    <Ionicons name="lock-closed" size={24} color="black"/>
                    <Controller
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
                                id='login-password'
                                size="$4"
                                placeholder='password'
                                borderWidth={0}
                                flex={1}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}/>
                        )}
                        name='password'
                    />
                </XStack>
            </YStack>

            <YStack paddingHorizontal={30}>
                <XStack justifyContent='center'>
                    <TouchableOpacity>
                        <Text color='blue' paddingVertical={15} textAlign='center'>Forgot password?</Text>
                    </TouchableOpacity>
                </XStack>
                <Button backgroundColor='lightblue' onPress={onSubmit}>
                    {submitting && <Spinner size="large" color="#fff" />}
                    {submitting ? 'Logging in' :  'Log in'}
                </Button>
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
        </Animated.View>
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
