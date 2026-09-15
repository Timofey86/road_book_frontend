import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createRoute} from "../api/createRoute.ts";
import {buildRoute} from "../api/buildRoute.ts";
import {uploadRouteCover} from "../api/uploadRouteCover.ts";
import type {UpdateRoutePayload, UpdateRouteTagsPayload, UploadRoutePhotoPayload} from "./types.ts";
import {updateRoute} from "../api/updateRoute.ts";
import {updateRouteTags} from "../api/updateRouteTags.ts";
import {deleteRoute} from "../api/deleteRoute.ts";
import {uploadRoutePhoto} from "../api/uploadRoutePhoto.ts";
import {deleteRoutePhoto} from "../api/deleteRoutePhoto.ts";
import {reorderRoutePhotos} from "../api/reorderRoutePhotos.ts";
import {updateRoutePhoto} from "../api/updateRoutePhoto.ts";

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

export function useUpdateRouteMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            payload: UpdateRoutePayload,
        ) => updateRoute(routeId, payload),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['route', routeId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['routes'],
                }),
            ]);
        },
    });
}

export function useUpdateRouteTagsMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            payload: UpdateRouteTagsPayload,
        ) => updateRouteTags(routeId, payload),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['route', routeId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['routes'],
                }),
            ]);
        },
    });
}

export function useDeleteRouteMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteRoute(routeId),

        onSuccess: async () => {
            queryClient.removeQueries({
                queryKey: ['route', routeId],
            });

            await queryClient.invalidateQueries({
                queryKey: ['routes'],
            });
        },
    });
}

export function useUploadRoutePhotoMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            payload: UploadRoutePhotoPayload,
        ) =>
            uploadRoutePhoto({
                routeId,
                ...payload,
            }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['route', routeId],
            });
        },
    });
}

export function useDeleteRoutePhotoMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (photoId: number) =>
            deleteRoutePhoto({
                routeId,
                photoId,
            }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['route', routeId],
            });
        },
    });
}

export function useReorderRoutePhotosMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (photoIds: number[]) =>
            reorderRoutePhotos(routeId, {
                photoIds,
            }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['route', routeId],
            });
        },
    });
}

export function useUpdateRoutePhotoMutation(
    routeId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            photoId,
            caption,
        }: {
            photoId: number;
            caption: string | null;
        }) =>
            updateRoutePhoto({
                routeId,
                photoId,
                payload: {
                    caption,
                },
            }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['route', routeId],
            });
        },
    });
}