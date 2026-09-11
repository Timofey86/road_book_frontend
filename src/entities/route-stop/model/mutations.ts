import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createRouteStop} from "../api/createRouteStop.ts";
import {reorderRouteStops} from "../api/reorderRouteStops.ts";

export function useCreateRouteStopMutation(routeId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRouteStop,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['route', routeId],
            });
        },
    });
}

export function useReorderRouteStopsMutation(routeId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reorderRouteStops,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['route', routeId],
            });
        },
    });
}