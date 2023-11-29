import {StyleSheet, View} from "react-native";
import {Input, Label, Text, TextArea, YStack} from "tamagui";

export function RecipeForm() {
    return (
        <YStack>
            <YStack alignItems='center'>
                <View style={styles.separator} />
            </YStack>
            <Label htmlFor="title">Title</Label>
            <Input id='title' size="$4" borderWidth={2} />

            <Label htmlFor="description">Description</Label>
            <TextArea id='description' size="8" borderWidth={2} />

        </YStack>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 30,
        height: 1,
        backgroundColor: 'red',
        width: '80%',
    },
});
