export interface PlaceSearchResult {
    name: string;
    address: string | null;
    cityName: string | null;
    countryName: string | null;
    countryCode: string | null;
    latitude: number;
    longitude: number;
}