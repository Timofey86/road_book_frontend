import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateComment} from "../../../entities/comment/api/updateComment.ts";

interface EditRouteCommentVariables {
    commentId: number;
    body: string;
}

export function useEditRouteCommentMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({commentId, body}: EditRouteCommentVariables) =>
            updateComment({commentId, body}),

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