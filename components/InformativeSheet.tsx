import {Button, Sheet, YStack} from "tamagui";
import {useState} from "react";
import * as React from 'react';

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
                    <Button size="$6" circular onPress={close}>Close</Button>
                    {children}
                </Sheet.ScrollView>
            </Sheet.Frame>
        </Sheet>
    )
}
