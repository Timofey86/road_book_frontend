import { apiClient } from '../../../shared/api/apiClient';
import type { CurrentUser } from '../../../entities/user';
import type { RegisterPayload } from '../model/types';

export async function register(
    payload: RegisterPayload,
): Promise<CurrentUser> {
    const { data } = await apiClient.post<CurrentUser>(
        '/auth/register',
        payload,
    );

    return data;
}