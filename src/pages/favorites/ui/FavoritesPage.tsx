import {useQuery} from '@tanstack/react-query';
import {Heart} from 'lucide-react';
import {favoritesQueryOptions} from '../../../entities/favorite';
import {RouteCard} from '../../../entities/route';
import styles from './FavoritesPage.module.css';
import {Pagination} from "../../../shared/ui/pagination";

interface FavoritesPageProps {
    page: number;
    onPageChange: (page: number) => void;
}

export function FavoritesPage({page, onPageChange}: FavoritesPageProps) {

    const {data, isPending, isError} = useQuery(
        favoritesQueryOptions(page),
    );

    if (isPending) {
        return (
            <div className={styles.page}>
                <p>Loading favorites...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.page}>
                <p>Failed to load favorites.</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>Favorites</h1>
                <p>
                    Routes you've saved for later.
                </p>
            </header>

            {data.items.length === 0 ? (
                <div className={styles.empty}>
                    <Heart size={36}/>

                    <h2>No favorite routes yet</h2>

                    <p>
                        Save routes you like and they'll appear here.
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