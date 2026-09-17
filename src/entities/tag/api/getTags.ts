import {apiClient} from '../../../shared/api/apiClient';

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export async function getTags(
    search?: string,
): Promise<Tag[]> {
    const {data} = await apiClient.get<Tag[]>(
        '/tags',
        {
            params: {
                search: search || undefined,
            },
        },
    );

    return data;
}