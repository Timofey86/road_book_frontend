import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {ArrowLeft, CalendarDays, Heart, Map} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import {publicUserQueryOptions} from '../../../entities/user';
import styles from './PublicProfilePage.module.css';
import {router} from "../../../app/router.ts";

interface PublicProfilePageProps {
    userId: number;
}

export function PublicProfilePage({userId}: PublicProfilePageProps) {
    const [avatarOpen, setAvatarOpen] = useState(false);

    const {
        data: user,
        isPending,
        isError,
    } = useQuery(publicUserQueryOptions(userId));

    if (isPending) {
        return (
            <div className={styles.page}>
                Loading profile...
            </div>
        );
    }

    if (isError) {
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
            <button
                type="button"
                className={styles.backButton}
                onClick={() => router.history.back()}
            >
                <ArrowLeft size={16}/>
                Back
            </button>
            <header className={styles.pageHeader}>
                <h1>Profile</h1>

                <p>
                    RoadBook traveler profile.
                </p>
            </header>

            <section className={styles.profileCard}>
                <div className={styles.identity}>
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

                    <div className={styles.userInfo}>
                        <h2>{user.name}</h2>

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

                        <span className={styles.inlineStat}>
                            <strong>{user.routesCount}</strong>
                                Routes
                        </span>
                    </div>

                    <div className={styles.stat}>
                        <Heart size={18}/>

                        <span className={styles.inlineStat}>
                            <strong>{user.receivedLikesCount}</strong>
                                Likes received
                        </span>
                    </div>

                    <div className={styles.stat}>
                        <CalendarDays size={18}/>

                        <div className={styles.memberSince}>
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