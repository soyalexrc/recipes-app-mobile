import en from './en';
import es from './es';

const dictionaries: Record<string, any> = {
    en,
    es
}

export const getDictionary = (locale: string) => dictionaries[locale];