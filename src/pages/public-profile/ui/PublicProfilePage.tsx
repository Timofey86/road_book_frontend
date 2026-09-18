import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {ArrowLeft, CalendarDays, Heart, Map} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import {publicUserQueryOptions} from '../../../entities/user';
import styles from './PublicProfilePage.module.css';
import {router} from "../../../app/router.ts";
import {useTranslation} from 'react-i18next';

interface PublicProfilePageProps {
    userId: number;
}

export function PublicProfilePage({userId}: PublicProfilePageProps) {
    const {t, i18n} = useTranslation();
    const [avatarOpen, setAvatarOpen] = useState(false);

    const {
        data: user,
        isPending,
        isError,
    } = useQuery(publicUserQueryOptions(userId));

    if (isPending) {
        return (
            <div className={styles.page}>
                {t('profile.loading')}
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.page}>
                {t('profile.loadError')}
            </div>
        );
    }

    const joinedAt = new Intl.DateTimeFormat(
        i18n.resolvedLanguage,
        {
            month: 'long',
            year: 'numeric',
        },
    ).format(new Date(user.createdAt));

    return (
        <div className={styles.page}>
            <button
                type="button"
                className={styles.backButton}
                onClick={() => router.history.back()}
            >
                <ArrowLeft size={16}/>
                {t('profile.back')}
            </button>
            <header className={styles.pageHeader}>
                <h1>{t('profile.title')}</h1>

                <p>
                    {t('profile.ownSubtitle')}
                </p>
            </header>

            <section className={styles.profileCard}>
                <div className={styles.identity}>
                    {user.avatarUrl ? (
                        <button
                            type="button"
                            className={styles.avatarButton}
                            onClick={() => setAvatarOpen(true)}
                            aria-label={t('profile.viewPhoto')}
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
                            {t('profile.stats.routes')}
                        </span>
                    </div>

                    <div className={styles.stat}>
                        <Heart size={18}/>

                        <span className={styles.inlineStat}>
                            <strong>{user.receivedLikesCount}</strong>
                            {t('profile.stats.likesReceived')}
                        </span>
                    </div>

                    <div className={styles.stat}>
                        <CalendarDays size={18}/>

                        <div className={styles.memberSince}>
                            <strong>{joinedAt}</strong>
                            <span>{t('profile.stats.memberSince')}</span>
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
                            alt: t('profile.photoAlt', {
                                name: user.name,
                            }),
                        },
                    ]}
                />
            )}
        </div>
    );
}