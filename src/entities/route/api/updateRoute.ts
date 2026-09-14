import {apiClient} from '../../../shared/api/apiClient';
import type {
    RouteResponse,
    UpdateRoutePayload,
} from '../model/types';

export async function updateRoute(
    routeId: number,
    payload: UpdateRoutePayload,
): Promise<RouteResponse> {
    const {data} = await apiClient.patch<RouteResponse>(
        `/routes/${routeId}`,
        payload,
    );

    return data;
}