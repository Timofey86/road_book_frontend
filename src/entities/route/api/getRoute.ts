import {apiClient} from "../../../shared/api/apiClient";
import type {RouteDetails} from "../model/types";

export async function getRoute(
    routeId: number,
): Promise<RouteDetails> {
    const { data } = await apiClient.get<RouteDetails>(
        `/routes/${routeId}`,
    );

    return data;
}