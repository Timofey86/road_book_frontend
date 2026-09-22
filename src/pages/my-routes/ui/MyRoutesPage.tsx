import {useQuery} from '@tanstack/react-query';
import {Map} from 'lucide-react';
import {
    myRoutesQueryOptions,
    RouteCard,
} from '../../../entities/route';
import {Pagination} from '../../../shared/ui/pagination';
import styles from './MyRoutesPage.module.css';
import {useTranslation} from 'react-i18next';
import {PageLoader} from "../../../shared/ui/PageLoader";

interface MyRoutesPageProps {
    page: number;
    onPageChange: (page: number) => void;
}

export function MyRoutesPage({page, onPageChange}: MyRoutesPageProps) {
    const {t} = useTranslation();
    const {
        data,
        isPending,
        isError,
    } = useQuery(
        myRoutesQueryOptions(page),
    );

    if (isPending) {
        return  <PageLoader />

    }

    if (isError) {
        return (
            <div className={styles.page}>
                <p>{t('myRoutes.loadError')}</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>{t('myRoutes.title')}</h1>
                    <p>{t('myRoutes.subtitle')}</p>
                </div>
            </header>

            {data.items.length === 0 ? (
                <div className={styles.empty}>
                    <Map size={36}/>
                    <h2>{t('myRoutes.emptyTitle')}</h2>
                    <p>
                        {t('myRoutes.emptyDescription')}
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