import type {RoutesPaginatedResponse} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";

export async function getMyRoutes(
    page: number,
): Promise<RoutesPaginatedResponse> {
    const {data} = await apiClient.get<RoutesPaginatedResponse>(
        '/routes/my',
        {
            params: {
                page,
                limit: 12,
            },
        },
    );

    return data;
}