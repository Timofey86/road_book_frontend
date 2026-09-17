import {apiClient} from '../../../shared/api/apiClient.ts';
import type {PublicUser} from '../model/types.ts';

export async function getPublicUser(userId: number): Promise<PublicUser> {
    const {data} = await apiClient.get<PublicUser>(
        `/users/${userId}`,
    );

    return data;
}