import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updatePreferredLanguage} from "../api/updatePrefferedLanguage.ts";
import {currentUserQueryOptions} from "./queries.ts";

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