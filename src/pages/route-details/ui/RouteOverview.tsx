import type {RouteDetails} from "../../../entities/route";
import styles from './RouteDetailsPage.module.css';
import {RouteMap} from "../../../features/route-map";
import {Clock3, MapPin, RouteIcon} from "lucide-react";
import {RouteLikeButton} from "../../../features/toggle-route-like";
import {RouteFavoriteButton} from "../../../features/toggle-route-favorite";
import {formatDuration} from "../../../shared/lib/formatDuration.ts";
import {useQuery} from "@tanstack/react-query";
import {currentUserQueryOptions} from "../../../entities/user";
import {useTranslation} from 'react-i18next';
import {useState} from "react";
import {AuthRequiredModal} from "../../../features/auth-required-modal";

interface RouteOverviewProps {
    route: RouteDetails;
}

export function RouteOverview({route}: RouteOverviewProps) {
    const {t} = useTranslation();

    const [authModalOpen, setAuthModalOpen] = useState(false);

    const distance =
        route.totalDistanceMeters !== null
            ? `${(
                route.totalDistanceMeters / 1000
            ).toFixed(1)} km`
            : '—';

    const duration =
        route.totalDurationSeconds !== null
            ? formatDuration(route.totalDurationSeconds)
            : '—';

    const {data: currentUser} = useQuery(
        currentUserQueryOptions,
    );

    return (
        <>
            <div className={styles.mainGrid}>
                <div className={styles.mainColumn}>
                    {route.routeGeometry &&
                        route.isRouteActual && (
                            <section className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <div>
                                        <span className={styles.sectionEyebrow}>
                                            {t('routeDetails.overview.route')}
                                        </span>

                                        <h2>{t('routeDetails.overview.routeMap')}</h2>
                                    </div>
                                </div>

                                <RouteMap
                                    geometry={
                                        route.routeGeometry
                                    }
                                    stops={route.stops}
                                />
                            </section>
                        )}

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div>
                                <span
                                    className={styles.sectionEyebrow}
                                >
                                    {t('routeDetails.overview.itinerary')}
                                </span>

                                <h2>{t('routeDetails.overview.stops')}</h2>
                            </div>

                            <span className={styles.stopCount}>
                                {t('routeDetails.overview.stopCount', {
                                    count: route.stops.length,
                                })}
                            </span>
                        </div>

                        <div className={styles.stops}>
                            {route.stops.map((stop) => (
                                <div
                                    key={stop.id}
                                    className={styles.stop}
                                >
                                    <div className={styles.stopPosition}>
                                        {stop.position}
                                    </div>

                                    <div className={styles.stopContent}>
                                        <strong>
                                            {stop.name}
                                        </strong>

                                        {stop.address && (
                                            <span>
                                                {stop.address}
                                            </span>
                                        )}

                                        {!stop.address &&
                                            (stop.cityName ||
                                                stop.countryName) && (
                                                <span>
                                                    {[
                                                        stop.cityName,
                                                        stop.countryName,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(', ')}
                                                </span>
                                            )}
                                    </div>

                                    <MapPin
                                        size={18}
                                        className={styles.stopIcon}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <section className={styles.infoCard}>
                        <h2>{t('routeDetails.overview.routeInfo')}</h2>

                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <RouteIcon size={18}/>
                                </div>

                                <div>
                                    <span>{t('routeDetails.overview.distance')}</span>
                                    <strong>{distance}</strong>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <Clock3 size={18}/>
                                </div>

                                <div>
                                    <span>{t('routeDetails.overview.duration')}</span>
                                    <strong>{duration}</strong>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <MapPin size={18}/>
                                </div>

                                <div>
                                    <span>{t('routeDetails.overview.stops')}</span>
                                    <strong>
                                        {route.stops.length}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.activityCard}>
                        <RouteLikeButton
                            routeId={route.id}
                            isLiked={currentUser ? route.isLiked : false}
                            likesCount={route.likesCount}
                            onAuthRequired={
                                currentUser
                                    ? undefined
                                    : () => setAuthModalOpen(true)
                            }
                        />

                        <RouteFavoriteButton
                            routeId={route.id}
                            isFavorite={currentUser ? route.isFavorite : false}
                            onAuthRequired={
                                currentUser
                                    ? undefined
                                    : () => setAuthModalOpen(true)
                            }
                        />
                    </section>
                </aside>
            </div>
            <AuthRequiredModal
                open={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                description={t('authRequired.description')}
            />
        </>
    )
}