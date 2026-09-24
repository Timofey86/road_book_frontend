import {
    MapContainer,
    Marker,
    Polyline,
    Popup,
    TileLayer,
    useMap,
} from 'react-leaflet';
import styles from './RouteMap.module.css';
import { useEffect } from 'react';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type {
    RouteBuildGeometry,
    RouteStop,
} from '../../../entities/route';

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});


interface RouteMapProps {
    geometry: RouteBuildGeometry;
    stops: RouteStop[];
}

interface FitBoundsProps {
    positions: [number, number][];
}

function FitBounds({positions}: FitBoundsProps) {
    const map = useMap();

    useEffect(() => {
        if (positions.length === 0) {
            return;
        }

        const bounds = L.latLngBounds(positions);

        map.fitBounds(bounds, {
            padding: [30, 30],
        });
    }, [map, positions]);

    return null;
}
export function RouteMap({geometry, stops}: RouteMapProps) {
    const routePositions: [number, number][] =
        geometry.coordinates.map(
            ([longitude, latitude]) => [
                latitude,
                longitude,
            ],
        ) ?? [];

    const stopPositions: [number, number][] =
        stops.map((stop) => [
            stop.latitude,
            stop.longitude,
        ]);

    const boundsPositions =
        routePositions.length > 0
            ? routePositions
            : stopPositions;

    return(
        <div className={styles.wrapper}>
            <MapContainer
                center={[51.1657, 10.4515]}
                zoom={6}
                className={styles.map}
                scrollWheelZoom
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {routePositions.length > 0 && (
                    <Polyline
                        positions={routePositions}
                    />
                )}

                {stops.map((stop) => (
                    <Marker
                        key={stop.id}
                        position={[
                            stop.latitude,
                            stop.longitude,
                        ]}
                    >
                        <Popup>
                            <strong>
                                {stop.position}. {stop.name}
                            </strong>

                            {stop.address && (
                                <>
                                    <br />
                                    {stop.address}
                                </>
                            )}
                        </Popup>
                    </Marker>
                ))}

                <FitBounds
                    positions={boundsPositions}
                />
            </MapContainer>
        </div>
    )
}
