import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as Localization from 'expo-localization';

function getLocale() {
    const locale =  Localization.locale.substring(0, 2);

    if (locale !== 'es' && locale !== 'en') return 'en';

    return locale
}



const initialState: {language: string} = {
    language: getLocale(),
}


export const i18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string> ) => {
            state.language = action.payload;
        }
    }
});

export const {
    changeLanguage
} = i18nSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectI18n = (state: RootState) => state.i18n

export default i18nSlice.reducer
