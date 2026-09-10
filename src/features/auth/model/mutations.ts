import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login} from "../api/login.ts";
import {currentUserQueryOptions} from "../../../entities/user";
import {logout} from "../api/logout.ts";
import {register} from "../api/register.ts";

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,

        onSuccess: async () => {
            await queryClient.fetchQuery({
                ...currentUserQueryOptions,
                staleTime: 0,
            });
        },
    });
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: currentUserQueryOptions.queryKey,
            });
        },
    });
}

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,

        onSuccess: (user) => {
            queryClient.setQueryData(
                currentUserQueryOptions.queryKey,
                user,
            );
        },
    });
}