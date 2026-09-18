import {CSS} from '@dnd-kit/utilities';
import {
    useSortable,
} from '@dnd-kit/sortable';
import {GripVertical, Trash2} from 'lucide-react';
import type {RoutePhoto} from '../../../entities/route';
import styles from './ManageRoutePhotos.module.css';
import {useState} from "react";
import {useTranslation} from 'react-i18next';

interface SortablePhotoCardProps {
    photo: RoutePhoto;
    onDelete: () => void;
    onUpdateCaption: (
        photoId: number,
        caption: string | null,
    ) => void;
    isUpdatingCaption?: boolean;
}

export function SortablePhotoCard({
    photo,
    onDelete,
    onUpdateCaption,
    isUpdatingCaption,
}: SortablePhotoCardProps) {
    const {t} = useTranslation();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: photo.id,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [caption, setCaption] = useState(photo.caption ?? '');

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.photoCard} ${
                isDragging ? styles.dragging : ''
            }`}
        >
            <div className={styles.imageWrapper}>
                <img
                    src={photo.url}
                    alt={
                        photo.caption ??
                        t('editRoute.photos.photoAlt')
                    }
                />

                <button
                    type="button"
                    className={styles.dragHandle}
                    aria-label={t('editRoute.photos.reorder')}
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical size={16}/>
                </button>

                <button
                    type="button"
                    className={styles.deletePhotoButton}
                    onClick={onDelete}
                    aria-label={t('editRoute.photos.delete')}
                >
                    <Trash2 size={16}/>
                </button>
            </div>

            <div className={styles.captionArea}>
                {isEditing ? (
                    <>
                        <textarea
                            value={caption}
                            maxLength={500}
                            rows={3}
                            onChange={(event) =>
                                setCaption(event.target.value)
                            }
                        />

                        <div className={styles.captionActions}>
                            <button
                                type="button"
                                className={styles.captionCancelButton}
                                disabled={isUpdatingCaption}
                                onClick={() => {
                                    setCaption(photo.caption ?? '');
                                    setIsEditing(false);
                                }}
                            >
                                {t('common.cancel')}
                            </button>

                            <button
                                type="button"
                                className={styles.captionSaveButton}
                                disabled={isUpdatingCaption}
                                onClick={() => {
                                    const value = caption.trim();
                                    onUpdateCaption(photo.id, value || null);
                                    setIsEditing(false);
                                }}
                            >
                                {isUpdatingCaption
                                    ? t('editRoute.photos.savingCaption')
                                    : t('editRoute.photos.saveCaption')}
                            </button>
                        </div>
                    </>
                ) : (
                    <button
                        type="button"
                        className={styles.captionButton}
                        onClick={() => {
                            setCaption(photo.caption ?? '');
                            setIsEditing(true);
                        }}
                    >
                        {photo.caption ?? t('editRoute.photos.addCaption')}
                    </button>
                )}
            </div>
        </div>
    );
}