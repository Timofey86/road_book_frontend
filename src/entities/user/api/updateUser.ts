import type {CurrentUser,UpdateUser} from '../model/types.ts';
import {apiClient} from '../../../shared/api/apiClient.ts';

export async function updateUser(
    dto: UpdateUser,
): Promise<CurrentUser> {
    const {data} = await apiClient.patch<CurrentUser>(
        '/users/me',
        dto,
    );

    return data;
}