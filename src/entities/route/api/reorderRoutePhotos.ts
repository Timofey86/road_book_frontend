import type {RoutePhoto} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";

interface ReorderRoutePhotosPayload {
    photoIds: number[];
}

export async function reorderRoutePhotos(
    routeId: number,
    payload: ReorderRoutePhotosPayload,
): Promise<RoutePhoto[]> {
    const {data} = await apiClient.patch<RoutePhoto[]>(
        `/routes/${routeId}/photos/reorder`,
        payload,
    );

    return data;
}