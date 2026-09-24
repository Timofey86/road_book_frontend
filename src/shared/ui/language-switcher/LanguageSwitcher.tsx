import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../../i18n/types';
import styles from './LanguageSwitcher.module.css';
import { useUpdatePreferredLanguageMutation } from '../../../entities/user';

interface LanguageSwitcherProps {
    variant?: 'default' | 'compact';
}

export function LanguageSwitcher({variant = 'default'}: LanguageSwitcherProps) {
    const { t, i18n } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const updateLanguageMutation =  useUpdatePreferredLanguageMutation();
    const currentLanguage: SupportedLanguage = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (language: SupportedLanguage) => {
        if (language === currentLanguage) {
            setIsOpen(false);
            return;
        }

        updateLanguageMutation.mutate(language, {
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };

    return (
        <div
            className={`${styles.wrapper} ${variant === 'compact' ? styles.compact : ''}`}
            ref={wrapperRef}
        >
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setIsOpen((current) => !current)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                disabled={updateLanguageMutation.isPending}
            >
                {variant === 'default' && (
                    <span className={styles.label}>
                        {t('sidebar.language')}
                    </span>
                )}

                <span className={styles.value}>
                    {currentLanguage.toUpperCase()}

                    <ChevronDown
                        size={15}
                        className={isOpen ? styles.chevronOpen : undefined}
                    />
                </span>
            </button>

            {isOpen && (
                <div
                    className={styles.menu}
                    role="listbox"
                >
                    <button
                        type="button"
                        role="option"
                        aria-selected={currentLanguage === 'en'}
                        className={`${styles.option} ${
                            currentLanguage === 'en'
                                ? styles.active
                                : ''
                        }`}
                        onClick={() => void handleSelect('en')}
                        disabled={updateLanguageMutation.isPending}
                    >
                        EN
                    </button>

                    <button
                        type="button"
                        role="option"
                        aria-selected={currentLanguage === 'ru'}
                        className={`${styles.option} ${
                            currentLanguage === 'ru'
                                ? styles.active
                                : ''
                        }`}
                        onClick={() => void handleSelect('ru')}
                        disabled={updateLanguageMutation.isPending}
                    >
                        RU
                    </button>
                </div>
            )}
        </div>
    );
}