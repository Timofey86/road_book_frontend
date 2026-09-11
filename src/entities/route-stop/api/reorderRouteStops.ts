import type {ReorderRouteStopsPayload} from "../model/types.ts";
import type {RouteStop} from "../../route";
import {apiClient} from "../../../shared/api/apiClient.ts";


interface ReorderRouteStopsParams {
    routeId: number;
    payload: ReorderRouteStopsPayload;
}

export async function reorderRouteStops({
    routeId,
    payload,
}: ReorderRouteStopsParams): Promise<RouteStop[]> {
    const { data } = await apiClient.patch<RouteStop[]>(
        `/routes/${routeId}/stops/reorder`,
        payload,
    );

    return data;
}