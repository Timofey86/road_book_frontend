import {apiClient} from '../../../shared/api/apiClient';
import type {
    RouteResponse,
    UpdateRouteTagsPayload,
} from '../model/types';

export async function updateRouteTags(
    routeId: number,
    payload: UpdateRouteTagsPayload,
): Promise<RouteResponse> {
    const {data} = await apiClient.put<RouteResponse>(
        `/routes/${routeId}/tags`,
        payload,
    );

    return data;
}