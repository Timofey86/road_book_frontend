export interface CreateRouteStopPayload {
    name: string;
    address?: string;
    cityName?: string;
    countryName?: string;
    countryCode?: string;
    latitude: number;
    longitude: number;
    description?: string;
}

export interface ReorderRouteStopItem {
    id: number;
    position: number;
}

export interface ReorderRouteStopsPayload {
    stops: ReorderRouteStopItem[];
}