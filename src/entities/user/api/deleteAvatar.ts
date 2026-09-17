import type {CurrentUser} from '../model/types.ts';
import {apiClient} from '../../../shared/api/apiClient.ts';

export async function deleteAvatar(): Promise<CurrentUser> {
    const {data} = await apiClient.delete<CurrentUser>(
        '/users/me/avatar',
    );

    return data;
}