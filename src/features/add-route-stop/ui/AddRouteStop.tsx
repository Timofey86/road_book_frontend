import styles from './AddRouteStop.module.css';
import {useState} from "react";
import {useDebounce} from "../../../shared/lib/useDebounce.ts";
import {type CreateRouteStopPayload, useCreateRouteStopMutation} from "../../../entities/route-stop";
import {useQuery} from "@tanstack/react-query";
import {type PlaceSearchResult, placesSearchQueryOptions} from "../../../entities/place";
import {MapPin, Search} from "lucide-react";
import {useTranslation} from 'react-i18next';

interface AddRouteStopProps {
    routeId: number;
}

export function AddRouteStop({routeId}: AddRouteStopProps) {
    const {t} = useTranslation();
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(
        query.trim(),
        600,
    );

    const createStopMutation = useCreateRouteStopMutation(routeId);
    const {
        data: places = [],
        isFetching,
        isError,
    } = useQuery(placesSearchQueryOptions(debouncedQuery));

    const handleSelectPlace = (
        place: PlaceSearchResult,
    ) => {
        const payload: CreateRouteStopPayload = {
            name: place.name,
            address: place.address ?? undefined,
            cityName: place.cityName ?? undefined,
            countryName: place.countryName ?? undefined,
            countryCode: place.countryCode ?? undefined,
            latitude: place.latitude,
            longitude: place.longitude,
        };

        createStopMutation.mutate(
            {
                routeId,
                payload,
            },
            {
                onSuccess: () => {
                    setQuery('');
                },
            },
        );
    };

    const showResults = debouncedQuery.length >= 3;

    return(
        <div className={styles.wrapper}>
            <label
                htmlFor="place-search"
                className={styles.label}
            >
                {t('editRouteStops.stops.add')}
            </label>

            <div className={styles.searchWrapper}>
                <Search
                    size={18}
                    className={styles.searchIcon}
                />

                <input
                    id="place-search"
                    type="text"
                    value={query}
                    placeholder={t('editRouteStops.stops.searchPlaceholder')}
                    autoComplete="off"
                    onChange={(event) =>
                        setQuery(event.target.value)
                    }
                />

                {isFetching && (
                    <span className={styles.loading}>
                        {t('editRouteStops.stops.searching')}
                    </span>
                )}
            </div>

            {showResults && (
                <div className={styles.results}>
                    {isError && (
                        <div className={styles.message}>
                            {t('editRouteStops.stops.searchError')}
                        </div>
                    )}

                    {!isFetching &&
                        !isError &&
                        places.length === 0 && (
                            <div className={styles.message}>
                                {t('editRouteStops.stops.noResults')}
                            </div>
                        )}

                    {places.map((place, index) => (
                        <button
                            key={`${place.latitude}-${place.longitude}-${index}`}
                            type="button"
                            className={styles.result}
                            onClick={() => handleSelectPlace(place)}
                            disabled={createStopMutation.isPending}
                        >
                            <MapPin size={18} />
                            <span className={styles.resultContent}>
                                <strong>{place.name}</strong>
                                {place.address && (
                                    <span>
                                        {place.address}
                                    </span>
                                )}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {createStopMutation.isError && (
                <div className={styles.error}>
                    {t('editRouteStops.stops.addError')}
                </div>
            )}
        </div>
    )
}