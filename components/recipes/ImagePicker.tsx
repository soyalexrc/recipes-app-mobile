import {View} from "react-native";
import {Button, Image, Text} from "tamagui";
import * as Picker from 'expo-image-picker';
import {useState} from "react";

export function ImagePicker() {
    const [image, setImage] = useState<any>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await Picker.launchImageLibraryAsync({
            mediaTypes: Picker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View>
            <Button onPress={pickImage}>Pick an image from camera roll</Button>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    )
}
