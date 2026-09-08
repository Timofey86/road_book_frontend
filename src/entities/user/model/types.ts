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