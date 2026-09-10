export interface RouteAuthor {
    id: number;
    name: string;
    avatarUrl: string | null;
}

export interface RouteTag {
    id: number;
    name: string;
    slug: string;
}

export interface RouteListItem {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    coverUrl: string | null;
    author: RouteAuthor;
    tags: RouteTag[];
    totalDistanceMeters: number | null;
    totalDurationSeconds: number | null;
    stopsCount: number;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

export interface RoutesPaginatedResponse {
    items: RouteListItem[];
    meta: PaginationMeta;
}