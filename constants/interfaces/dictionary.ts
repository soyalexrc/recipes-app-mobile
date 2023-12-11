export interface Dictionary {
    common: Common,
    myRecipes: MyRecipes,
    recipeDetail: RecipeDetail,
    discovery: Discovery,
    community: Community,
    profile: Profile,
    recipeForm: RecipeForm
}

interface Common {
    loading: string;
    ingredients: string,
    of: string,
    addRecipe: string;
    back: string;
    seeAll: string;
    underDevelopment: string;
}

interface MyRecipes {
    pageTitle: string;
    breakfastTitle: string;
    morningSnackTitle: string;
    lunchTitle: string;
    afternoonSnack: string;
    dinnerTitle: string;
}

interface Community {
    pageTitle: string;
}

interface Profile {
    pageTitle: string;
}

interface Discovery {
    pageTitle: string;
}

interface RecipeForm {
    newRecipe: string;
    selectPicture: string;
    titleLabel: string;
    descriptionLabel: string;
    categoryLabel: string;
    estimatedTimeLabel: string;
    ingredientsForHowManyLabel: string;
    selectOption: string;
    typeOfPortionLabel: string;
    ingredientsLabel: string;
    stepsLabel: string;
    submitLabel: string;
    requiredField: string;
}

interface RecipeDetail {
    people: string,
    likeThis: string,
    person: string,
    readyIn: string,
    under: string,
    ingredientsFor: string,
    nutritionInformation: string,
    tipsAndComments: string,
    preparation: string,
    stepByStepMode: string,
}
