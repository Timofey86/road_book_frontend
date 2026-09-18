import {
    Compass,
    Heart,
    LogOut,
    MapPinned,
    Plus,
    User,
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

export function Sidebar() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {data: user} = useQuery(currentUserQueryOptions);
    const logoutMutation = useLogoutMutation();


    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate({to: '/login'});
            },
        });
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <Link to={appRoutes.home}>
                <img
                    src={logo}
                    alt="roadbook_logo"
                    className={styles.logoImage}
                />
                </Link>
            </div>

            <nav className={styles.navigation}>
                <Link
                    to={appRoutes.home}
                    className={styles.link}
                    activeProps={{
                        className: `${styles.link} ${styles.active}`,
                    }}
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
                                className: `${styles.navItem} ${styles.active}`,
                            }}
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
                        >
                            <Heart size={20}/>
                            {t('navigation.favorites')}
                        </Link>

                        <Link
                            to={appRoutes.createRoute}
                            className={styles.createButton}
                        >
                            <Plus size={18}/>
                            {t('navigation.createRoute')}
                        </Link>
                    </>
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
                        >
                            <User size={20}/>
                            {t('navigation.profile')}
                        </Link>
                    </div>

                    <Link
                        to={appRoutes.profile}
                        className={styles.userCard}
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
                        <LanguageSwitcher />
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
        </aside>
    )
}