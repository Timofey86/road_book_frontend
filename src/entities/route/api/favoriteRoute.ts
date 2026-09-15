import {apiClient} from '../../../shared/api/apiClient';
import type {FavoriteResponse} from '../model/types';

export async function addRouteToFavorites(
    routeId: number,
): Promise<FavoriteResponse> {
    const {data} = await apiClient.post<FavoriteResponse>(
        `/routes/${routeId}/favorite`,
    );

    return data;
}

export async function removeRouteFromFavorites(
    routeId: number,
): Promise<FavoriteResponse> {
    const {data} = await apiClient.delete<FavoriteResponse>(
        `/routes/${routeId}/favorite`,
    );

    return data;
}