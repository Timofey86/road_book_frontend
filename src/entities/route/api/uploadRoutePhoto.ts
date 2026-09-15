import {apiClient} from '../../../shared/api/apiClient';
import type {
    RoutePhoto,
    UploadRoutePhotoPayload,
} from '../model/types';

interface UploadRoutePhotoParams
    extends UploadRoutePhotoPayload {
    routeId: number;
}

export async function uploadRoutePhoto({
    routeId,
    file,
    caption,
}: UploadRoutePhotoParams): Promise<RoutePhoto> {
    const formData = new FormData();

    formData.append('file', file);

    if (caption?.trim()) {
        formData.append('caption', caption.trim());
    }

    const {data} = await apiClient.post<RoutePhoto>(
        `/routes/${routeId}/photos`,
        formData,
    );

    return data;
}