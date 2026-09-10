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
                    to="/"
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

                        <button
                            type="button"
                            className={styles.link}
                        >
                            <Heart size={20}/>
                            Favorites
                        </button>

                        <button
                            type="button"
                            className={styles.createButton}
                        >
                            <Plus size={18}/>
                            Create Route
                        </button>
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
                            to="/profile"
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

                    <div className={styles.language}>
                        <span>Language</span>

                        <select
                            defaultValue={user.preferredLanguage}
                            aria-label="Language"
                        >
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                        </select>
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