import {type ChangeEvent, useEffect, useRef, useState} from "react";
import {useUploadRouteCoverMutation} from "../../../entities/route";
import styles from './UploadRouteCover.module.css';
import {ImagePlus} from "lucide-react";
import {useTranslation} from 'react-i18next';

interface UploadRouteCoverProps {
    routeId: number;
    coverUrl: string | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

export function UploadRouteCover({routeId, coverUrl}: UploadRouteCoverProps) {
    const {t} = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const uploadMutation = useUploadRouteCoverMutation(routeId);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError(null);

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError('editRoute.cover.errors.invalidType');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError('editRoute.cover.errors.tooLarge');
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        uploadMutation.mutate(file, {
            onSuccess: () => {
                URL.revokeObjectURL(objectUrl);
                setPreviewUrl(null);

                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            },
        });
    };

    const imageUrl = previewUrl ?? coverUrl;

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={styles.preview}
                onClick={() =>
                    inputRef.current?.click()
                }
                disabled={uploadMutation.isPending}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={t('editRoute.cover.imageAlt')}
                    />
                ) : (
                    <span className={styles.placeholder}>
                        <ImagePlus size={30} />

                        <span>
                            {t('editRoute.cover.add')}
                        </span>
                    </span>
                )}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className={styles.fileInput}
                onChange={handleFileChange}
            />

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.uploadButton}
                    onClick={() =>
                        inputRef.current?.click()
                    }
                    disabled={uploadMutation.isPending}
                >
                    {uploadMutation.isPending
                        ? t('editRoute.cover.uploading')
                        : coverUrl
                            ? t('editRoute.cover.replace')
                            : t('editRoute.cover.upload')}
                </button>

                <span className={styles.hint}>
                    {t('editRoute.cover.hint')}
                </span>
            </div>

            {error && (
                <p className={styles.error}>
                    {t(error)}
                </p>
            )}

            {uploadMutation.isError && (
                <p className={styles.error}>
                    {t('editRoute.cover.errors.uploadFailed')}
                </p>
            )}
        </div>
    );
}
