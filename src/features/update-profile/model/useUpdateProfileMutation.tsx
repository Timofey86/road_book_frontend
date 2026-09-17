import {useMutation,useQueryClient} from '@tanstack/react-query';
import {currentUserQueryOptions} from '../../../entities/user';
import {updateUser} from "../../../entities/user/api/updateUser.ts";

export function useUpdateProfileMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,

        onSuccess: (user) => {
            queryClient.setQueryData(
                currentUserQueryOptions.queryKey,
                user,
            );
        },
    });
}