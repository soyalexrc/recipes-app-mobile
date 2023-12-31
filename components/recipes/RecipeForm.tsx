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
import {AddRecipeFormData} from "../../app/recipe/add-edit/[id]";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {updateTitle} from "../../store/slices/recipe/recipeSlice";
import {useMemo, useState} from "react";
import {Ionicons, Octicons} from "@expo/vector-icons";
import {LinearGradient} from 'tamagui/linear-gradient'
import {CustomSelect} from "../CustomSelect";
import {selectI18n} from "../../store/slices/i18n/i18nSlice";
import {getDictionary} from "../../i18n";

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
    {name: 'Person', value: 'Person'},
    {name: 'Ration', value: 'Ration'},
    {name: 'Unit', value: 'Unit'},
    {name: 'Slice', value: 'Slice'},
]

const categoryOptions = [
    {name: 'Breakfast', value: 'breakfast'},
    {name: 'Morning snack', value: 'morning-snack'},
    {name: 'Lunch', value: 'lunch'},
    {name: 'Afternoon snack', value: 'afternoon-snack'},
    {name: 'Dinner', value: 'dinner'}
]

export function RecipeForm({control, errors, getValues, setValue}: Props) {
    const lng = useAppSelector(selectI18n).language;
    const dispatch = useAppDispatch();
    const handleUpdateTitle = (title: string, fn: (v: string) => void) => {
        dispatch(updateTitle(title));
        fn(title);
    }

    return (
        <YStack>
            <Label htmlFor="title">{getDictionary(lng).recipeForm.titleLabel}</Label>
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
            {errors.title && <Text>{getDictionary(lng).recipeForm.requiredField}</Text>}

            <Label htmlFor="description">{getDictionary(lng).recipeForm.descriptionLabel}</Label>
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
            {errors.description && <Text>{getDictionary(lng).recipeForm.requiredField}</Text>}

            <YStack marginVertical={10}>
                <Label flex={1} fb={0}>
                    {getDictionary(lng).recipeForm.categoryLabel}
                </Label>
                <CustomSelect title='Category' options={categoryOptions} value={getValues('category')}
                              onValueChange={(value) => setValue('category', value)}/>
                {errors.category && <Text>{getDictionary(lng).recipeForm.requiredField}</Text>}
            </YStack>

            <XStack justifyContent='center'>
                <View style={styles.separator}/>
            </XStack>

            <YStack marginVertical={10}>
                <Label flex={1} fb={0}>
                    {getDictionary(lng).recipeForm.estimatedTimeLabel}
                </Label>
                <CustomSelect title={getDictionary(lng).recipeForm.estimatedTimeLabel} options={timeOptions} value={getValues('estimatedTime')}
                              onValueChange={(value) => setValue('estimatedTime', value)}/>
                {errors.estimatedTime && <Text>{getDictionary(lng).recipeForm.requiredField}</Text>}
            </YStack>


            <YStack>
                <Label flex={1} fb={0}>
                    {getDictionary(lng).recipeForm.ingredientsForHowManyLabel}
                </Label>
                <XStack gap={10}>
                    <YStack flex={1}>
                        <Controller
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    id='amountOfPortions'
                                    size="$4"
                                    onBlur={onBlur}
                                    keyboardType='numeric'
                                    onChangeText={onChange}
                                    value={value}/>
                            )}
                            name='amountOfPortions'
                        />
                        {errors.amountOfPortions && <Text>{getDictionary(lng).recipeForm.requiredField}</Text>}
                    </YStack>
                    <CustomSelect title={getDictionary(lng).recipeForm.typeOfPortionLabel} options={portions} value={getValues('typeOfPortion')}
                                  onValueChange={(value) => setValue('typeOfPortion', value)}/>
                    {errors.typeOfPortion && <Text>{getDictionary(lng).recipeForm.requiredField}</Text>}
                </XStack>
            </YStack>
            <XStack justifyContent='center'>
                <View style={styles.separator}/>
            </XStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginTop: 20,
        height: 1,
        backgroundColor: 'lightgray',
        width: '80%',
    }
});
