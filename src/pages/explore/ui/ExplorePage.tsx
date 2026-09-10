import {RouteCard, routesQueryOptions} from "../../../entities/route";
import {useQuery} from "@tanstack/react-query";
import styles from './ExplorePage.module.css';
import {useState} from "react";

export function ExplorePage() {
    const [page, setPage] = useState(1);
    const {
        data,
        isPending,
        isError,
        error,
    } = useQuery(routesQueryOptions(page));

    if (isPending) {
        return <div>Loading routes...</div>;
    }

    if (isError) {
        return <div>{error.message}</div>;
    }

    const {meta} = data;

    return (
        <section className={styles.explore}>
            <div className={styles.heading}>
                <div>
                    <h1>Explore</h1>
                    <p>Discover routes shared by the community.</p>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.grid}>
                    {data.items.map((route) => (
                        <RouteCard
                            key={route.id}
                            route={route}
                        />
                    ))}
                </div>

                {meta.totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            type="button"
                            disabled={meta.page === 1}
                            onClick={() => setPage((current) => current - 1)}
                        >
                            Previous
                        </button>

                        <span>
                        Page {meta.page} of {meta.totalPages}
                    </span>

                        <button
                            type="button"
                            disabled={meta.page === meta.totalPages}
                            onClick={() => setPage((current) => current + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}