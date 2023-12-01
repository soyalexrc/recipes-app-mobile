import {StyleSheet, View} from "react-native";
import {Button, Input, Label, Text, TextArea, YStack} from "tamagui";
import * as React from 'react';
import {useForm, Controller, Control, FieldErrors} from "react-hook-form";
import {AddRecipeFormData} from "../../app/(recipe)/add-recipe";
import {useAppDispatch} from "../../store/hooks";
import {updateTitle} from "../../store/slices/recipe/addRecipeSlice";

interface Props {
    control: Control<AddRecipeFormData, any>,
    errors: FieldErrors<AddRecipeFormData>
}

export function RecipeForm({control, errors}: Props) {
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
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        id='title'
                        size="$4"
                        onBlur={onBlur}
                        onChangeText={(e) => handleUpdateTitle(e, onChange)}
                        value={value}  />
                )}
                name='title'
            />
            {errors.title && <Text>This is required.</Text>}

            <Label htmlFor="description">Description</Label>
            <Controller
                control={control}
                rules={{required: true}}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextArea
                        id='description'
                        size="8"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name='description'
            />
            {errors.description && <Text>This is required.</Text>}




            <Label htmlFor="time">Time</Label>
            <Input id='time' size="$4"  />

            <Label htmlFor="typeOfMeasure">Type of measure</Label>
            <Input id='typeOfMeasure' size="$4" />

            <Label htmlFor="amountFromMeasure">Amount from measure</Label>
            <Input id='amountFromMeasure' size="$4" />
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
