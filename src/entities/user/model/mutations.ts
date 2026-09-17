import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updatePreferredLanguage} from "../api/updatePrefferedLanguage.ts";
import {currentUserQueryOptions} from "./queries.ts";
import {uploadAvatar} from "../api/uploadAvatar.ts";
import {deleteAvatar} from "../api/deleteAvatar.ts";

export function useUpdatePreferredLanguageMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePreferredLanguage,

        onSuccess: (user) => {
            queryClient.setQueryData(
                currentUserQueryOptions.queryKey,
                user,
            );
        },
    });
}

export function useUploadAvatarMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadAvatar,

        onSuccess: (user) => {
            queryClient.setQueryData(
                ['current-user'],
                user,
            );
        },
    });
}

export function useDeleteAvatarMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAvatar,

        onSuccess: (user) => {
            queryClient.setQueryData(
                ['current-user'],
                user,
            );
        },
    });
}