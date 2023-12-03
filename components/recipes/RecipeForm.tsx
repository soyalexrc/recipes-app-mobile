import {StyleSheet, View} from "react-native";
import {
    Adapt,
    Button,
    getFontSize,
    Input,
    Label,
    Select,
    SelectProps,
    Sheet,
    Text,
    TextArea,
    XStack,
    YStack
} from "tamagui";
import * as React from 'react';
import {
    useForm,
    Controller,
    Control,
    FieldErrors,
    UseFormGetValues,
    FieldPath,
    FieldPathValue,
    SetValueConfig, UseFormSetValue
} from "react-hook-form";
import {AddRecipeFormData} from "../../app/(recipe)/add-recipe";
import {useAppDispatch} from "../../store/hooks";
import {updateTitle} from "../../store/slices/recipe/addRecipeSlice";
import {useMemo, useState} from "react";
import {Ionicons, Octicons} from "@expo/vector-icons";
import {LinearGradient} from 'tamagui/linear-gradient'
import {CustomSelect} from "../CustomSelect";

interface Props {
    control: Control<AddRecipeFormData, any>,
    errors: FieldErrors<AddRecipeFormData>,
    getValues: UseFormGetValues<AddRecipeFormData>;
    setValue: UseFormSetValue<AddRecipeFormData>;
}

const timeOptions = [
    {name: '5 min', value: '5 min'},
    {name: '10 min', value: '10 min'},
    {name: '15 min', value: '15 min'},
    {name: '20 min', value: '20 min'},
    {name: '25 min', value: '25 min'},
    {name: '30 min', value: '30 min'},
    {name: '45 min', value: '45 min'},
    {name: '60 min', value: '60 min'},
    {name: '90 min', value: '90 min'},
]

const portions = [
    {name: '1 portion', value: '1'},
    {name: '2 portion', value: '2'},
    {name: '3 portion', value: '3'},
    {name: '4 portion', value: '4'},
    {name: '5 portion', value: '5'},
    {name: '6 portion', value: '6'},
    {name: '7 portion', value: '7'},
    {name: '8 portion', value: '8'},
    {name: '9 portion', value: '9'},
    {name: '10 portion', value: '10'},
]

export function RecipeForm({control, errors, getValues, setValue}: Props) {
    const dispatch = useAppDispatch();
    const handleUpdateTitle = (title: string, fn: (v: string) => void) => {
        dispatch(updateTitle(title));
        fn(title);
    }

    return (
        <YStack>
            <Label htmlFor="title">Title</Label>
            <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        id='title'
                        size="$4"
                        onBlur={onBlur}
                        onChangeText={(e) => handleUpdateTitle(e, onChange)}
                        value={value}/>
                )}
                name='title'
            />
            {errors.title && <Text>This is required.</Text>}

            <Label htmlFor="description">Description</Label>
            <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextArea
                        id='description'
                        size="$3"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name='description'
            />
            {errors.description && <Text>This is required.</Text>}

            <YStack marginVertical={10}>
                <Label flex={1} fb={0}>
                    Estimated Time
                </Label>
                <CustomSelect title='Estimated time' options={timeOptions} value={getValues('estimatedTime')}
                              onValueChange={(value) => setValue('estimatedTime', value)}/>
            </YStack>


            <YStack >
                <Label flex={1} fb={0}>
                    How many portions?
                </Label>
                <CustomSelect title='Amount of portions' options={portions} value={getValues('amountOfPortions')}
                              onValueChange={(value) => setValue('amountOfPortions', value)}/>
            </YStack>

        </YStack>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginTop: 10,
        height: 1,
        backgroundColor: 'lightgray',
        width: '80%',
    }
});
