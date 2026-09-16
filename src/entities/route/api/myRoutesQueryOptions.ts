import {
    keepPreviousData,
    queryOptions,
} from '@tanstack/react-query';
import {getMyRoutes} from './getMyRoutes.ts';

export const myRoutesQueryOptions = (
    page: number,
) =>
    queryOptions({
        queryKey: ['my-routes', {page}],
        queryFn: () => getMyRoutes(page),
        placeholderData: keepPreviousData,
    });