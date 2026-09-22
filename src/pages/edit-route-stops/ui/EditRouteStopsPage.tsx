import {useQuery} from '@tanstack/react-query';
import styles from './EditRouteStopsPage.module.css';
import {routeDetailsQueryOptions, useBuildRouteMutation} from "../../../entities/route";
import {AddRouteStop} from "../../../features/add-route-stop";
import {
    DndContext,
    closestCenter,
    type DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {useReorderRouteStopsMutation, useDeleteRouteStopMutation} from "../../../entities/route-stop";
import {SortableStopItem} from "../../../features/edit-route-stops/ui/SortableStopItem.tsx";
import {formatDuration} from "../../../shared/lib/formatDuration.ts";
import {RouteMap} from "../../../features/route-map";
import {Link, Navigate, useNavigate} from "@tanstack/react-router";
import {ArrowLeft} from "lucide-react";
import {appRoutes} from "../../../shared/lib/routes.ts";
import {currentUserQueryOptions} from "../../../entities/user";
import {useTranslation} from 'react-i18next';
import {PageLoader} from "../../../shared/ui/PageLoader";

interface EditRouteStopsPageProps {
    routeId: number;
}

export function EditRouteStopsPage({routeId}: EditRouteStopsPageProps) {
    const {t} = useTranslation();
    const {
        data: route,
        isPending,
        isError,
    } = useQuery(routeDetailsQueryOptions(routeId));
    const {
        data: currentUser,
        isPending: isCurrentUserPending,
    } = useQuery(currentUserQueryOptions);
    const navigate = useNavigate();

    const reorderMutation = useReorderRouteStopsMutation(routeId);
    const deleteStopMutation = useDeleteRouteStopMutation(routeId);
    const buildRouteMutation = useBuildRouteMutation(routeId);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    const handleDeleteStop = (stopId: number) => {
        deleteStopMutation.mutate({
            routeId,
            stopId,
        });
    };

    const handleBuildRoute = () => {
        buildRouteMutation.mutate(undefined, {
            onSuccess: () => {
                navigate({
                    to: appRoutes.routeDetails,
                    params: {
                        routeId: String(routeId),
                    },
                });
            },
        });
    };


    const handleDragEnd = (event: DragEndEvent) => {

        if (!route) {
            return;
        }
        const {active, over} = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = route.stops.findIndex(
            (stop) => stop.id === active.id,
        );

        const newIndex = route.stops.findIndex(
            (stop) => stop.id === over.id,
        );

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        const reorderedStops = arrayMove(
            route.stops,
            oldIndex,
            newIndex,
        );

        reorderMutation.mutate({
            routeId,
            payload: {
                stops: reorderedStops.map((stop, index) => ({
                    id: stop.id,
                    position: index + 1,
                })),
            },
        });
    };

    if (isPending || isCurrentUserPending) {
        return <PageLoader />
    }

    if (isError || !route) {
        return (
            <div className={styles.page}>
                {t('editRouteStops.loadError')}
            </div>
        );
    }

    if (!currentUser || route.userId !== currentUser.id) {
        return (
            <Navigate
                to={appRoutes.routeDetails}
                params={{
                    routeId: String(route.id),
                }}
            />
        );
    }

    const hasBuiltRoute =
        route.totalDistanceMeters !== null &&
        route.totalDurationSeconds !== null;

    const buildButtonLabel = buildRouteMutation.isPending
        ? t('editRouteStops.build.building')
        : route.isRouteActual
            ? t('editRouteStops.build.upToDate')
            : hasBuiltRoute
                ? t('editRouteStops.build.rebuild')
                : t('editRouteStops.build.build');

    return (
        <div className={styles.page}>

            <Link
                to={appRoutes.editRoute}
                params={{
                    routeId: String(route.id),
                }}
                className={styles.backLink}
            >
                <ArrowLeft size={16}/>
                {t('editRouteStops.back')}
            </Link>
            <header className={styles.header}>
                <div>
                    <span className={styles.eyebrow}>
                        {t('editRouteStops.eyebrow')}
                    </span>

                    <h1>{route.title}</h1>

                    {route.description && (
                        <p>{route.description}</p>
                    )}
                </div>
            </header>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>{t('editRouteStops.stops.title')}</h2>
                        <p>
                            {t('editRouteStops.stops.description')}
                        </p>
                    </div>

                    <span className={styles.stopsCount}>
                        {t('editRouteStops.stops.count', {
                            count: route.stops.length,
                        })}
                    </span>
                </div>

                <AddRouteStop routeId={route.id}/>

                {route.stops.length === 0 ? (
                    <div className={styles.empty}>
                        <strong>{t('editRouteStops.stops.emptyTitle')}</strong>
                        <span>
                            {t('editRouteStops.stops.emptyDescription')}
                        </span>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={route.stops.map((stop) => stop.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className={styles.stops}>
                                {route.stops.map((stop) => (
                                    <SortableStopItem
                                        key={stop.id}
                                        stop={stop}
                                        onDelete={handleDeleteStop}
                                        isDeleting={deleteStopMutation.isPending}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
                <div className={styles.buildSection}>
                    <button
                        type="button"
                        className={styles.buildButton}
                        onClick={handleBuildRoute}
                        disabled={
                            route.stops.length < 2 ||
                            buildRouteMutation.isPending ||
                            route.isRouteActual
                        }
                    >
                        {buildButtonLabel}
                    </button>

                    {route.stops.length < 2 && (
                        <span className={styles.buildHint}>
                            {t('editRouteStops.build.hint')}
                        </span>
                    )}

                    {buildRouteMutation.isError && (
                        <span className={styles.buildError}>
                            {t('editRouteStops.build.error')}
                        </span>
                    )}
                </div>

                {route.totalDistanceMeters !== null &&
                    route.totalDurationSeconds !== null && (
                        <div className={styles.routeStats}>
                            <div>
                                <strong>
                                    {(route.totalDistanceMeters / 1000).toFixed(1)} km
                                </strong>
                                <span>{t('editRouteStops.stats.distance')}</span>
                            </div>

                            <div>
                                <strong>
                                    {formatDuration(route.totalDurationSeconds)}
                                </strong>
                                <span>{t('editRouteStops.stats.duration')}</span>
                            </div>

                            <div
                                className={`${styles.statusCard} ${
                                    route.isRouteActual
                                        ? styles.statusReady
                                        : styles.statusOutdated
                                }`}
                            >
                                <strong>
                                    {route.isRouteActual
                                        ? t('editRouteStops.stats.ready')
                                        : t('editRouteStops.stats.needsRebuild')}
                                </strong>
                                <span>{t('editRouteStops.stats.status')}</span>
                            </div>
                        </div>

                    )}

                {route.routeGeometry && route.isRouteActual && (
                    <RouteMap
                        geometry={route.routeGeometry}
                        stops={route.stops}
                    />
                )}
            </section>
        </div>
    )
}