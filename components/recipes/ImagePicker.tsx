import {View} from "react-native";
import {Button, Image, Text, YStack} from "tamagui";
import * as Picker from 'expo-image-picker';
import {useState} from "react";
import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectI18n} from "../../store/slices/i18n/i18nSlice";
import {getDictionary} from "../../i18n";
import {updateImage} from "../../store/slices/recipe/recipeFormSlice";

export function ImagePicker() {
    const lng = useAppSelector(selectI18n).language;
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<any>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await Picker.launchImageLibraryAsync({
            mediaTypes: Picker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            dispatch(updateImage(result.assets[0].uri))
        }
    };

    return (
        <YStack>
            {image && <Image source={{ uri: image }} style={{ width: '100%', height: 250 }} />}
            <Button height={image ? 40 : 250} onPress={pickImage}>{getDictionary(lng).recipeForm.selectPicture}</Button>
        </YStack>
    )
}
