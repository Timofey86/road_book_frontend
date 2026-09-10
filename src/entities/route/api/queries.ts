import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {getRoutes} from "./getRoutes";

export const routesQueryOptions = (page: number) =>
    queryOptions({
        queryKey: ['routes', {page}],
        queryFn: () => getRoutes(page),
        placeholderData: keepPreviousData,
    })