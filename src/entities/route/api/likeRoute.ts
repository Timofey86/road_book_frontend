import {apiClient} from '../../../shared/api/apiClient';
import type {RouteLikeResponse} from '../model/types';

export async function likeRoute(
    routeId: number,
): Promise<RouteLikeResponse> {
    const {data} = await apiClient.post<RouteLikeResponse>(
        `/routes/${routeId}/like`,
    );

    return data;
}