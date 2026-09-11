import {queryOptions} from "@tanstack/react-query";
import {searchPlaces} from "../api/searchPlaces.ts";

export function placesSearchQueryOptions(query: string) {
    return queryOptions({
        queryKey: ['places', 'search', query],
        queryFn: () => searchPlaces(query),
        enabled: query.length >= 3,
        staleTime: 5 * 60_000,
    });
}