import {useQuery} from '@tanstack/react-query';
import {Heart} from 'lucide-react';
import {favoritesQueryOptions} from '../../../entities/favorite';
import {RouteCard} from '../../../entities/route';
import styles from './FavoritesPage.module.css';
import {Pagination} from "../../../shared/ui/pagination";
import {useTranslation} from 'react-i18next';

interface FavoritesPageProps {
    page: number;
    onPageChange: (page: number) => void;
}

export function FavoritesPage({page, onPageChange}: FavoritesPageProps) {
    const {t} = useTranslation();
    const {data, isPending, isError} = useQuery(
        favoritesQueryOptions(page),
    );

    if (isPending) {
        return (
            <div className={styles.page}>
                <p>{t('favorites.loading')}</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.page}>
                <p>{t('favorites.loadError')}</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>{t('favorites.title')}</h1>
                <p>
                    {t('favorites.subtitle')}
                </p>
            </header>

            {data.items.length === 0 ? (
                <div className={styles.empty}>
                    <Heart size={36}/>

                    <h2>{t('favorites.emptyTitle')}</h2>

                    <p>
                        {t('favorites.emptyDescription')}
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