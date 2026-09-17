import {queryOptions} from '@tanstack/react-query';
import {getTags} from "../api/getTags.ts";

export const tagsQueryOptions = (
    search?: string,
) =>
    queryOptions({
        queryKey: ['tags', {search}],
        queryFn: () => getTags(search),
    });