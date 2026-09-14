import {apiClient} from '../../../shared/api/apiClient';

export async function deleteRoute(
    routeId: number,
): Promise<void> {
    await apiClient.delete(`/routes/${routeId}`);
}