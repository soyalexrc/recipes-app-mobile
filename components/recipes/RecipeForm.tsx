import {StyleSheet, View} from "react-native";
import {Input, Label, Text, TextArea, YStack} from "tamagui";
import * as React from 'react';

export function RecipeForm() {
    return (
        <YStack>
            <Label htmlFor="title">Title</Label>
            <Input id='title' size="$4"  />

            <Label htmlFor="description">Description</Label>
            <TextArea id='description' size="8"  />

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
    },
});
