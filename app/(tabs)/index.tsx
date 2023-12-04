import {StyleSheet} from 'react-native';
import {Button, YStack, Text, ScrollView} from "tamagui";
import {Ionicons} from '@expo/vector-icons';
import {GenericPreviewList} from "../../components/recipes";
import {useRouter} from "expo-router";

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

    return (
        <YStack style={styles.container}>

            <ScrollView f={1} w='100%' showsVerticalScrollIndicator={false}>
                <YStack py={10}>
                    <GenericPreviewList
                        title='Breakfast'
                        category='breakfasts'
                        previewData={sampleData}
                        amount={20}
                    />
                    <GenericPreviewList
                        title='Morning snack'
                        category='morning-snacks'
                        previewData={sampleData}
                        amount={20}
                    />
                    <GenericPreviewList
                        title='Lunch'
                        category='breakfasts'
                        previewData={[]}
                        amount={0}
                    />
                    <GenericPreviewList
                        title='Afternoon snack'
                        category='afternoon-snacks'
                        previewData={sampleData}
                        amount={20}
                    />
                    <GenericPreviewList
                        title='Dinner'
                        category='breakfasts'
                        previewData={sampleData.slice(0, 1)}
                        amount={20}
                    />
                    <GenericPreviewList
                        title='Dessert'
                        category='breakfasts'
                        previewData={sampleData.slice(0, 2)}
                        amount={20}
                    />
                </YStack>
                <YStack height={50} />

            </ScrollView>
            <Button onPress={() => router.push('/recipe/add-edit/new')} backgroundColor='$background' icon={<Ionicons name="add" size={24} color="black"/>} style={styles.fab}>
                Add recipe
            </Button>
        </YStack>
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
