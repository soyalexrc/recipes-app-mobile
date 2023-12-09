import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

export async function openDatabase(): Promise<SQLite.Database> {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    // const destinationPath = FileSystem.documentDirectory + 'SQLite/recipesApp.db';
    await FileSystem.downloadAsync(
        Asset.fromModule(require('recipesApp.db')).uri,
        FileSystem.documentDirectory + 'SQLite/recipesApp.db'
    );
    // await FileSystem.downloadAsync(
    //     Asset.fromModule(require(pathToDatabaseFile)).uri,
    //     destinationPath
    // );
    return SQLite.openDatabase('recipesApp');
}
