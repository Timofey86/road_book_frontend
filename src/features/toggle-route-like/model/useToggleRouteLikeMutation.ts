import {useMutation, useQueryClient} from '@tanstack/react-query';
import {unlikeRoute} from "../../../entities/route/api/unlikeRoute.ts";
import {likeRoute} from "../../../entities/route/api/likeRoute.ts";


interface ToggleRouteLikeParams {
    routeId: number;
    isLiked: boolean;
}

export function useToggleRouteLikeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({routeId, isLiked}: ToggleRouteLikeParams) => {
            return isLiked
                ? unlikeRoute(routeId)
                : likeRoute(routeId);
        },

        onSuccess: async (data) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['route', data.routeId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['routes'],
                }),
            ]);
        },
    });
}