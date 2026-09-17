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
            setError(
                'Please select a JPEG, PNG or WebP image.',
            );
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError(
                'Image must be smaller than 5 MB.',
            );
            return;
        }

        uploadMutation.mutate(file, {
            onError: () => {
                setError('Failed to upload avatar.');
            },
        });
    };

    const handleDelete = () => {
        setError(null);

        deleteMutation.mutate(undefined, {
            onError: () => {
                setError('Failed to remove avatar.');
            },
        });
    };

    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <h2>Profile photo</h2>

                <p>
                    Upload a photo so other travelers can
                    recognize you.
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
                                ? 'Uploading...'
                                : avatarUrl
                                    ? 'Change photo'
                                    : 'Upload photo'}
                        </button>

                        {avatarUrl && (
                            <button
                                type="button"
                                className={styles.removeButton}
                                disabled={isPending}
                                onClick={handleDelete}
                            >
                                <Trash2 size={16}/>
                                Remove
                            </button>
                        )}
                    </div>

                    <p className={styles.hint}>
                        JPEG, PNG or WebP. Maximum 5 MB.
                    </p>

                    {error && (
                        <p className={styles.error}>
                            {error}
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