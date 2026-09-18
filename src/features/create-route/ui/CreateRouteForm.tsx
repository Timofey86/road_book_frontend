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
import {useTranslation} from 'react-i18next';
import {appRoutes} from "../../../shared/lib/routes.ts";

const initialValues: CreateRouteFormValues = {
    title: '',
    description: '',
    tags: [],
};

export function CreateRouteForm() {
    const {t} = useTranslation();
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
                    to: appRoutes.editRouteStops,
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
                tags: 'route.validation.tagsMaxCount',
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
                    {t('createRoute.form.title')}
                </label>

                <input
                    id="title"
                    type="text"
                    value={values.title}
                    maxLength={150}
                    placeholder={t('createRoute.form.titlePlaceholder')}
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
                            {t(errors.title)}
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
                    {t('createRoute.form.description')}
                </label>

                <textarea
                    id="description"
                    value={values.description}
                    placeholder={t('createRoute.form.descriptionPlaceholder')}
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
                    {t('createRoute.form.tags')}
                </label>

                <div className={styles.tagControls}>
                    <input
                        id="tags"
                        type="text"
                        value={tagInput}
                        maxLength={50}
                        placeholder={t('createRoute.form.tagPlaceholder')}
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
                        {t('createRoute.form.addTag')}
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
                                    onClick={() => handleRemoveTag(tag)}
                                    aria-label={t('createRoute.form.removeTag', {tag})}
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
                            {t(errors.tags)}
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
                    {t('createRoute.errors.createFailed')}
                </div>
            )}

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => navigate({ to: '/' })}
                >
                    {t('createRoute.form.cancel')}
                </button>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={createRouteMutation.isPending}
                >
                    {createRouteMutation.isPending
                        ? t('createRoute.form.creating')
                        : t('createRoute.form.continue')
                    }
                </button>
            </div>
        </form>
    );
}