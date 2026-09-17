import {apiClient} from '../../../shared/api/apiClient';
import type {
    RouteListItem,
    RoutesQueryParams,
} from '../model/types';
import type {PaginatedResponse} from "../../../shared/api/types.ts";

export async function getRoutes(
    params: RoutesQueryParams,
): Promise<PaginatedResponse<RouteListItem>> {
    const {data} = await apiClient.get<
        PaginatedResponse<RouteListItem>
    >('/routes', {
        params: {
            ...params,
            limit: params.limit ?? 12,
        },
    });

    return data;
}