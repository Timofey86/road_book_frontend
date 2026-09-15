import {keepPreviousData, queryOptions} from '@tanstack/react-query';
import {getFavorites} from '../api/getFavorites';

export const favoritesQueryOptions = (page: number) =>
    queryOptions({
        queryKey: ['favorites', {page}],
        queryFn: () => getFavorites(page),
        placeholderData: keepPreviousData,
    });