
export interface CreateRouteFormValues {
    title: string;
    description: string;
    tags: string[];
}

export type CreateRouteFormErrors = Partial<
    Record<'title' | 'tags', string>
>;

export function validateCreateRoute(
    values: CreateRouteFormValues,
): CreateRouteFormErrors {
    const errors: CreateRouteFormErrors = {};

    const title = values.title.trim();

    if (!title) {
        errors.title = 'route.validation.titleRequired';
    } else if (title.length > 150) {
        errors.title = 'route.validation.titleMaxLength';
    }

    if (values.tags.length > 10) {
        errors.tags = 'route.validation.tagsMaxCount';
    } else if (values.tags.some((tag) => tag.length > 50)) {
        errors.tags = 'route.validation.tagMaxLength';
    }

    return errors;
}