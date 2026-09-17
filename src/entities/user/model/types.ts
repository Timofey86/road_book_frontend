export type PreferredLanguage = 'ru' | 'en';

export interface CurrentUser {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatarUrl: string | null;
    preferredLanguage: PreferredLanguage;
    routesCount: number;
    receivedLikesCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface PublicUser {
    id: number;
    name: string;
    bio: string | null;
    avatarUrl: string | null;
    routesCount: number;
    receivedLikesCount: number;
    createdAt: string;
}

export interface UpdateUser {
    name?: string;
    bio?: string;
    preferredLanguage?: PreferredLanguage;
}