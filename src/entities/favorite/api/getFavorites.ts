import {apiClient} from '../../../shared/api/apiClient';
import type {RouteListItem} from '../../route';
import type {PaginatedResponse} from '../../../shared/api/types';

export async function getFavorites(
    page: number,
): Promise<PaginatedResponse<RouteListItem>> {
    const {data} = await apiClient.get<
        PaginatedResponse<RouteListItem>
    >('/favorites', {params: {page}});

    return data;
}