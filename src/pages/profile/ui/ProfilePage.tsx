import {useQuery} from '@tanstack/react-query';
import {Link} from '@tanstack/react-router';
import {
    ArrowLeft,
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
import {useTranslation} from 'react-i18next';
import {router} from "../../../app/router.ts";

export function ProfilePage() {
    const {t, i18n} = useTranslation();
    const [avatarOpen, setAvatarOpen] = useState(false);
    const {
        data: user,
        isPending,
        isError,
    } = useQuery(currentUserQueryOptions);

    if (isPending) {
        return (
            <div className={styles.page}>
                {t('profile.loading')}
            </div>
        );
    }

    if (isError || !user) {
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
                <div>
                    <h1>{t('profile.title')}</h1>
                    <p>
                        {t('profile.ownSubtitle')}
                    </p>
                </div>

                <Link
                    to={appRoutes.editProfile}
                    className={styles.editButton}
                >
                    <Pencil size={16}/>
                    {t('profile.edit')}
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
                            <span>{t('profile.stats.routes')}</span>
                        </div>
                    </div>

                    <div className={styles.stat}>
                        <Heart size={18}/>

                        <div>
                            <strong>
                                {user.receivedLikesCount}
                            </strong>
                            <span>{t('profile.stats.likesReceived')}</span>
                        </div>
                    </div>

                    <div className={styles.stat}>
                        <CalendarDays size={18}/>

                        <div>
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