import {apiClient} from '../../../shared/api/apiClient';
import type {RouteLikeResponse} from '../model/types';

export async function unlikeRoute(
    routeId: number,
): Promise<RouteLikeResponse> {
    const {data} = await apiClient.delete<RouteLikeResponse>(
        `/routes/${routeId}/like`,
    );

    return data;
}