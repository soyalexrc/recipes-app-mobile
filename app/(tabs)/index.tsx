import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, YStack, Text, ScrollView, XStack, Image} from "tamagui";
import {Ionicons} from '@expo/vector-icons';
import {GenericPreviewList} from "../../components/recipes";
import {useFocusEffect, useRouter} from "expo-router";
import {selectI18n} from '../../store/slices/i18n/i18nSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getDictionary} from "../../i18n";
import {selectNavigation, updateCurrent, updatePrev} from "../../store/slices/navigation/navigationSlice";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import * as SQLite from 'expo-sqlite';
import {dropDatabase, getAllRecipes, openDatabase} from "../../utils/db";
import {FlashList} from "@shopify/flash-list";
import {FullRecipe} from "../../constants/interfaces/recipe";
import {selectNetwork} from "../../store/slices/network/networkSlice";

const sampleData = [
    {
        id: '1',
        title: 'Sample title',
    },
    {
        id: '2',
        title: 'Sample title 2',
    },
    {
        id: '3',
        title: 'Sample title 3',
    },
    {
        id: '4',
        title: 'Sample title 4',
    },

]

export default function MyRecipesScreen() {
    const router = useRouter();
    const lng = useAppSelector(selectI18n).language;
    const network = useAppSelector(selectNetwork);
    const {current, prev} = useAppSelector(selectNavigation);
    const dispatch = useAppDispatch();
    const [localRecipes, setLocalRecipes] = useState<FullRecipe[]>([])
    useFocusEffect(() => {
        dispatch(updatePrev(current))
        dispatch(updateCurrent('my-recipes'))
    })

    useEffect(() => {
        checkDatabase()
    }, []);

    async function checkDatabase() {
        const data = await getAllRecipes();
        setLocalRecipes(data);
    }

    return (
        <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: '#fff'}}>
            <YStack style={styles.container}>
                <ScrollView f={1} w='100%' showsVerticalScrollIndicator={false}>
                    <YStack p={10} height='100%'>
                        <FlashList
                            data={localRecipes}
                            numColumns={2}
                            estimatedItemSize={50}
                            ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    onPress={() => router.push('/recipe/detalle/local/123')}
                                    style={{ width: '100%'}}
                                    key={item.id}>
                                    <YStack paddingRight={index % 2 === 0 && 5} paddingLeft={index % 2 !== 0 && 5}
                                            width={'100%'}>
                                        <Image
                                            source={{uri: item.image,}}
                                            width='100%'
                                            height={150}
                                            style={{borderRadius: 10}}
                                        />
                                        <Text>{item.title}</Text>
                                    </YStack>
                                </TouchableOpacity>
                            )}
                        />
                    </YStack>
                    <YStack height={50}/>

                </ScrollView>
                <Button onPress={() => router.push('/recipe/add-edit/new')} backgroundColor='$background'
                        icon={<Ionicons name="add" size={24} color="black"/>} style={styles.fab}>
                    {getDictionary(lng).common.addRecipe}
                </Button>
            </YStack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20
    }
});
