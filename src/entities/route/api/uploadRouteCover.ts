import {apiClient} from "../../../shared/api/apiClient.ts";
import type {RouteCoverResponse} from "../model/types.ts";

interface UploadRouteCoverParams {
    routeId: number;
    file: File;
}

export async function uploadRouteCover({
    routeId,
    file,
}: UploadRouteCoverParams): Promise<RouteCoverResponse> {
    const formData = new FormData();

    formData.append('file', file);

    const { data } = await apiClient.post<RouteCoverResponse>(
        `/routes/${routeId}/cover`,
        formData,
    );

    return data;
}
