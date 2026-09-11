import type {PlaceSearchResult} from "../model/types.ts";
import {apiClient} from "../../../shared/api/apiClient.ts";

export async function searchPlaces(
    query: string,
): Promise<PlaceSearchResult[]> {
    const { data } = await apiClient.get<PlaceSearchResult[]>(
        '/places/search',
        {
            params: {
                q: query,
            },
        },
    );

    return data;
}