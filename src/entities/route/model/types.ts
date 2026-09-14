import type { PaginatedResponse } from '../../../shared/api/types';

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

export interface RoutePhoto {
    id: number;
    routeId: number;
    url: string;
    caption: string | null;
    position: number;
    createdAt: string;
    updatedAt: string;
}

export interface RouteStop {
    id: number;
    routeId: number;
    name: string;
    address: string | null;
    latitude: number;
    cityName: string | null;
    countryName: string | null;
    countryCode: string | null;
    longitude: number;
    position: number;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface RouteBuildGeometry {
    type: 'LineString';
    coordinates: [number, number][];
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

export interface RouteResponse {
    id: number;
    userId: number;
    title: string;
    slug: string;
    description: string | null;
    coverUrl: string | null;
    totalDistanceMeters: number | null;
    totalDurationSeconds: number | null;
    isRouteActual: boolean;
    createdAt: string;
    updatedAt: string;
    stops: RouteStop[];
    tags: RouteTag[];
}

export interface RouteDetails {
    id: number;
    userId: number;
    title: string;
    slug: string;
    description: string | null;
    coverUrl: string | null;
    totalDistanceMeters: number | null;
    totalDurationSeconds: number | null;
    routeGeometry: RouteBuildGeometry | null;
    routeBuiltAt: string | null;
    isRouteActual: boolean;
    author: RouteAuthor;
    stops: RouteStop[];
    tags: RouteTag[];
    photos: RoutePhoto[];
    likesCount: number;
    isLiked: boolean;
    isFavorite: boolean;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRoutePayload {
    title: string;
    description?: string;
    tags?: string[];
}

export interface RouteBuildResponse {
    id: number;
    totalDistanceMeters: number;
    totalDurationSeconds: number;
    routeGeometry: RouteBuildGeometry;
    routeBuiltAt: string;
    isRouteActual: boolean;
}

export interface RouteCoverResponse {
    coverUrl: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

export type RoutesPaginatedResponse = PaginatedResponse<RouteListItem>;

export interface UpdateRoutePayload {
    title?: string;
    description?: string;
}

export interface UpdateRouteTagsPayload {
    tags: string[];
}

