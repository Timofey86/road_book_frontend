import type {CreateRouteStopPayload} from "../model/types.ts";
import type {RouteStop} from "../../route";
import {apiClient} from "../../../shared/api/apiClient.ts";

interface CreateRouteStopParams {
    routeId: number;
    payload: CreateRouteStopPayload;
}

export async function createRouteStop({
    routeId,
    payload,
}: CreateRouteStopParams): Promise<RouteStop> {
    const { data } = await apiClient.post<RouteStop>(
        `/routes/${routeId}/stops`,
        payload,
    );

    return data;
}