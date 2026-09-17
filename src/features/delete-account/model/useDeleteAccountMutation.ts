import {useMutation, useQueryClient} from '@tanstack/react-query';
import {currentUserQueryOptions} from '../../../entities/user';
import {deleteUser} from "../../../entities/user/api/deleteUser.ts";
import {logout} from "../../auth/api/logout.ts";


export function useDeleteAccountMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await deleteUser();

            try {
                await logout();
            } catch {
                // User has already been deleted.
            }
        },

        onSuccess: () => {
            queryClient.setQueryData(
                currentUserQueryOptions.queryKey,
                null,
            );
        },
    });
}