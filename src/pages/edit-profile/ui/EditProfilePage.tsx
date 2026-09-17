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

export function EditProfilePage() {
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

    return (
        <div className={styles.page}>
            <Link
                to={appRoutes.profile}
                className={styles.backLink}
            >
                <ArrowLeft size={16}/>
                Back to profile
            </Link>

            <header className={styles.header}>
                <h1>Profile</h1>
                <p>
                    Manage your personal information.
                </p>
            </header>

            <div className={styles.sections}>
                <section className={styles.card}>
                    <div className={styles.sectionHeader}>
                        <h2>Profile information</h2>
                        <p>
                            Update your name and tell other
                            travelers about yourself.
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