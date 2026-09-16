import type {PaginatedResponse} from "../../../shared/api/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";
import type {Comment} from '../model/types';

export async function getComments(
    routeId: number,
    page: number,
): Promise<PaginatedResponse<Comment>> {
    const {data} = await apiClient.get<
        PaginatedResponse<Comment>
    >(`/routes/${routeId}/comments`, {
        params: {page},
    });

    return data;
}