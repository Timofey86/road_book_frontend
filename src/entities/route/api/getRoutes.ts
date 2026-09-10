import type {RoutesPaginatedResponse} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";

export async function getRoutes(
    page: number,
): Promise<RoutesPaginatedResponse> {
    const { data } = await apiClient.get<RoutesPaginatedResponse>(
        '/routes',
        {
            params: {
                page,
                limit: 12,
            },
        },
    );

    return data;
}