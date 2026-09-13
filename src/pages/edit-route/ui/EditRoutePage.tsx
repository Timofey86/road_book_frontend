import styles from './EditRoutePage.module.css';
import {routeDetailsQueryOptions} from "../../../entities/route";
import {useQuery} from "@tanstack/react-query";
import {UploadRouteCover} from "../../../features/upload-route-cover";
import {Link} from "@tanstack/react-router";

interface EditRoutePageProps {
    routeId: number;
}
export function EditRoutePage({routeId}: EditRoutePageProps) {
    const {
        data: route,
        isPending,
        isError,
    } = useQuery(
        routeDetailsQueryOptions(routeId),
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

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    Edit route
                </span>

                <h1>{route.title}</h1>

                <p>
                    Manage the route information
                    and appearance.
                </p>
            </header>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>Cover</h2>

                        <p>
                            Choose an image that represents
                            your route.
                        </p>
                    </div>
                </div>

                <UploadRouteCover
                    routeId={route.id}
                    coverUrl={route.coverUrl}
                />
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>Route stops</h2>

                        <p>
                            Add, remove and reorder stops.
                        </p>
                    </div>

                    <Link
                        to="/routes/$routeId/edit/stops"
                        params={{
                            routeId: String(route.id),
                        }}
                        className={styles.editStopsButton}
                    >
                        Edit stops
                    </Link>
                </div>

                <div className={styles.routeInfo}>
                    <strong>
                        {route.stops.length}
                    </strong>

                    <span>stops</span>
                </div>
            </section>
        </div>
    )
}


