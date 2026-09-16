import {
    keepPreviousData,
    queryOptions,
} from '@tanstack/react-query';
import {getComments} from '../api/getComments';

export const commentsQueryOptions = (
    routeId: number,
    page: number,
) =>
    queryOptions({
        queryKey: ['comments', routeId, page],
        queryFn: () => getComments(routeId, page),
        placeholderData: keepPreviousData,
    });