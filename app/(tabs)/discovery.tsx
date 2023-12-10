import {Text, View} from "../../components/Themed";
import {Button} from "tamagui";
import {StyleSheet} from "react-native";
import {Stack} from "expo-router/stack";
import {useRouter} from "expo-router";

export default function DiscoveryScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>

            <Text>Discovery</Text>
            <Button onPress={() => router.push('/recipe/(search)/global')}>go to search global</Button>
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
