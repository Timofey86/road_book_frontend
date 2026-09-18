import {
    type ChangeEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    type RoutePhoto,
    useUploadRoutePhotoMutation,
    useDeleteRoutePhotoMutation,
    useReorderRoutePhotosMutation,
    useUpdateRoutePhotoMutation
} from '../../../entities/route';
import styles from './ManageRoutePhotos.module.css';
import {Modal} from "../../../shared/ui/modal";
import {closestCenter, DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {useTranslation} from 'react-i18next';

import {SortablePhotoCard} from "./SortablePhotoCard.tsx";

interface ManageRoutePhotosProps {
    routeId: number;
    photos: RoutePhoto[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

export function ManageRoutePhotos({routeId, photos}: ManageRoutePhotosProps) {
    const {t} = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const [photoToDelete, setPhotoToDelete] = useState<RoutePhoto | null>(null);
    const [photoOrder, setPhotoOrder] = useState<number[] | null>(null);

    const deletePhotoMutation = useDeleteRoutePhotoMutation(routeId);
    const reorderMutation = useReorderRoutePhotosMutation(routeId)
    const updatePhotoMutation = useUpdateRoutePhotoMutation(routeId);
    const uploadMutation = useUploadRoutePhotoMutation(routeId);

    const sortedPhotos = photos.toSorted(
        (a, b) => a.position - b.position,
    );

    const orderedPhotos = photoOrder
        ? [
            ...photoOrder
                .map((id) =>
                    photos.find(
                        (photo) => photo.id === id,
                    ),
                )
                .filter(
                    (photo): photo is RoutePhoto =>
                        photo !== undefined,
                ),

            ...sortedPhotos.filter(
                (photo) =>
                    !photoOrder.includes(photo.id),
            ),
        ]
        : sortedPhotos;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    const handleDragEnd = (
        event: DragEndEvent,
    ) => {
        const {active, over} = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex =
            orderedPhotos.findIndex(
                (photo) => photo.id === active.id,
            );

        const newIndex =
            orderedPhotos.findIndex(
                (photo) => photo.id === over.id,
            );

        if (
            oldIndex === -1 ||
            newIndex === -1
        ) {
            return;
        }

        const nextPhotos = arrayMove(
            orderedPhotos,
            oldIndex,
            newIndex,
        );

        const nextOrder = nextPhotos.map(
            (photo) => photo.id,
        );

        setPhotoOrder(nextOrder);
        reorderMutation.mutate(nextOrder);
    };


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
        const selectedFile =
            event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        setValidationError(null);

        if (
            !ALLOWED_TYPES.includes(
                selectedFile.type,
            )
        ) {
            setValidationError(
                'editRoute.photos.errors.invalidType',
            );
            return;
        }

        if (
            selectedFile.size >
            MAX_FILE_SIZE
        ) {
            setValidationError(
                'editRoute.photos.errors.tooLarge',
            );
            return;
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setFile(selectedFile);
        setPreviewUrl(
            URL.createObjectURL(selectedFile),
        );
    };

    const handleUpload = () => {
        if (!file) {
            return;
        }

        uploadMutation.mutate(
            {
                file,
                caption,
            },
            {
                onSuccess: () => {
                    setFile(null);
                    setCaption('');

                    if (previewUrl) {
                        URL.revokeObjectURL(
                            previewUrl,
                        );
                    }

                    setPreviewUrl(null);

                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                },
            },
        );
    };

    return (
        <div className={styles.root}>
            {orderedPhotos.length > 0 && (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={orderedPhotos.map(
                            (photo) => photo.id,
                        )}
                        strategy={rectSortingStrategy}
                    >
                        <div className={styles.grid}>
                            {orderedPhotos.map(
                                (photo) => (
                                    <SortablePhotoCard
                                        key={photo.id}
                                        photo={photo}
                                        onDelete={() => setPhotoToDelete(photo)}
                                        onUpdateCaption={(
                                            photoId,
                                            caption,
                                        ) => {
                                            updatePhotoMutation.mutate({
                                                photoId,
                                                caption,
                                            });
                                        }}
                                        isUpdatingCaption={
                                            updatePhotoMutation.isPending &&
                                            updatePhotoMutation.variables?.photoId ===
                                            photo.id
                                        }
                                    />
                                ),
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            )}

            <div className={styles.uploader}>
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt={t('editRoute.photos.selectedPhotoAlt')}
                        className={styles.preview}
                    />
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    onChange={handleFileChange}
                />

                <button
                    type="button"
                    className={styles.selectButton}
                    onClick={() => inputRef.current?.click()}
                >
                    {t('editRoute.photos.select')}
                </button>

                {file && (
                    <>
                        <textarea
                            value={caption}
                            maxLength={500}
                            rows={3}
                            placeholder={t('editRoute.photos.captionPlaceholder')}
                            onChange={(event) =>
                                setCaption(
                                    event.target.value,
                                )
                            }
                        />

                        <div
                            className={
                                styles.uploadFooter
                            }
                        >
                            <span>
                                {caption.length}/500
                            </span>

                            <button
                                type="button"
                                className={styles.uploadButton}
                                disabled={uploadMutation.isPending}
                                onClick={handleUpload}
                            >
                                {uploadMutation.isPending
                                    ? t('editRoute.photos.uploading')
                                    : t('editRoute.photos.upload')}
                            </button>
                        </div>
                    </>
                )}

                {validationError && (
                    <p className={styles.error}>
                        {t(validationError)}
                    </p>
                )}

                {uploadMutation.isError && (
                    <p className={styles.error}>
                        {t('editRoute.photos.errors.uploadFailed')}
                    </p>
                )}
            </div>
            <Modal
                open={photoToDelete !== null}
                onClose={() => {
                    if (!deletePhotoMutation.isPending) {
                        setPhotoToDelete(null);
                    }
                }}
                title={t('editRoute.photos.deleteModal.title')}
            >
                <p className={styles.deleteMessage}>
                    {t('editRoute.photos.deleteModal.description')}
                </p>

                {deletePhotoMutation.isError && (
                    <p className={styles.error}>
                        {t('editRoute.photos.errors.deleteFailed')}
                    </p>
                )}

                <div className={styles.deleteActions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        disabled={deletePhotoMutation.isPending}
                        onClick={() => setPhotoToDelete(null)}
                    >
                        {t('common.cancel')}
                    </button>

                    <button
                        type="button"
                        className={styles.confirmDeleteButton}
                        disabled={deletePhotoMutation.isPending}
                        onClick={() => {
                            if (!photoToDelete) {
                                return;
                            }

                            deletePhotoMutation.mutate(
                                photoToDelete.id,
                                {
                                    onSuccess: () => {
                                        setPhotoToDelete(null);
                                    },
                                },
                            );
                        }}
                    >
                        {deletePhotoMutation.isPending
                            ? t('editRoute.photos.deleteModal.deleting')
                            : t('editRoute.photos.delete')}
                    </button>
                </div>
            </Modal>
        </div>

    );
}