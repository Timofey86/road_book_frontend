import {apiClient} from '../../../shared/api/apiClient';
import type {
    RoutePhoto,
    UpdateRoutePhotoPayload,
} from '../model/types';

interface UpdateRoutePhotoParams {
    routeId: number;
    photoId: number;
    payload: UpdateRoutePhotoPayload;
}

export async function updateRoutePhoto({
    routeId,
    photoId,
    payload,
}: UpdateRoutePhotoParams): Promise<RoutePhoto> {
    const {data} = await apiClient.patch<RoutePhoto>(
        `/routes/${routeId}/photos/${photoId}`,
        payload,
    );

    return data;
}