import {
    Compass,
    Heart,
    LogOut,
    MapPinned,
    Plus,
    Settings,
    User,
} from 'lucide-react';
import logo from '../../../shared/assets/logo-icon.svg';
import {Link, useNavigate} from '@tanstack/react-router';
import {useQuery} from '@tanstack/react-query';
import {currentUserQueryOptions} from '../../../entities/user';
import {useLogoutMutation} from '../../../features/auth';
import styles from './Sidebar.module.css';
import {LanguageSwitcher} from "../../../shared/ui/language-switcher";
import {appRoutes} from "../../../shared/lib/routes.ts";

export function Sidebar() {
    const navigate = useNavigate();
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
                <img
                    src={logo}
                    alt=""
                    className={styles.logoImage}
                />
                <span>RoadBook</span>
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
                    Explore
                </Link>

                {user && (
                    <>
                        <button
                            type="button"
                            className={styles.link}
                        >
                            <MapPinned size={20}/>
                            My Routes
                        </button>

                        <Link
                            to={appRoutes.favorites}
                            className={styles.link}
                            activeProps={{
                                className: `${styles.link} ${styles.active}`,
                            }}
                        >
                            <Heart size={20}/>
                            Favorites
                        </Link>

                        <Link
                            to={appRoutes.createRoute}
                            className={styles.createButton}
                        >
                            <Plus size={18}/>
                            Create Route
                        </Link>
                    </>
                )}
            </nav>


            {user && (
                <>
                    <div className={styles.accountSection}>
                        <span className={styles.sectionTitle}>
                            Account
                        </span>

                        <Link
                            to={appRoutes.profile}
                            className={styles.link}
                            activeProps={{
                                className: `${styles.link} ${styles.active}`,
                            }}
                        >
                            <User size={20}/>
                            Profile
                        </Link>

                        <button
                            type="button"
                            className={styles.link}
                        >
                            <Settings size={20}/>
                            Settings
                        </button>
                    </div>

                    <div className={styles.userCard}>
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
                            <span>View profile</span>
                        </div>
                    </div>

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
                        Log out
                    </button>
                </>
            )}
        </aside>
    )
}