import { En } from './langs/en';
import { Th } from './langs/th';
export interface Dictionary { [lang: string]: { [key: string]: string } }
export const TranslationTable: Dictionary = {
 en : En,
 th: Th
};
