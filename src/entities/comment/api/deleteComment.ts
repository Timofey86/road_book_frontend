import {apiClient} from '../../../shared/api/apiClient';

export async function deleteComment(
    commentId: number,
): Promise<void> {
    await apiClient.delete(
        `/comments/${commentId}`,
    );
}