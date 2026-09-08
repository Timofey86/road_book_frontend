import {queryOptions} from "@tanstack/react-query";
import {getCurrentUser} from "../api/getCurrentUser.ts";

export const currentUserQueryOptions = queryOptions({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 60_000
});