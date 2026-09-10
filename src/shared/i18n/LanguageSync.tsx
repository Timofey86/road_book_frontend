import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { currentUserQueryOptions } from '../../entities/user';
import i18n from './config';

const LANGUAGE_STORAGE_KEY = 'roadbook-language';

export function LanguageSync() {
    const { data: user } = useQuery(currentUserQueryOptions);

    useEffect(() => {
        if (!user) {
            return;
        }

        const language = user.preferredLanguage;

        if (i18n.resolvedLanguage !== language) {
            void i18n.changeLanguage(language);
        }

        localStorage.setItem(
            LANGUAGE_STORAGE_KEY,
            language,
        );
    }, [user]);

    return null;
}