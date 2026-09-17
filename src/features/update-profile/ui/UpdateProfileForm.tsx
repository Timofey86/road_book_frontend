import {useState} from 'react';
import type {CurrentUser} from '../../../entities/user';
import styles from './UpdateProfileForm.module.css';
import {useUpdateProfileMutation} from "../model/useUpdateProfileMutation";

interface UpdateProfileFormProps {
    user: CurrentUser;
}

export function UpdateProfileForm({user}: UpdateProfileFormProps) {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio ?? '');

    const mutation = useUpdateProfileMutation();

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedBio = bio.trim();

        if (!trimmedName) {
            return;
        }

        mutation.mutate({
            name: trimmedName,
            bio: trimmedBio,
        });
    };

    const hasChanges =
        name.trim() !== user.name ||
        bio.trim() !== (user.bio ?? '');

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <label htmlFor="profile-name">
                    Name
                </label>

                <input
                    id="profile-name"
                    type="text"
                    value={name}
                    maxLength={100}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />
            </div>

            <div className={styles.field}>
                <div className={styles.labelRow}>
                    <label htmlFor="profile-bio">
                        Bio
                    </label>

                    <span>
                        {bio.length} / 500
                    </span>
                </div>

                <textarea
                    id="profile-bio"
                    value={bio}
                    maxLength={500}
                    rows={5}
                    onChange={(event) =>
                        setBio(event.target.value)
                    }
                />
            </div>

            {mutation.isError && (
                <p className={styles.error}>
                    Failed to update profile.
                </p>
            )}

            {/*{mutation.isSuccess && (*/}
            {/*    <p className={styles.success}>*/}
            {/*        Profile updated.*/}
            {/*    </p>*/}
            {/*)}*/}

            <div className={styles.actions}>
                <button
                    type="submit"
                    disabled={
                        mutation.isPending ||
                        !hasChanges ||
                        !name.trim()
                    }
                >
                    {mutation.isPending
                        ? 'Saving...'
                        : 'Save changes'}
                </button>
            </div>
        </form>
    );
}