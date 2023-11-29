import {View} from "react-native";
import {Button, H2, Input, Paragraph, Sheet, SheetProps, Text, XStack, YStack} from "tamagui";
import {useState} from "react";
import { Ionicons } from '@expo/vector-icons';

const spModes = ['percent', 'constant', 'fit', 'mixed'] as const


export function RecipeIngredients() {
    const [position, setPosition] = useState(0)
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(true)
    const [innerOpen, setInnerOpen] = useState(false)
    const [snapPointsMode, setSnapPointsMode] =
        useState<(typeof spModes)[number]>('percent')
    const [mixedFitDemo, setMixedFitDemo] = useState(false)

    const isPercent = snapPointsMode === 'percent'
    const isConstant = snapPointsMode === 'constant'
    const isFit = snapPointsMode === 'fit'
    const isMixed = snapPointsMode === 'mixed'
    const snapPoints = isPercent
        ? [85, 50, 25]
        : isConstant
            ? [256, 190]
            : isFit
                ? undefined
                : mixedFitDemo
                    ? ['fit', 110]
                    : ['80%', 256, 190]
    return (
        <>
            <YStack space>
                <XStack space $sm={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Button onPress={() => setOpen(true)}>Open</Button>
                    <Button onPress={() => setModal((x) => !x)}>
                        {modal ? 'Type: Modal' : 'Type: Inline'}
                    </Button>
                    <Button
                        onPress={() =>
                            setSnapPointsMode(
                                (prev) => spModes[(spModes.indexOf(prev) + 1) % spModes.length]
                            )
                        }
                    >
                        {`Mode: ${
                            { percent: 'Percentage', constant: 'Constant', fit: 'Fit', mixed: 'Mixed' }[
                                snapPointsMode
                                ]
                        }`}
                    </Button>
                </XStack>
                {isMixed ? (
                    <Button onPress={() => setMixedFitDemo((x) => !x)}>
                        {`Snap Points: ${JSON.stringify(snapPoints)}`}
                    </Button>
                ) : (
                    <XStack paddingVertical="$2.5" justifyContent="center">
                        <Paragraph>{`Snap Points: ${
                            isFit ? '(none)' : JSON.stringify(snapPoints)
                        }`}</Paragraph>
                    </XStack>
                )}
            </YStack>

            <Sheet
                forceRemoveScrollEnabled={open}
                modal={modal}
                open={open}
                onOpenChange={setOpen}
                snapPoints={snapPoints}
                snapPointsMode={snapPointsMode}
                dismissOnSnapToBottom
                position={position}
                onPositionChange={setPosition}
                zIndex={100_000}
                animation="medium"
            >
                <Sheet.Overlay
                    animation="lazy"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <Sheet.Handle />
                <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" space="$5">
                    <Input width={200} />
                    {modal && isPercent && (
                        <>
                            <InnerSheet open={innerOpen} onOpenChange={setInnerOpen} />
                            <Button
                                size="$6"
                                circular
                                icon={<Ionicons name="chevron-up" size={24} color="black" />}
                                onPress={() => setInnerOpen(true)}
                            />
                        </>
                    )}
                </Sheet.Frame>
            </Sheet>
        </>
    )
}

function InnerSheet(props: SheetProps) {
    return (
        <Sheet animation="medium" modal snapPoints={[90]} dismissOnSnapToBottom {...props}>
            <Sheet.Overlay
                animation="medium"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />
            <Sheet.Handle />
            <Sheet.Frame flex={1} justifyContent="center" alignItems="center" space="$5">
                <Sheet.ScrollView>
                    <YStack p="$5" gap="$8">
                        <Button
                            size="$6"
                            circular
                            alignSelf="center"
                            icon={<Ionicons name="chevron-down" size={24} color="black" />}
                            onPress={() => props.onOpenChange?.(false)}
                        />
                        <H2>Hello world</H2>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <Paragraph key={i} size="$8">
                                Eu officia sunt ipsum nisi dolore labore est laborum laborum in esse ad
                                pariatur. Dolor excepteur esse deserunt voluptate labore ea. Exercitation
                                ipsum deserunt occaecat cupidatat consequat est adipisicing velit
                                cupidatat ullamco veniam aliquip reprehenderit officia. Officia labore
                                culpa ullamco velit. In sit occaecat velit ipsum fugiat esse aliqua dolor
                                sint.
                            </Paragraph>
                        ))}
                    </YStack>
                </Sheet.ScrollView>
            </Sheet.Frame>
        </Sheet>
    )
}
