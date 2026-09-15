import {RouteCard, routesQueryOptions} from "../../../entities/route";
import {useQuery} from "@tanstack/react-query";
import styles from './ExplorePage.module.css';
import {Pagination} from "../../../shared/ui/pagination";

interface ExplorePageProps {
    page: number;
    onPageChange: (page: number) => void;
}

export function ExplorePage({page, onPageChange}: ExplorePageProps) {
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

                <Pagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </section>
    );
}