import styles from './CreateRouteForm.module.css';
import {
    type FormEvent,
    type KeyboardEvent,
    useState,
} from 'react';
import { useNavigate } from '@tanstack/react-router';
import { X } from 'lucide-react';

import {
    useCreateRouteMutation,
    type CreateRoutePayload,
} from '../../../entities/route';

import {
    type CreateRouteFormErrors,
    type CreateRouteFormValues,
    validateCreateRoute,
} from '../model/validation';

const initialValues: CreateRouteFormValues = {
    title: '',
    description: '',
    tags: [],
};

export function CreateRouteForm() {
    const navigate = useNavigate();

    const createRouteMutation = useCreateRouteMutation();

    const [values, setValues] =
        useState<CreateRouteFormValues>(initialValues);

    const [errors, setErrors] =
        useState<CreateRouteFormErrors>({});

    const [tagInput, setTagInput] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateCreateRoute(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload: CreateRoutePayload = {
            title: values.title.trim(),
            description: values.description.trim() || undefined,
            tags:
                values.tags.length > 0
                    ? values.tags
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    : undefined,
        };

        createRouteMutation.mutate(payload, {
            onSuccess: (route) => {
                navigate({
                    to: '/routes/$routeId/edit/stops',
                    params: {
                        routeId: String(route.id),
                    },
                });
            },
        });
    };

    const handleAddTag = () => {
        const tag = tagInput.trim();

        if (!tag) {
            return;
        }

        if (values.tags.length >= 10) {
            setErrors((current) => ({
                ...current,
                tags: 'You can add up to 10 tags',
            }));

            return;
        }

        const exists = values.tags.some(
            (existingTag) =>
                existingTag.toLowerCase() === tag.toLowerCase(),
        );

        if (exists) {
            setTagInput('');
            return;
        }

        setValues((current) => ({
            ...current,
            tags: [...current.tags, tag],
        }));

        setTagInput('');

        setErrors((current) => ({
            ...current,
            tags: undefined,
        }));
    };

    const handleTagKeyDown = (
        event: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTag();
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setValues((current) => ({
            ...current,
            tags: current.tags.filter(
                (tag) => tag !== tagToRemove,
            ),
        }));
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <label htmlFor="title">
                    Route title
                </label>

                <input
                    id="title"
                    type="text"
                    value={values.title}
                    maxLength={150}
                    placeholder="Italy Summer Road Trip"
                    onChange={(event) => {
                        setValues((current) => ({
                            ...current,
                            title: event.target.value,
                        }));

                        if (errors.title) {
                            setErrors((current) => ({
                                ...current,
                                title: undefined,
                            }));
                        }
                    }}
                />

                <div className={styles.fieldFooter}>
                    {errors.title ? (
                        <span className={styles.error}>
                            {errors.title}
                        </span>
                    ) : (
                        <span />
                    )}

                    <span className={styles.counter}>
                        {values.title.length}/150
                    </span>
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    value={values.description}
                    placeholder="Tell people something about this trip..."
                    rows={5}
                    onChange={(event) => {
                        setValues((current) => ({
                            ...current,
                            description: event.target.value,
                        }));
                    }}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="tags">
                    Tags
                </label>

                <div className={styles.tagControls}>
                    <input
                        id="tags"
                        type="text"
                        value={tagInput}
                        maxLength={50}
                        placeholder="Mountains"
                        onChange={(event) => {
                            setTagInput(event.target.value);
                        }}
                        onKeyDown={handleTagKeyDown}
                    />

                    <button
                        type="button"
                        className={styles.addTagButton}
                        onClick={handleAddTag}
                    >
                        Add tag
                    </button>
                </div>

                {values.tags.length > 0 && (
                    <div className={styles.tags}>
                        {values.tags.map((tag) => (
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
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                <div className={styles.fieldFooter}>
                    {errors.tags ? (
                        <span className={styles.error}>
                            {errors.tags}
                        </span>
                    ) : (
                        <span />
                    )}

                    <span className={styles.counter}>
                        {values.tags.length}/10
                    </span>
                </div>
            </div>

            {createRouteMutation.isError && (
                <div className={styles.requestError}>
                    Failed to create route
                </div>
            )}

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => navigate({ to: '/' })}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={createRouteMutation.isPending}
                >
                    {createRouteMutation.isPending
                        ? 'Creating...'
                        : 'Continue'
                    }
                </button>
            </div>
        </form>
    );
}