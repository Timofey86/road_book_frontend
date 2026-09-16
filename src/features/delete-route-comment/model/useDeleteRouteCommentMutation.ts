import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import {deleteComment} from '../../../entities/comment/api/deleteComment';

export function useDeleteRouteCommentMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId: number) =>
            deleteComment(commentId),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['comments', routeId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['route', routeId],
                }),
            ]);
        },
    });
}