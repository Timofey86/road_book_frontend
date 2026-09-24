import {
    Compass,
    Heart,
    LogOut,
    MapPinned,
    Plus,
    User,
    X,
} from 'lucide-react';
import logo from '../../../shared/assets/logo.png';
import {Link, useNavigate} from '@tanstack/react-router';
import {useQuery} from '@tanstack/react-query';
import {currentUserQueryOptions} from '../../../entities/user';
import {useLogoutMutation} from '../../../features/auth';
import styles from './Sidebar.module.css';
import {LanguageSwitcher} from "../../../shared/ui/language-switcher";
import {appRoutes} from "../../../shared/lib/routes.ts";
import {useTranslation} from 'react-i18next';
import {useState} from "react";
import {AuthRequiredModal} from "../../../features/auth-required-modal";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({isOpen, onClose}: SidebarProps) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {data: user} = useQuery(currentUserQueryOptions);
    const logoutMutation = useLogoutMutation();

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);


    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate({to: '/login'});
            },
        });
    };

    const handleGuestCreateRoute = () => {
        onClose();
        setIsAuthModalOpen(true);
    };

    return (
        <>
            <aside className={`${styles.sidebar} ${
                isOpen ? styles.sidebarOpen : ''
            }`}>
                <div className={styles.sidebarHeader}>
                    <Link
                        to={appRoutes.home}
                        className={styles.logo}
                        onClick={onClose}
                    >
                        <img
                            src={logo}
                            alt="roadbook_logo"
                            className={styles.logoImage}
                        />
                    </Link>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label={t('navigation.closeMenu')}
                    >
                        <X size={22}/>
                    </button>
                </div>

                <nav className={styles.navigation}>
                    <Link
                        to={appRoutes.home}
                        className={styles.link}
                        activeProps={{
                            className: `${styles.link} ${styles.active}`,
                        }}
                        onClick={onClose}
                    >
                        <Compass size={20}/>
                        {t('navigation.explore')}
                    </Link>

                    {user && (
                        <>
                            <Link
                                to={appRoutes.myRoutes}
                                className={styles.link}
                                activeProps={{
                                    className: `${styles.link} ${styles.active}`,
                                }}
                                onClick={onClose}
                            >
                                <MapPinned size={20}/>
                                {t('navigation.myRoutes')}
                            </Link>

                            <Link
                                to={appRoutes.favorites}
                                className={styles.link}
                                activeProps={{
                                    className: `${styles.link} ${styles.active}`,
                                }}
                                onClick={onClose}
                            >
                                <Heart size={20}/>
                                {t('navigation.favorites')}
                            </Link>
                        </>
                    )}

                    {user ? (
                        <Link
                            to={appRoutes.createRoute}
                            className={styles.createButton}
                            onClick={onClose}
                        >
                            <Plus size={18}/>
                            {t('navigation.createRoute')}
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className={styles.createButton}
                            onClick={handleGuestCreateRoute}
                        >
                            <Plus size={18}/>
                            {t('navigation.createRoute')}
                        </button>
                    )}
                </nav>

                {user && (
                    <>
                        <div className={styles.accountSection}>
                        <span className={styles.sectionTitle}>
                            {t('navigation.account')}
                        </span>

                            <Link
                                to={appRoutes.profile}
                                className={styles.link}
                                activeProps={{
                                    className: `${styles.link} ${styles.active}`,
                                }}
                                onClick={onClose}
                            >
                                <User size={20}/>
                                {t('navigation.profile')}
                            </Link>
                        </div>

                        <Link
                            to={appRoutes.profile}
                            className={styles.userCard}
                            onClick={onClose}
                        >
                            {user.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    className={styles.avatar}
                                />
                            ) : (
                                <div className={styles.avatarFallback}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                <span>{t('navigation.viewProfile')}</span>
                            </div>
                        </Link>

                        <div className={styles.languageRow}>
                            <LanguageSwitcher/>
                        </div>

                        <button
                            type="button"
                            className={styles.logout}
                            onClick={handleLogout}
                            disabled={logoutMutation.isPending}
                        >
                            <LogOut size={18}/>
                            {t('navigation.logout')}
                        </button>
                    </>
                )}
                <footer className={styles.footer}>
                    <span>
                    Made with <span className={styles.heart}>♥</span> by{' '}
                    <a
                        href="https://github.com/Timofey86"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Timofej Mukhin
                    </a>
                    </span>
                </footer>
            </aside>

            <AuthRequiredModal
                open={isAuthModalOpen}
                description={t('authRequired.createRoute')}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
}