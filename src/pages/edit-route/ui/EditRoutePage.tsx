import styles from './EditRoutePage.module.css';
import {
    routeDetailsQueryOptions,
    useUpdateRouteMutation,
    useUpdateRouteTagsMutation
} from "../../../entities/route";
import {useQuery} from "@tanstack/react-query";
import {UploadRouteCover} from "../../../features/upload-route-cover";
import {Link, Navigate} from "@tanstack/react-router";
import {type FormEvent, useEffect, useState} from "react";
import {appRoutes} from "../../../shared/lib/routes.ts";
import {ArrowLeft} from "lucide-react";
import {DeleteRoute} from "../../../features/delete-route";
import {ManageRoutePhotos} from "../../../features/manage-route-photos";
import {currentUserQueryOptions} from '../../../entities/user';

interface EditRoutePageProps {
    routeId: number;
}
export function EditRoutePage({routeId}: EditRoutePageProps) {
    const {
        data: route,
        isPending,
        isError,
    } = useQuery(
        routeDetailsQueryOptions(routeId),
    );

    const {
        data: currentUser,
        isPending: isCurrentUserPending,
    } = useQuery(currentUserQueryOptions);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    const updateTagsMutation = useUpdateRouteTagsMutation(routeId);
    const updateRouteMutation = useUpdateRouteMutation(routeId);

    useEffect(() => {
        if (!route) {
            return;
        }

        setTitle(route.title);
        setDescription(route.description ?? '');
        setTags(route.tags.map((tag) => tag.name));
    }, [route]);

    if (isPending || isCurrentUserPending) {
        return (
            <div className={styles.page}>
                Loading route...
            </div>
        );
    }

    if (isError || !route) {
        return (
            <div className={styles.page}>
                Failed to load route.
            </div>
        );
    }

    if (!currentUser || route.userId !== currentUser.id) {
        return (
            <Navigate
                to={appRoutes.routeDetails}
                params={{
                    routeId: String(route.id),
                }}
            />
        );
    }

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
                Back to route
            </Link>
            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    Edit route
                </span>

                <h1>{route.title}</h1>

                <p>
                    Manage the route information
                    and appearance.
                </p>
            </header>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>General information</h2>
                        <p>
                            Update the title and
                            description of your route.
                        </p>
                    </div>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <label className={styles.field}>
                        <span>Title</span>

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
                        <span>Description</span>

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
                            className={
                                styles.saveButton
                            }
                            disabled={
                                updateRouteMutation.isPending ||
                                !title.trim()
                            }
                        >
                            {updateRouteMutation.isPending
                                ? 'Saving...'
                                : 'Save changes'}
                        </button>

                        {updateRouteMutation.isSuccess && (
                            <span
                                className={
                                    styles.success
                                }
                            >
                                Changes saved
                            </span>
                        )}
                    </div>
                </form>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>Tags</h2>

                        <p>
                            Add up to 10 tags to help describe
                            your route.
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
                                    onClick={() =>
                                        handleRemoveTag(tag)
                                    }
                                    aria-label={`Remove ${tag}`}
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
                            placeholder="Add a tag"
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
                            Add
                        </button>
                    </div>

                    <div className={styles.tagsFooter}>
            <span>
                {tags.length}/10 tags
            </span>

                        <button
                            type="button"
                            className={styles.saveTagsButton}
                            onClick={handleSaveTags}
                            disabled={
                                updateTagsMutation.isPending ||
                                !tagsChanged
                            }
                        >
                            {updateTagsMutation.isPending
                                ? 'Saving...'
                                : 'Save tags'}
                        </button>
                    </div>

                    {updateTagsMutation.isSuccess && (
                        <span className={styles.success}>
                Tags saved
            </span>
                    )}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>Cover</h2>

                        <p>
                            Choose an image that represents
                            your route.
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
                        <h2>Photos</h2>

                        <p>
                            Add photos from your trip.
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
                        <h2>Route stops</h2>

                        <p>
                            Add, remove and reorder stops.
                        </p>
                    </div>

                    <Link
                        to={appRoutes.editRouteStops}
                        params={{
                            routeId: String(route.id),
                        }}
                        className={styles.editStopsButton}
                    >
                        Edit stops
                    </Link>
                </div>

                <div className={styles.routeInfo}>
                    <strong>
                        {route.stops.length}
                    </strong>

                    <span>stops</span>
                </div>
            </section>

            <DeleteRoute
                routeId={route.id}
                routeTitle={route.title}
            />
        </div>
    )
}


