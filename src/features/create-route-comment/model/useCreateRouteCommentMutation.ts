import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createComment} from '../../../entities/comment/api/createComment';

export function useCreateRouteCommentMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: string) =>
            createComment(routeId, {body}),

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