import {apiClient} from '../../../shared/api/apiClient';

interface DeleteRoutePhotoParams {
    routeId: number;
    photoId: number;
}

export async function deleteRoutePhoto({
    routeId,
    photoId,
}: DeleteRoutePhotoParams): Promise<void> {
    await apiClient.delete(
        `/routes/${routeId}/photos/${photoId}`,
    );
}