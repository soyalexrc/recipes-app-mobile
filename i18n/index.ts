import en from './en';
import es from './es';
import {Dictionary} from "../constants/interfaces/dictionary";

const dictionaries: Record<string, Dictionary> = { en, es }

export const getDictionary = (locale: string) => dictionaries[locale];
