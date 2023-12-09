import {StyleSheet} from 'react-native';
import {Button, YStack, Text, ScrollView, XStack} from "tamagui";
import {Ionicons} from '@expo/vector-icons';
import {GenericPreviewList} from "../../components/recipes";
import {useFocusEffect, useRouter} from "expo-router";
import {selectI18n} from '../../store/slices/i18n/i18nSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getDictionary} from "../../i18n";
import {selectNavigation, updateCurrent, updatePrev} from "../../store/slices/navigation/navigationSlice";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect} from "react";
import * as SQLite from 'expo-sqlite';

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
    const {current, prev} = useAppSelector(selectNavigation);
    const dispatch = useAppDispatch();

    useFocusEffect(() => {
        dispatch(updatePrev(current))
        dispatch(updateCurrent('my-recipes'))
    })

    useEffect(() => {
        checkDatabase()
    }, []);

    function checkDatabase() {
        try {
            const db = SQLite.openDatabase('recipesApp.db');

            db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)')
            })

            // db.transaction(tx => {
            //     tx.executeSql('INSERT INTO recipes (title) values (?)', ['pan de jamon navideno'],
            //         (txObj, resultSet) => {
            //             console.log(txObj, resultSet);
            //         },
            //         (txObj, error) => {
            //             console.log(error);
            //         }
            //     )
            // }, (error) => {
            //     console.log(error);
            // })

            db.transaction(tx => {
                tx.executeSql('SELECT * FROM recipes', [],
                    (txObj, {rows}) => {
                        console.log('Data from database:', rows._array)
                    }, (error) => {
                        console.log(error)
                    })
            })
        } catch (error) {
            console.error('Error accessing the database:', error);
        }
    }

    return (
        <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: '#fff'}}>
            <YStack style={styles.container}>
                <ScrollView f={1} w='100%' showsVerticalScrollIndicator={false}>
                    <YStack py={10}>
                        <GenericPreviewList
                            title={getDictionary(lng).myRecipes.breakfastTitle}
                            category='breakfasts'
                            previewData={sampleData}
                            amount={20}
                        />
                        <GenericPreviewList
                            title={getDictionary(lng).myRecipes.morningSnackTitle}
                            category='morning-snacks'
                            previewData={sampleData}
                            amount={20}
                        />
                        <GenericPreviewList
                            title={getDictionary(lng).myRecipes.lunchTitle}
                            category='breakfasts'
                            previewData={[]}
                            amount={0}
                        />
                        <GenericPreviewList
                            title={getDictionary(lng).myRecipes.afternoonSnack}
                            category='afternoon-snacks'
                            previewData={sampleData}
                            amount={20}
                        />
                        <GenericPreviewList
                            title={getDictionary(lng).myRecipes.dinnerTitle}
                            category='breakfasts'
                            previewData={sampleData.slice(0, 1)}
                            amount={20}
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
