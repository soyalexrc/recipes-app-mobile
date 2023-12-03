import {Adapt, getFontSize, Select, SelectProps, Sheet, YStack} from "tamagui";
import {useMemo, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "tamagui/linear-gradient";
import * as React from "react";

interface Props extends SelectProps {
    title: string;
    options: any[];
}

export function CustomSelect(props: Props) {

    return (
        <Select
            id={props.id}
            value={props.value}
            onValueChange={props.onValueChange}
            disablePreventBodyScroll
            {...props}
        >
            <Select.Trigger flex={1} iconAfter={<Ionicons name="chevron-down" size={20} color="black" />}>
                <Select.Value placeholder="Select an option" />
            </Select.Trigger>

            <Adapt  platform="touch">
                <Sheet
                    modal
                    snapPoints={[50]}
                    dismissOnSnapToBottom
                    animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}
                >
                    <Sheet.Frame paddingVertical={20}>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>

                <Select.Viewport
                    // to do animations:
                    // animation="quick"
                    // animateOnly={['transform', 'opacity']}
                    // enterStyle={{ o: 0, y: -10 }}
                    // exitStyle={{ o: 0, y: 10 }}
                    minWidth={200}
                >
                    <Select.Group>
                        <Select.Label>{props.title}</Select.Label>
                        {/* for longer lists memoizing these is useful */}
                        {useMemo(
                            () =>
                                props.options.map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.name}
                                            value={item.value.toLowerCase()}
                                        >
                                            <Select.ItemText>{item.name}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Ionicons name="checkmark" size={16} color="black" />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [props.options]
                        )}
                    </Select.Group>
                </Select.Viewport>

            </Select.Content>
        </Select>
    )
}
