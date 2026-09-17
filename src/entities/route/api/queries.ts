import {keepPreviousData, queryOptions} from '@tanstack/react-query';
import {getRoutes} from './getRoutes';
import type {RoutesQueryParams} from '../model/types';

export const routesQueryOptions = (
    params: RoutesQueryParams,
) =>
    queryOptions({
        queryKey: ['routes', params],
        queryFn: () => getRoutes(params),
        placeholderData: keepPreviousData,
    });