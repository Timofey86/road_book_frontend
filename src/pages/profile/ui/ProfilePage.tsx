import {useQuery} from '@tanstack/react-query';
import {Link} from '@tanstack/react-router';
import {
    CalendarDays,
    Heart,
    Map,
    Pencil,
} from 'lucide-react';

import {currentUserQueryOptions} from '../../../entities/user';
import {appRoutes} from '../../../shared/lib/routes.ts';
import styles from './ProfilePage.module.css';
import {useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import 'yet-another-react-lightbox/styles.css';

export function ProfilePage() {
    const [avatarOpen, setAvatarOpen] = useState(false);
    const {
        data: user,
        isPending,
        isError,
    } = useQuery(currentUserQueryOptions);

    if (isPending) {
        return (
            <div className={styles.page}>
                Loading profile...
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className={styles.page}>
                Failed to load profile.
            </div>
        );
    }

    const joinedAt = new Intl.DateTimeFormat('en', {
        month: 'long',
        year: 'numeric',
    }).format(new Date(user.createdAt));

    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <div>
                    <h1>Profile</h1>
                    <p>
                        Your public RoadBook profile.
                    </p>
                </div>

                <Link
                    to={appRoutes.editProfile}
                    className={styles.editButton}
                >
                    <Pencil size={16}/>
                    Edit profile
                </Link>
            </header>

            <section className={styles.profileCard}>
                <div className={styles.identity}>
                    <div className={styles.avatar}>
                        {user.avatarUrl ? (
                            <button
                                type="button"
                                className={styles.avatarButton}
                                onClick={() => setAvatarOpen(true)}
                                aria-label="View profile photo"
                            >
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    className={styles.avatarImage}
                                />
                            </button>
                        ) : (
                            <div className={styles.avatarFallback}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className={styles.userInfo}>
                        <h2>{user.name}</h2>

                        <span className={styles.email}>
                            {user.email}
                        </span>

                        {user.bio && (
                            <p className={styles.bio}>
                                {user.bio}
                            </p>
                        )}
                    </div>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <Map size={18}/>

                        <div>
                            <strong>
                                {user.routesCount}
                            </strong>
                            <span>Routes</span>
                        </div>
                    </div>

                    <div className={styles.stat}>
                        <Heart size={18}/>

                        <div>
                            <strong>
                                {user.receivedLikesCount}
                            </strong>
                            <span>Likes received</span>
                        </div>
                    </div>

                    <div className={styles.stat}>
                        <CalendarDays size={18}/>

                        <div>
                            <strong>{joinedAt}</strong>
                            <span>Member since</span>
                        </div>
                    </div>
                </div>
            </section>

            {user.avatarUrl && (
                <Lightbox
                    open={avatarOpen}
                    close={() => setAvatarOpen(false)}
                    slides={[
                        {
                            src: user.avatarUrl,
                            alt: `${user.name} profile photo`,
                        },
                    ]}
                />
            )}
        </div>
    );
}