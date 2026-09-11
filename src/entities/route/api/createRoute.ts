import type {CreateRoutePayload, RouteResponse} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";

export async function createRoute(
    payload: CreateRoutePayload,
): Promise<RouteResponse> {
    const { data } = await apiClient.post<RouteResponse>(
        '/routes',
        payload,
    );

    return data;
}