import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addRouteToFavorites, removeRouteFromFavorites} from "../../../entities/route/api/favoriteRoute.ts";

export function useToggleRouteFavoriteMutation(
    routeId: number,
    isFavorite: boolean,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () =>
            isFavorite
                ? removeRouteFromFavorites(routeId)
                : addRouteToFavorites(routeId),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['route', routeId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['favorites'],
                }),
            ]);
        },
    });
}