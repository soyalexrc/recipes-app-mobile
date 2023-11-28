import {Text, YStack} from "tamagui";
import PagerView from 'react-native-pager-view';
import {StyleSheet, View} from "react-native";

export function TopTabs() {
    return (
        <PagerView style={styles.viewPager} initialPage={0}>
            <View style={styles.page} key="1">
                <Text>First page</Text>
                <Text>Swipe ➡️</Text>
            </View>
            <View style={styles.page} key="2">
                <Text>Second page</Text>
            </View>
            <View style={styles.page} key="3">
                <Text>Third page</Text>
            </View>
        </PagerView>
    )
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        backgroundColor: 'black',
        height: 500,
        width: '100%',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
