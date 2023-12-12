import {View} from "react-native";
import {ListItem, ScrollView, Separator, Text, YGroup, YStack} from "tamagui";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BasicCustomHeader} from "../components/BasicCustomHeader";
import {Ionicons} from "@expo/vector-icons";

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    return (
        <YStack backgroundColor='#fff' flex={1} paddingTop={insets.top} paddingHorizontal={10}>
            <BasicCustomHeader title='Settings'/>
            <ScrollView marginTop={10}>
                <YGroup separator={<Separator />}>
                    <YGroup.Item>
                        <ListItem
                            pressTheme
                            icon={<Ionicons name="language" size={24} color="black" />}
                            title="Select language"
                            subTitle="Change the language configuration"
                        />
                    </YGroup.Item>
                </YGroup>
            </ScrollView>
        </YStack>
    )
}
