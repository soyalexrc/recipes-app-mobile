import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import {Asset} from 'expo-asset';
import {FullRecipe} from "../../constants/interfaces/recipe";

export async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.Database> {
    const db = SQLite.openDatabase(pathToDatabaseFile);
    // Create tables if they don't exist
    db.transaction(tx => {
        // Create "recipes" table
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS recipes
            (
                id               TEXT PRIMARY KEY,
                userId           TEXT,
                title            TEXT,
                category         TEXT,
                description      TEXT,
                estimatedTime    TEXT,
                typeOfPortion    TEXT,
                amountOfPortions TEXT,
                image            TEXT,
                steps            TEXT,
                ingredients      TEXT
            );
        `);
    });
    return db
}

export async function createRecipe(recipe: FullRecipe): Promise<void> {
    try {
        const db = await openDatabase('recipesApp.db');
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO recipes (id, userId, title, category, description, estimatedTime, typeOfPortion, amountOfPortions, image, steps, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
                    [
                        recipe.id!,
                        recipe.userId!,
                        recipe.title,
                        recipe.category,
                        recipe.description,
                        recipe.estimatedTime,
                        recipe.typeOfPortion,
                        recipe.amountOfPortions,
                        recipe.image,
                        JSON.stringify(recipe.steps),
                        JSON.stringify(recipe.ingredients)
                    ],
                    (_, results) => {
                        console.log('Recipe inserted with ID:', results.insertId);
                        resolve();
                    },
                    (_, error) => {
                        reject(error);
                        console.error('Error inserting recipe:', error);
                    }
                );
            });

        })
    } catch (error) {
        console.log(error);
    }
}

export async function getAllRecipes(): Promise<FullRecipe[]> {
    try {
        const db = await openDatabase('recipesApp.db');
        return new Promise<FullRecipe[]>((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'SELECT * FROM recipes;',
                        [],
                        (_, { rows }) => {
                            const result: FullRecipe[] = rows._array;
                            resolve(result);
                        },
                        (_, error) => {
                            console.error('Error reading recipes:', error);
                            reject(error);
                        }
                    );
                },
                // Add error handling for the transaction itself
                (_, error) => {
                    console.error('Transaction error:', error);
                    reject(error);
                }
            );
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getRecipesPaginated(pageNumber: number, pageSize: number): Promise<FullRecipe[]> {
    try {
        const db = await openDatabase('recipesApp.db');
        const offset = (pageNumber - 1) * pageSize;

        return new Promise<FullRecipe[]>((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'SELECT * FROM recipes LIMIT ? OFFSET ?;',
                        [pageSize, offset],
                        (_, { rows }) => {
                            const result: FullRecipe[] = rows._array;
                            console.log(`Recipes Page ${pageNumber} (PageSize: ${pageSize}):`, result);
                            resolve(result);
                        },
                        (_, error) => {
                            console.error('Error reading recipes:', error);
                            reject(error);
                        }
                    );
                },
                (_, error) => {
                    console.error('Transaction error:', error);
                    reject(error);
                }
            );
        });
    } catch (error) {
        console.error('Error accessing the database:', error);
        throw error;
    }
}


export async function dropDatabase(databaseName: string): Promise<void> {
    try {
        const dbPath = `${FileSystem.documentDirectory}SQLite/${databaseName}`;

        // Open the database to ensure it's closed before deleting the file
        const db = SQLite.openDatabase(databaseName);
        db.closeAsync();

        // Delete the database file
        await FileSystem.deleteAsync(dbPath, { idempotent: true });
        console.log(`Database "${databaseName}" dropped successfully.`);
    } catch (error) {
        console.error(`Error dropping database "${databaseName}":`, error);
    }
}

export async function updateRecipe(recipeId: string, updatedData: Partial<FullRecipe>): Promise<void> {
    try {
        const db = await openDatabase('recipesApp.db');

        return new Promise<void>((resolve, reject) => {
            db.transaction(
                tx => {
                    // Update the "recipes" table with the provided data
                    const updateStatement = Object.keys(updatedData)
                        .map(key => `${key} = ?`)
                        .join(', ');

                    const updateValues = JSON.stringify(Object.values(updatedData));

                    tx.executeSql(
                        `UPDATE recipes SET ${updateStatement} WHERE id = ?;`,
                        [...updateValues, recipeId],
                        (_, { rowsAffected }) => {
                            if (rowsAffected > 0) {
                                console.log(`Recipe with ID ${recipeId} updated successfully.`);
                                resolve();
                            } else {
                                console.warn(`No recipe with ID ${recipeId} found for update.`);
                                reject(new Error(`Recipe not found for update.`));
                            }
                        },
                        (_, error) => {
                            console.error('Error updating recipe:', error);
                            reject(error);
                        }
                    );
                },
                (_, error) => {
                    console.error('Transaction error:', error);
                    reject(error);
                }
            );
        });
    } catch (error) {
        console.error('Error accessing the database:', error);
        throw error;
    }
}
