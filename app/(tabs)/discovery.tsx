import {Text, View} from "../../components/Themed";
import {Button} from "tamagui";
import {StyleSheet} from "react-native";

export default function DiscoveryScreen() {
    return (
        <View style={styles.container}>
            <Text>Discovery</Text>
            <Button>Hello</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
