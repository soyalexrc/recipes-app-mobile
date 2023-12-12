import {Button, Input, Spinner, Text, XStack, YStack} from "tamagui";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import sleep from "../../utils/sleep";
import * as React from "react";
import Animated, {FadeIn, FadeOut, SlideInLeft, SlideOutRight} from 'react-native-reanimated';

interface Props {
    changeFormType: () => void
}

export function RegisterForm({changeFormType}: Props) {
    const [submitting, setSubmitting] = useState<boolean>(false);

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

    const onSubmit = handleSubmit(async (data) => {
        setSubmitting(true)
        await sleep(1000);
        setSubmitting(false)
        console.log(data);
    });

    return (
        <Animated.View entering={SlideInLeft.delay(100)} exiting={SlideOutRight}>
            <YStack padding={30} gap={20}>
                <XStack alignItems='center' gap={10}>
                    <AntDesign name="user" size={24} color="black" />
                    <Controller
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
                                id='register-name'
                                size="$4"
                                placeholder='Name'
                                borderWidth={0}
                                flex={1}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}/>
                        )}
                        name='name'
                    />
                </XStack>
                <XStack alignItems='center' gap={10}>
                    <MaterialIcons name="alternate-email" size={24} color="black"/>
                    <Controller
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
                                id='register-email'
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
                                id='register-password'
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

            <YStack padding={30}>
                <Button backgroundColor='lightblue' onPress={onSubmit}>
                    {submitting && <Spinner size="large" color="#fff" />}
                    {submitting ? 'Registering' :  'Register'}
                </Button>
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
        </Animated.View>
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
