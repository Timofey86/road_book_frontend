import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createRoute} from "../api/createRoute.ts";
import {buildRoute} from "../api/buildRoute.ts";
import {uploadRouteCover} from "../api/uploadRouteCover.ts";

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

export function useUploadRouteCoverMutation(routeId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) =>
            uploadRouteCover({
                routeId,
                file,
            }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['route', routeId],
            });

            await queryClient.invalidateQueries({
                queryKey: ['routes'],
            });
        },
    });
}