import {Button, H3, Sheet, XStack, YStack} from "tamagui";
import {useState} from "react";
import * as React from 'react';
import {Ionicons} from "@expo/vector-icons";

interface Props {
    open: boolean,
    setOpen: (val: boolean) => void;
    children: React.ReactNode
    showHandle?: boolean;
    title?: string;
}

export function InformativeSheet({open, setOpen, title, children, showHandle}: Props) {


    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            modal
            open={open}
            onOpenChange={setOpen}
            snapPoints={[80]}
            snapPointsMode='percent'
            dismissOnSnapToBottom
            zIndex={100_000}
            animation="medium"
        >
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
            />
            {
                showHandle &&
                <Sheet.Handle />
            }
            <Sheet.Frame padding="$4">
                <Sheet.ScrollView>
                    <H3 textAlign='center' marginBottom={10}>{title}</H3>
                    {children}
                </Sheet.ScrollView>
            </Sheet.Frame>
        </Sheet>
    )
}
