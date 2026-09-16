import {useQuery} from '@tanstack/react-query';
import {Map} from 'lucide-react';
import {
    myRoutesQueryOptions,
    RouteCard,
} from '../../../entities/route';
import {Pagination} from '../../../shared/ui/pagination';
import styles from './MyRoutesPage.module.css';

interface MyRoutesPageProps {
    page: number;
    onPageChange: (page: number) => void;
}

export function MyRoutesPage({page, onPageChange}: MyRoutesPageProps) {
    const {
        data,
        isPending,
        isError,
    } = useQuery(
        myRoutesQueryOptions(page),
    );

    if (isPending) {
        return (
            <div className={styles.page}>
                <p>Loading routes...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.page}>
                <p>Failed to load routes.</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>My Routes</h1>
                    <p>Routes you've created.</p>
                </div>
            </header>

            {data.items.length === 0 ? (
                <div className={styles.empty}>
                    <Map size={36}/>

                    <h2>No routes yet</h2>

                    <p>
                        Create your first route and start planning your journey.
                    </p>

                </div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {data.items.map((route) => (
                            <RouteCard
                                key={route.id}
                                route={route}
                            />
                        ))}
                    </div>

                    <Pagination
                        page={data.meta.page}
                        totalPages={data.meta.totalPages}
                        onPageChange={onPageChange}
                    />
                </>
            )}
        </div>
    );
}