import { Bell, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { currentUserQueryOptions } from '../../../entities/user';
import styles from './Header.module.css';
import {Link} from "@tanstack/react-router";
import {appRoutes} from "../../../shared/lib/routes.ts";

export function Header() {
    const { data: user } = useQuery(currentUserQueryOptions);
    return (
        <header className={styles.header}>
            <div className={styles.search}>
                <Search size={18} />

                <input
                    type="search"
                    placeholder="Search routes, destinations, users..."
                />
            </div>

            <div className={styles.actions}>
                {user ? (
                    <>
                        <button
                            type="button"
                            className={styles.iconButton}
                            aria-label="Notifications"
                        >
                            <Bell size={20} />
                        </button>

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
                    </>
                ) : (
                    <>
                        <Link
                            to={appRoutes.login}
                            className={styles.signIn}
                        >
                            Sign in
                        </Link>

                        <Link
                            to={appRoutes.register}
                            className={styles.signUp}
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}