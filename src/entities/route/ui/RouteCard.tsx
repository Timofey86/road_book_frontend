import {
    Clock3,
    Heart,
    MapPin,
} from 'lucide-react';
import type {RouteListItem} from '../model/types';
import {formatDuration} from '../../../shared/lib/formatDuration';
import styles from './RouteCard.module.css';
import {Link} from "@tanstack/react-router";
import {appRoutes} from "../../../shared/lib/routes.ts";

interface RouteCardProps {
    route: RouteListItem;
}

export function RouteCard({route}: RouteCardProps) {
    return (
        <Link
            to={appRoutes.routeDetails}
            params={{
                routeId: String(route.id),
            }}
            className={styles.cardLink}
        >
            <article className={styles.card}>
                <div className={styles.coverWrapper}>
                    {route.coverUrl ? (
                        <img
                            className={styles.cover}
                            src={route.coverUrl}
                            alt={route.title}
                        />
                    ) : (
                        <div className={styles.coverPlaceholder}>
                            No image
                        </div>
                    )}

                    {route.totalDistanceMeters !== null && (
                        <span className={styles.distanceBadge}>
                        {Math.round(route.totalDistanceMeters / 1000)} km
                    </span>
                    )}

                    <div className={styles.authorOverlay}>
                        {route.author.avatarUrl ? (
                            <img
                                className={styles.avatar}
                                src={route.author.avatarUrl}
                                alt={route.author.name}
                            />
                        ) : (
                            <div className={styles.avatarFallback}>
                                {route.author.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <span>{route.author.name}</span>
                    </div>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>
                        {route.title}
                    </h2>

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

                    <div className={styles.meta}>
                    <span>
                        <MapPin size={16}/>
                        {route.stopsCount} stops
                    </span>

                        {route.totalDurationSeconds !== null && (
                            <span>
                            <Clock3 size={16}/>
                                {formatDuration(route.totalDurationSeconds)}
                        </span>
                        )}

                        <span>
                        <Heart size={16} className={styles.likesIcon}/>
                            {route.likesCount}
                    </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}
