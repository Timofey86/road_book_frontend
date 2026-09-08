import {
    Compass,
    Heart,
    LogOut,
    Map,
    Plus,
    Settings,
    User,
} from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { currentUserQueryOptions } from '../../../entities/user';
import { useLogoutMutation } from '../../../features/auth';
import styles from './Sidebar.module.css';

export function Sidebar() {
    const navigate = useNavigate();
    const { data: user } = useQuery(currentUserQueryOptions);
    const logoutMutation = useLogoutMutation();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate({ to: '/login' });
            },
        });
    };

    return (
        <aside className={styles.sidebar}>
            <div>
                <div className={styles.logo}>
                    <Map size={28} />
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
                        <Compass size={20} />
                        Explore
                    </Link>

                    {user && (
                        <>
                            <Link
                                to="/profile"
                                className={styles.link}
                                activeProps={{
                                    className: `${styles.link} ${styles.active}`,
                                }}
                            >
                                <User size={20} />
                                Profile
                            </Link>

                            <button className={styles.link}>
                                <Heart size={20} />
                                Favorites
                            </button>

                            <button className={styles.link}>
                                <Settings size={20} />
                                Settings
                            </button>

                            <button className={styles.createButton}>
                                <Plus size={18} />
                                Create Route
                            </button>
                        </>
                    )}
                </nav>
            </div>

            {user && (
                <div className={styles.account}>
                    <div className={styles.user}>
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

                        <div>
                            <strong>{user.name}</strong>
                            <span>View profile</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={styles.logout}
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                    >
                        <LogOut size={18} />
                        Log out
                    </button>
                </div>
            )}
        </aside>
    )
}