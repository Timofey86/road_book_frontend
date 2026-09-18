import {
    type ChangeEvent,
    useRef,
    useState,
} from 'react';
import {Camera, Trash2} from 'lucide-react';
import {
    useDeleteAvatarMutation,
    useUploadAvatarMutation,
} from '../../../entities/user';
import styles from './ManageUserAvatar.module.css';
import {useTranslation} from 'react-i18next';

interface ManageUserAvatarProps {
    name: string;
    avatarUrl: string | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

export function ManageUserAvatar({name, avatarUrl}: ManageUserAvatarProps) {
    const {t} = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const uploadMutation = useUploadAvatarMutation();
    const deleteMutation = useDeleteAvatarMutation();

    const isPending = uploadMutation.isPending || deleteMutation.isPending;

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        event.target.value = '';

        if (!file) {
            return;
        }

        setError(null);

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError('profile.editPage.avatar.errors.invalidType');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError('profile.editPage.avatar.errors.tooLarge');
            return;
        }

        uploadMutation.mutate(file, {
            onError: () => {
                setError('profile.editPage.avatar.errors.uploadFailed',);
            },
        });
    };

    const handleDelete = () => {
        setError(null);

        deleteMutation.mutate(undefined, {
            onError: () => {
                setError('profile.editPage.avatar.errors.removeFailed');
            },
        });
    };

    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <h2>{t('profile.editPage.avatar.title')}</h2>

                <p>
                    {t('profile.editPage.avatar.description')}
                </p>
            </header>

            <div className={styles.content}>
                <div className={styles.avatar}>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={name}
                        />
                    ) : (
                        <span>
                            {name.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>

                <div className={styles.controls}>
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.uploadButton}
                            disabled={isPending}
                            onClick={() => inputRef.current?.click()}
                        >
                            <Camera size={16}/>

                            {uploadMutation.isPending
                                ? t('profile.editPage.avatar.uploading')
                                : avatarUrl
                                    ? t('profile.editPage.avatar.change')
                                    : t('profile.editPage.avatar.upload')}
                        </button>

                        {avatarUrl && (
                            <button
                                type="button"
                                className={styles.removeButton}
                                disabled={isPending}
                                onClick={handleDelete}
                            >
                                <Trash2 size={16}/>
                                {t('profile.editPage.avatar.remove')}
                            </button>
                        )}
                    </div>

                    <p className={styles.hint}>
                        {t('profile.editPage.avatar.hint')}
                    </p>

                    {error && (
                        <p className={styles.error}>
                            {t(error)}
                        </p>
                    )}
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className={styles.fileInput}
                    onChange={handleFileChange}
                />
            </div>
        </section>
    );
}