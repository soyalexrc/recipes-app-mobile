import {Button, Sheet, XStack, YStack} from "tamagui";
import {useState} from "react";
import * as React from 'react';
import {Ionicons} from "@expo/vector-icons";

interface Props {
    open: boolean,
    setOpen: (val: boolean) => void;
    close: () => void;
    children: React.ReactNode
}

export function InformativeSheet({open, setOpen, close, children}: Props) {


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
            <Sheet.Frame padding="$4">
                <Sheet.ScrollView>
                    <XStack justifyContent='flex-end'>
                        <Button iconAfter={<Ionicons name="close" size={24} color="black" />} onPress={close}>
                            Close
                        </Button>
                    </XStack>
                    {children}
                </Sheet.ScrollView>
            </Sheet.Frame>
        </Sheet>
    )
}
