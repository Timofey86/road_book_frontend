import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login} from "../api/login.ts";
import {currentUserQueryOptions, getCurrentUser} from "../../../entities/user";
import {logout} from "../api/logout.ts";
import {register} from "../api/register.ts";
import type {RegisterPayload} from "./types.ts";

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
            queryClient.setQueryData(
                currentUserQueryOptions.queryKey,
                null,
            );
        },
    });
}

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RegisterPayload) => {
            await register(data);

            await login({
                email: data.email,
                password: data.password,
            });

            const user = await getCurrentUser();

            if (!user) {
                throw new Error('Failed to authenticate after registration');
            }

            return user;
        },

        onSuccess: (user) => {
            queryClient.setQueryData(
                currentUserQueryOptions.queryKey,
                user,
            );
        },
    });
}