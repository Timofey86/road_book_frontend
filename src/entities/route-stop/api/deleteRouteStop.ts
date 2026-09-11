import {apiClient} from "../../../shared/api/apiClient.ts";

interface DeleteRouteStopParams {
    routeId: number;
    stopId: number;
}

export async function deleteRouteStop({
    routeId,
    stopId,
}: DeleteRouteStopParams): Promise<void> {
    await apiClient.delete(
        `/routes/${routeId}/stops/${stopId}`,
    );
}