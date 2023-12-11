export interface AddRecipeSliceState {
    title: string;
    image: string;
    steps: Step[],
    ingredients: Ingredient[]
}

export interface Ingredient {
    id?: string;
    quantity: string;
    measure: string;
    product: string;
}

export interface Step {
    id?: string;
    title: string;
    description: string;
    image?: string;
}

export interface FullRecipe {
    id?: string | number | null;
    localId: string;
    userId?: string | null;
    category: string;
    title: string;
    image: string;
    estimatedTime: string;
    description: string;
    amountOfPortions: string;
    typeOfPortion: string;
    steps: Step[],
    ingredients: Ingredient[]
}
