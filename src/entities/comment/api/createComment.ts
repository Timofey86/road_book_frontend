import type {Comment} from '../model/types';
import {apiClient} from "../../../shared/api/apiClient.ts";

interface CreateCommentData {
    body: string;
}

export async function createComment(
    routeId: number,
    data: CreateCommentData,
): Promise<Comment> {
    const response = await apiClient.post<Comment>(
        `/routes/${routeId}/comments`,
        data,
    );

    return response.data;
}