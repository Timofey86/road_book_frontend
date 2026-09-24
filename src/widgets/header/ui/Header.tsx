import {Bell, Menu} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { currentUserQueryOptions } from '../../../entities/user';
import styles from './Header.module.css';
import {Link} from "@tanstack/react-router";
import {appRoutes} from "../../../shared/lib/routes.ts";
import { useTranslation } from 'react-i18next';
import {LanguageSwitcher} from "../../../shared/ui/language-switcher";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({onMenuClick}: HeaderProps) {
    const { data: user } = useQuery(currentUserQueryOptions);
    const {t} = useTranslation();
    return (
        <header className={styles.header}>
            <button
                type="button"
                className={styles.menuButton}
                onClick={onMenuClick}
                aria-label={t('navigation.openMenu')}
            >
                <Menu size={22}/>
            </button>

            <div className={styles.actions}>
                {user ? (
                    <>
                        <div className={styles.mobileLanguage}>
                            <LanguageSwitcher variant="compact"/>
                        </div>

                        <button
                            type="button"
                            className={styles.iconButton}
                            aria-label={t('header.notifications')}
                        >
                            <Bell size={20} />
                        </button>

                        <Link
                            to={appRoutes.profile}
                            className={styles.avatarLink}
                            aria-label={t('navigation.profile')}
                        >
                            {user.avatarUrl ? (
                                <img
                                    className={styles.avatar}
                                    src={user.avatarUrl}
                                    alt={user.name}
                                />
                            ) : (
                                <div className={styles.avatarFallback}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to={appRoutes.login}
                            className={styles.signIn}
                        >
                            {t('navigation.signIn')}
                        </Link>

                        <Link
                            to={appRoutes.register}
                            className={styles.signUp}
                        >
                            {t('navigation.signUp')}
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}