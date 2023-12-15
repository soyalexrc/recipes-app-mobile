import {StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import {useEffect} from "react";
import {applyOffset} from "popmotion";
import api from "../../utils/api/api";
import {useFocusEffect} from "expo-router";

export default function CommunityScreen() {

    useFocusEffect(() => {
        sample();
    })

    async function sample() {
        try {
            const {data} = await api.get('user');
            console.log(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text>Community</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
