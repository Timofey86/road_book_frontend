import type {CurrentUser} from '../model/types.ts';
import {apiClient} from '../../../shared/api/apiClient.ts';

export async function uploadAvatar(file: File): Promise<CurrentUser> {
    const formData = new FormData();
    formData.append('avatar', file);

    const {data} = await apiClient.post<CurrentUser>(
        '/users/me/avatar',
        formData,
    );

    return data;
}