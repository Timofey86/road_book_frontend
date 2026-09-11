import {useQuery} from '@tanstack/react-query';
import styles from './EditRouteStopsPage.module.css';
import {routeDetailsQueryOptions} from "../../../entities/route";
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
import {useReorderRouteStopsMutation} from "../../../entities/route-stop";
import {SortableStopItem} from "../../../features/edit-route-stops/ui/SortableStopItem.tsx";

interface EditRouteStopsPageProps {
    routeId: number;
}

export function EditRouteStopsPage({
                                       routeId
                                   }: EditRouteStopsPageProps) {
    const {
        data: route,
        isPending,
        isError,
    } = useQuery(routeDetailsQueryOptions(routeId));

    const reorderMutation = useReorderRouteStopsMutation(routeId);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

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

    if (isPending) {
        return (
            <div className={styles.page}>
                Loading route...
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.page}>
                Failed to load route.
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <span className={styles.eyebrow}>
                        Edit route
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
                        <h2>Stops</h2>
                        <p>
                            Add at least two stops to build
                            your route.
                        </p>
                    </div>

                    <span className={styles.stopsCount}>
                        {route.stops.length} stops
                    </span>
                </div>

                <AddRouteStop routeId={route.id}/>

                {route.stops.length === 0 ? (
                    <div className={styles.empty}>
                        <strong>No stops yet</strong>
                        <span>
                            Search for a city or address to add
                            your first stop.
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
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </section>
        </div>
    )
}