import {useQuery} from '@tanstack/react-query';
import {ArrowLeft, Clock3, Heart, MapPin, RouteIcon, Star} from 'lucide-react';
import {routeDetailsQueryOptions} from '../../../entities/route';
import {RouteMap} from '../../../features/route-map';
import {formatDuration} from '../../../shared/lib/formatDuration';
import styles from './RouteDetailsPage.module.css';
import {Link, useRouter} from "@tanstack/react-router";
import {appRoutes} from "../../../shared/lib/routes.ts";
import {currentUserQueryOptions} from "../../../entities/user";
import {useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import {RouteLikeButton} from "../../../features/toggle-route-like";
import {RouteFavoriteButton} from "../../../features/toggle-route-favorite";

interface RouteDetailsPageProps {
    routeId: number;
}

export function RouteDetailsPage({routeId}: RouteDetailsPageProps) {
    const {
        data: route,
        isPending,
        isError,
    } = useQuery(routeDetailsQueryOptions(routeId));

    const [photoIndex, setPhotoIndex] = useState(-1);
    const router = useRouter();

    const {data: currentUser} = useQuery(
        currentUserQueryOptions,
    );

    if (isPending) {
        return (
            <div className={styles.page}>
                Loading route...
            </div>
        );
    }

    if (isError || !route) {
        return (
            <div className={styles.page}>
                Failed to load route.
            </div>
        );
    }

    const photos = route.photos.toSorted(
        (a, b) => a.position - b.position,
    );

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


    return (
        <div className={styles.page}>
            <button
                type="button"
                className={styles.backLink}
                onClick={() => router.history.back()}
            >
                <ArrowLeft size={16}/>
                Back
            </button>
            {route.coverUrl ? (
                <section className={styles.hero}>
                    <img
                        src={route.coverUrl}
                        alt={route.title}
                        className={styles.heroImage}
                    />

                    <div className={styles.heroOverlay}/>

                    {route.totalDistanceMeters !== null && (
                        <span className={styles.distanceBadge}>
                            {Math.round(
                                route.totalDistanceMeters / 1000,
                            )}{' '}
                            km
                        </span>
                    )}

                    <div className={styles.heroContent}>
                        <div className={styles.author}>
                            {route.author.avatarUrl ? (
                                <img
                                    src={route.author.avatarUrl}
                                    alt={route.author.name}
                                />
                            ) : (
                                <div className={styles.avatarFallback}>
                                    {route.author.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}

                            <span>{route.author.name}</span>
                        </div>

                        <h1>{route.title}</h1>

                        {route.description && (
                            <p className={styles.description}>
                                {route.description}
                            </p>
                        )}

                        {route.tags.length > 0 && (
                            <div className={styles.tags}>
                                {route.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className={styles.tag}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                <header className={styles.header}>
                    <div className={styles.authorPlain}>
                        {route.author.avatarUrl ? (
                            <img
                                src={route.author.avatarUrl}
                                alt={route.author.name}
                            />
                        ) : (
                            <div className={styles.avatarFallbackPlain}>
                                {route.author.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                        )}

                        <span>{route.author.name}</span>
                    </div>

                    <h1>{route.title}</h1>

                    {route.description && (
                        <p>{route.description}</p>
                    )}

                    {route.tags.length > 0 && (
                        <div className={styles.plainTags}>
                            {route.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className={styles.plainTag}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </header>
            )}

            {route.userId === currentUser?.id && (
                <div className={styles.ownerActions}>
                    <Link
                        to={appRoutes.editRoute}
                        params={{
                            routeId: String(route.id),
                        }}
                        className={styles.primaryAction}
                    >
                        Edit route
                    </Link>

                    <Link
                        to={appRoutes.editRouteStops}
                        params={{
                            routeId: String(route.id),
                        }}
                        className={styles.secondaryAction}
                    >
                        Edit stops
                    </Link>
                </div>
            )}

            <div className={styles.mainGrid}>
                <div className={styles.mainColumn}>
                    {route.routeGeometry &&
                        route.isRouteActual && (
                            <section className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <div>
                                        <span className={styles.sectionEyebrow}>
                                            Route
                                        </span>

                                        <h2>Route map</h2>
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
                                    className={
                                        styles.sectionEyebrow
                                    }
                                >
                                    Itinerary
                                </span>

                                <h2>Stops</h2>
                            </div>

                            <span className={styles.stopCount}>
                                {route.stops.length}{' '}
                                {route.stops.length === 1
                                    ? 'stop'
                                    : 'stops'}
                            </span>
                        </div>

                        <div className={styles.stops}>
                            {route.stops.map((stop) => (
                                <div
                                    key={stop.id}
                                    className={styles.stop}
                                >
                                    <div
                                        className={
                                            styles.stopPosition
                                        }
                                    >
                                        {stop.position}
                                    </div>

                                    <div
                                        className={
                                            styles.stopContent
                                        }
                                    >
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
                                        className={
                                            styles.stopIcon
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <section className={styles.infoCard}>
                        <h2>Route info</h2>

                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <div
                                    className={
                                        styles.infoIcon
                                    }
                                >
                                    <RouteIcon size={18}/>
                                </div>

                                <div>
                                    <span>Distance</span>
                                    <strong>{distance}</strong>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div
                                    className={
                                        styles.infoIcon
                                    }
                                >
                                    <Clock3 size={18}/>
                                </div>

                                <div>
                                    <span>Duration</span>
                                    <strong>{duration}</strong>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div
                                    className={
                                        styles.infoIcon
                                    }
                                >
                                    <MapPin size={18}/>
                                </div>

                                <div>
                                    <span>Stops</span>
                                    <strong>
                                        {route.stops.length}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.activityCard}>
                        {currentUser ? (
                            <RouteLikeButton
                                routeId={route.id}
                                isLiked={route.isLiked}
                                likesCount={route.likesCount}
                            />
                        ) : (
                            <div className={styles.activityRow}>
                                <Heart size={18} />
                                <span>
                                    {route.likesCount} {route.likesCount === 1 ? 'like' : 'likes'}
                                </span>
                            </div>
                        )}

                        {currentUser ? (
                            <RouteFavoriteButton
                                routeId={route.id}
                                isFavorite={route.isFavorite}
                            />
                        ) : (
                            <div className={styles.activityRow}>
                                <Star size={18}/>
                                <span>Add to favorites</span>
                            </div>
                        )}
                    </section>
                </aside>
            </div>

            {route.photos.length > 0 && (
                <section className={styles.photosSection}>
                    <div className={styles.sectionHeading}>
                        <span>GALLERY</span>
                        <h2>Photos</h2>
                    </div>

                    <div className={styles.photosGrid}>
                        {photos.map((photo, index) => (
                            <figure
                                key={photo.id}
                                className={styles.photoCard}
                                onClick={() => setPhotoIndex(index)}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.caption ?? `${route.title} photo`}
                                />

                                {photo.caption && (
                                    <figcaption>
                                        {photo.caption}
                                    </figcaption>
                                )}
                            </figure>
                        ))}
                    </div>
                </section>
            )}
            <Lightbox
                open={photoIndex >= 0}
                close={() => setPhotoIndex(-1)}
                index={photoIndex}
                plugins={[Captions]}
                captions={{
                    showToggle: true,
                    descriptionTextAlign: 'center',
                }}
                slides={photos.map((photo) => ({
                    src: photo.url,
                    alt: photo.caption ?? `${route.title} photo`,
                    description: photo.caption ?? undefined,
                }))}
            />
        </div>
    );
}