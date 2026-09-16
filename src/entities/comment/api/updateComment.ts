import {apiClient} from '../../../shared/api/apiClient';
import type {Comment} from '../model/types';

interface UpdateCommentParams {
    commentId: number;
    body: string;
}

export async function updateComment({
    commentId,
    body,
}: UpdateCommentParams): Promise<Comment> {
    const {data} = await apiClient.patch<Comment>(
        `/comments/${commentId}`,
        {body},
    );

    return data;
}