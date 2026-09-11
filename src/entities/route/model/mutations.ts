import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createRoute} from "../api/createRoute.ts";
import {buildRoute} from "../api/buildRoute.ts";

export function useCreateRouteMutation() {
    return useMutation({
        mutationFn: createRoute,
    });
}

export function useBuildRouteMutation(routeId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => buildRoute(routeId),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['route', routeId],
            });
        },
    });
}