import type {RouteBuildResponse} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";

export async function buildRoute(
    routeId: number,
): Promise<RouteBuildResponse> {
    const { data } = await apiClient.post<RouteBuildResponse>(
        `/routes/${routeId}/build`,
    );

    return data;
}