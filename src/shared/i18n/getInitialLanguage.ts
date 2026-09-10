import type { SupportedLanguage } from './types';
const LANGUAGE_STORAGE_KEY = 'roadbook-language';

export function getInitialLanguage(): SupportedLanguage {
    const savedLanguage = localStorage.getItem(
        LANGUAGE_STORAGE_KEY,
    );

    if (
        savedLanguage === 'en' ||
        savedLanguage === 'ru'
    ) {
        return savedLanguage;
    }

    const browserLanguage = navigator.language
        .split('-')[0]
        .toLowerCase();

    if (browserLanguage === 'ru') {
        return 'ru';
    }

    return 'en';
}