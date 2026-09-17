import {queryOptions} from "@tanstack/react-query";
import {getCurrentUser} from "../api/getCurrentUser.ts";
import {getPublicUser} from "../api/getPublicUser.ts";

export const currentUserQueryOptions = queryOptions({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 60_000
});

export function publicUserQueryOptions(userId: number) {
    return queryOptions({
        queryKey: ['users', userId],
        queryFn: () => getPublicUser(userId),
        staleTime: 60_000,
    });
}