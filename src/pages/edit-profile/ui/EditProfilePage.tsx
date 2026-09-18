import {useQuery} from '@tanstack/react-query';
import {
    currentUserQueryOptions,
} from '../../../entities/user';
import styles from './EditProfilePage.module.css';
import {UpdateProfileForm} from "../../../features/update-profile";
import {Link} from "@tanstack/react-router";
import {appRoutes} from "../../../shared/lib/routes.ts";
import {ArrowLeft} from "lucide-react";
import {ManageUserAvatar} from "../../../features/manage-user-avatar";
import {DeleteAccount} from "../../../features/delete-account";
import {useTranslation} from 'react-i18next';

export function EditProfilePage() {
    const {t} = useTranslation();
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

    return (
        <div className={styles.page}>
            <Link
                to={appRoutes.profile}
                className={styles.backLink}
            >
                <ArrowLeft size={16}/>
                {t('profile.backToProfile')}
            </Link>

            <header className={styles.header}>
                <h1>{t('profile.title')}</h1>
                <p>
                    {t('profile.editPage.subtitle')}
                </p>
            </header>

            <div className={styles.sections}>
                <section className={styles.card}>
                    <div className={styles.sectionHeader}>
                        <h2>{t('profile.editPage.information.title')}</h2>
                        <p>
                            {t('profile.editPage.information.description')}
                        </p>
                    </div>

                    <UpdateProfileForm user={user}/>
                </section>

                <ManageUserAvatar
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                />

                <DeleteAccount/>
            </div>
        </div>
    );
}