import {CSS} from '@dnd-kit/utilities';
import {
    useSortable,
} from '@dnd-kit/sortable';
import {GripVertical, Trash2} from 'lucide-react';
import type {RoutePhoto} from '../../../entities/route';
import styles from './ManageRoutePhotos.module.css';
import {useState} from "react";

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
                        'Route photo'
                    }
                />

                <button
                    type="button"
                    className={styles.dragHandle}
                    aria-label="Reorder photo"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical size={16}/>
                </button>

                <button
                    type="button"
                    className={styles.deletePhotoButton}
                    onClick={onDelete}
                    aria-label="Delete photo"
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
                                    setCaption(
                                        photo.caption ?? '',
                                    );
                                    setIsEditing(false);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={styles.captionSaveButton}
                                disabled={isUpdatingCaption}
                                onClick={() => {
                                    const value =
                                        caption.trim();

                                    onUpdateCaption(
                                        photo.id,
                                        value || null,
                                    );

                                    setIsEditing(false);
                                }}
                            >
                                {isUpdatingCaption
                                    ? 'Saving...'
                                    : 'Save'}
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
                        {photo.caption ?? 'Add caption'}
                    </button>
                )}
            </div>
        </div>
    );
}