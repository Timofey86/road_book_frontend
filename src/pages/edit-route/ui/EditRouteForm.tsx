import {
    type FormEvent,
    useState,
} from 'react';
import {Link} from '@tanstack/react-router';
import {ArrowLeft} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {
    type RouteDetails,
    useUpdateRouteMutation,
    useUpdateRouteTagsMutation,
} from '../../../entities/route';
import {UploadRouteCover} from '../../../features/upload-route-cover';
import {DeleteRoute} from '../../../features/delete-route';
import {ManageRoutePhotos} from '../../../features/manage-route-photos';
import {appRoutes} from '../../../shared/lib/routes';
import styles from './EditRoutePage.module.css';

interface EditRouteFormProps {
    route: RouteDetails;
}

export function EditRouteForm({route}: EditRouteFormProps) {
    const {t} = useTranslation();
    const [title, setTitle] = useState(route.title);
    const [description, setDescription] = useState(route.description ?? '');
    const [tags, setTags] = useState<string[]>(
        () => route.tags.map((tag) => tag.name),
    );
    const [tagInput, setTagInput] = useState('');

    const updateTagsMutation = useUpdateRouteTagsMutation(route.id);
    const updateRouteMutation = useUpdateRouteMutation(route.id);

    const initialTags = route.tags.map((tag) => tag.name);
    const tagsChanged = JSON.stringify(tags) !== JSON.stringify(initialTags);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRouteMutation.mutate({
            title: title.trim(),
            description: description.trim(),
        });
    };

    const handleAddTag = () => {
        const value = tagInput.trim();

        if (!value) {
            return;
        }

        if (tags.length >= 10) {
            return;
        }

        const alreadyExists = tags.some(
            (tag) =>
                tag.toLowerCase() === value.toLowerCase(),
        );

        if (alreadyExists) {
            return;
        }

        setTags((current) => [
            ...current,
            value,
        ]);

        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags((current) =>
            current.filter(
                (tag) => tag !== tagToRemove,
            ),
        );
    };

    const handleSaveTags = () => {
        updateTagsMutation.mutate({
            tags,
        });
    };

    return (
        <div className={styles.page}>
            <Link
                to={appRoutes.routeDetails}
                params={{
                    routeId: String(route.id),
                }}
                className={styles.backLink}
            >
                <ArrowLeft size={16}/>
                {t('editRoute.back')}
            </Link>

            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    {t('editRoute.eyebrow')}
                </span>

                <h1>{route.title}</h1>

                <p>
                    {t('editRoute.subtitle')}
                </p>
            </header>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>{t('editRoute.general.title')}</h2>
                        <p>
                            {t('editRoute.general.description')}
                        </p>
                    </div>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <label className={styles.field}>
                        <span>{t('editRoute.general.titleLabel')}</span>

                        <input
                            type="text"
                            value={title}
                            maxLength={150}
                            onChange={(event) =>
                                setTitle(
                                    event.target.value,
                                )
                            }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>{t('editRoute.general.descriptionLabel')}</span>

                        <textarea
                            value={description}
                            rows={5}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value,
                                )
                            }
                        />
                    </label>
                    <div
                        className={styles.formActions}
                    >
                        <button
                            type="submit"
                            className={styles.saveButton}
                            disabled={
                                updateRouteMutation.isPending ||
                                !title.trim()
                            }
                        >
                            {updateRouteMutation.isPending
                                ? t('editRoute.general.saving')
                                : t('editRoute.general.save')}
                        </button>

                        {updateRouteMutation.isSuccess && (
                            <span className={styles.success}>
                                {t('editRoute.general.saved')}
                            </span>
                        )}
                    </div>
                </form>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>{t('editRoute.tags.title')}</h2>

                        <p>
                            {t('editRoute.tags.description')}
                        </p>
                    </div>
                </div>

                <div className={styles.tagsField}>
                    <div className={styles.tags}>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className={styles.tag}
                            >
                                {tag}

                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    aria-label={t('editRoute.tags.remove', {tag})}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className={styles.tagInputRow}>
                        <input
                            type="text"
                            value={tagInput}
                            maxLength={50}
                            placeholder={t('editRoute.tags.placeholder')}
                            onChange={(event) =>
                                setTagInput(
                                    event.target.value,
                                )
                            }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleAddTag();
                                }
                            }}
                        />

                        <button
                            type="button"
                            className={styles.addTagButton}
                            onClick={handleAddTag}
                            disabled={
                                !tagInput.trim() ||
                                tags.length >= 10
                            }
                        >
                            {t('editRoute.tags.add')}
                        </button>
                    </div>

                    <div className={styles.tagsFooter}>
                        <span>
                            {t('editRoute.tags.count', {
                                count: tags.length,
                            })}
                        </span>

                        <button
                            type="button"
                            className={styles.saveTagsButton}
                            onClick={handleSaveTags}
                            disabled={updateTagsMutation.isPending || !tagsChanged}
                        >
                            {updateTagsMutation.isPending
                                ? t('editRoute.tags.saving')
                                : t('editRoute.tags.save')}
                        </button>
                    </div>

                    {updateTagsMutation.isSuccess && (
                        <span className={styles.success}>
                            {t('editRoute.tags.saved')}
                        </span>
                    )}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>{t('editRoute.cover.title')}</h2>

                        <p>
                            {t('editRoute.cover.description')}
                        </p>
                    </div>
                </div>

                <UploadRouteCover
                    routeId={route.id}
                    coverUrl={route.coverUrl}
                />
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>{t('editRoute.photos.title')}</h2>

                        <p>
                            {t('editRoute.photos.description')}
                        </p>
                    </div>
                </div>

                <ManageRoutePhotos
                    routeId={route.id}
                    photos={route.photos}
                />
            </section>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>{t('editRoute.stops.title')}</h2>

                        <p>
                            {t('editRoute.stops.description')}
                        </p>
                    </div>

                    <Link
                        to={appRoutes.editRouteStops}
                        params={{
                            routeId: String(route.id),
                        }}
                        className={styles.editStopsButton}
                    >
                        {t('editRoute.stops.edit')}
                    </Link>
                </div>

                <div className={styles.routeInfo}>
                    <strong>
                        {t('editRoute.stops.count', {
                            count: route.stops.length,
                        })}
                    </strong>

                </div>
            </section>

            <DeleteRoute
                routeId={route.id}
                routeTitle={route.title}
            />
        </div>
    )
}