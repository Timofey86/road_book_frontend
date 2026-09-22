import {useQuery} from '@tanstack/react-query';
import {ArrowLeft} from 'lucide-react';
import {routeDetailsQueryOptions} from '../../../entities/route';
import styles from './RouteDetailsPage.module.css';
import {Link, useRouter} from "@tanstack/react-router";
import {appRoutes} from "../../../shared/lib/routes.ts";
import {currentUserQueryOptions} from "../../../entities/user";
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import {RouteDetailsTabs} from "./RouteDetailsTabs.tsx";
import {RouteOverview} from "./RouteOverview.tsx";
import {RoutePhotos} from "./RoutePhotos.tsx";
import {RouteComments} from "./RouteComments.tsx";
import type {RouteDetailsTab} from "../model/types.ts";
import {useTranslation} from 'react-i18next';
import {PageLoader} from "../../../shared/ui/PageLoader";

interface RouteDetailsPageProps {
    routeId: number;
    activeTab: RouteDetailsTab;
    onTabChange: (tab: RouteDetailsTab) => void;
}

export function RouteDetailsPage({routeId, activeTab, onTabChange}: RouteDetailsPageProps) {
    const {
        data: route,
        isPending,
        isError,
    } = useQuery(routeDetailsQueryOptions(routeId));

    const router = useRouter();
    const {t} = useTranslation();

    const {data: currentUser} = useQuery(
        currentUserQueryOptions,
    );

    if (isPending) {
        return <PageLoader />
    }

    if (isError || !route) {
        return (
            <div className={styles.page}>
                {t('routeDetails.loadError')}
            </div>
        );
    }
    const hasCover = Boolean(route.coverUrl);
    const isOwner = route.userId === currentUser?.id;

    return (
        <div className={styles.page}>
            <button
                type="button"
                className={styles.backLink}
                onClick={() => router.history.back()}
            >
                <ArrowLeft size={16}/>
                {t('routeDetails.back')}
            </button>

            {hasCover ? (
                <>
                    <section className={styles.hero}>
                        <img
                            src={route.coverUrl!}
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
                            <Link
                                to={appRoutes.publicProfile}
                                params={{
                                    userId: String(route.author.id),
                                }}
                                className={styles.author}
                            >
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
                            </Link>

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

                    {isOwner && (
                        <div className={styles.ownerActions}>
                            <Link
                                to={appRoutes.editRoute}
                                params={{
                                    routeId: String(route.id),
                                }}
                                className={styles.primaryAction}
                            >
                                {t('routeDetails.actions.editRoute')}
                            </Link>

                            <Link
                                to={appRoutes.editRouteStops}
                                params={{
                                    routeId: String(route.id),
                                }}
                                className={styles.secondaryAction}
                            >
                                {t('routeDetails.actions.editStops')}
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.plainHeaderRow}>
                    <header className={styles.header}>
                        <Link
                            to={appRoutes.publicProfile}
                            params={{
                                userId: String(route.author.id),
                            }}
                            className={styles.authorPlain}
                        >
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
                        </Link>

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

                    {isOwner && (
                        <div className={styles.ownerActionsPlain}>
                            <Link
                                to={appRoutes.editRoute}
                                params={{
                                    routeId: String(route.id),
                                }}
                                className={styles.primaryAction}
                            >
                                {t('routeDetails.actions.editRoute')}
                            </Link>

                            <Link
                                to={appRoutes.editRouteStops}
                                params={{
                                    routeId: String(route.id),
                                }}
                                className={styles.secondaryAction}
                            >
                                {t('routeDetails.actions.editStops')}
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <RouteDetailsTabs
                activeTab={activeTab}
                photosCount={route.photos.length}
                commentsCount={route.commentsCount}
                onTabChange={onTabChange}
            />

            {activeTab === 'overview' && (
                <RouteOverview route={route}/>
            )}

            {activeTab === 'photos' && (
                <RoutePhotos
                    photos={route.photos}
                    routeTitle={route.title}
                />
            )}

            {activeTab === 'comments' && (
                <RouteComments
                    routeId={route.id}
                    currentUserId={currentUser?.id ?? null}
                />
            )}
        </div>
    );
}