import {apiClient} from '../../../shared/api/apiClient.ts';

export async function deleteUser(): Promise<void> {
    await apiClient.delete('/users/me');
}